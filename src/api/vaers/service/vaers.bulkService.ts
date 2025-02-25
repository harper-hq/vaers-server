import { parse } from "fast-csv";
import { Transform } from "stream";

import { Readable } from "stream";
import { createPool } from "../../../supabase/supabase.service";
import { escapeCsvValue } from "../../../utils/stringManipulation";
import { mapVaersDataRow, mapVaersVaccineRow } from "../vaers.maps";
import {
  batchCreateVaersSymptomRow,
  createVaersSymptomRow,
  getVaersReportRowByVaersId,
  getVaersSymptomRowBySymptomAndVaersId,
  updateVaersReportRow,
} from "../vaers.repository";
import {
  VaersDataRawRow,
  vaersReportColumnsString,
  VaersReportRowInsert,
  VaersSymptomRaw,
  VaersSymptomRowInsert,
  vaersVaccineColumnsString,
  VaersVaccineRawRow,
} from "../vaers.types";
import { SupabaseTables } from "../../../supabase/supabase.tables";
const copyFrom = require("pg-copy-streams").from;

let pLimit: any;

async function getReadableStream(path: string) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  // Convert web ReadableStream to Node.js stream
  return new Readable().wrap(response.body as any);
}

const initPLimit = async () => {
  if (!pLimit) {
    const module = await import("p-limit");
    pLimit = module.default;
  }
  return pLimit(15);
};

// 15 min timeout limit
const timeoutLimit = 900000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mapSymptomRows(
  row: VaersSymptomRaw,
  path: string
): VaersSymptomRowInsert[] {
  const mappedRows: VaersSymptomRowInsert[] = [];

  // Process symptoms 1-5
  for (let i = 1; i <= 5; i++) {
    const symptom = row[`SYMPTOM${i}` as keyof VaersSymptomRaw];
    const version = row[`SYMPTOMVERSION${i}` as keyof VaersSymptomRaw];
    const vaersId = row.VAERS_ID;

    // Only create a row if there's a symptom
    if (symptom && symptom !== "" && vaersId && version) {
      mappedRows.push({
        vaers_id: Number(vaersId),
        symptom: symptom,
        symptom_version: Number(version),
        csv_url: path,
      });
    }
  }

  return mappedRows;
}

export async function copyParsedSymptomCsvToDb(filePath: string) {
  const pool = createPool();
  const client = await pool.connect();

  try {
    await client.query(`SET statement_timeout = ${timeoutLimit}`);

    const readableStream = await getReadableStream(filePath);

    return new Promise((resolve, reject) => {
      const transformer = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          const symptomRow = chunk as VaersSymptomRaw;
          const mappedRows = mapSymptomRows(symptomRow, filePath);

          mappedRows.forEach((r) => {
            const line =
              [
                escapeCsvValue(r.vaers_id),
                escapeCsvValue(r.symptom),
                escapeCsvValue(r.symptom_version),
                escapeCsvValue(r.csv_url),
              ].join(",") + "\n";
            this.push(line);
          });

          callback();
        },
      });

      const copyStream = client.query(
        copyFrom(
          `COPY ${SupabaseTables.rawSymptoms} (vaers_id, symptom, symptom_version, csv_url) FROM STDIN WITH CSV`
        )
      );

      readableStream
        .pipe(parse({ headers: true, objectMode: true }))
        .pipe(transformer)
        .pipe(copyStream)
        .on("error", (error: Error) => {
          console.error(`❌ COPY symptom failed ${filePath}`, error);

          reject(error);
        })
        .on("finish", () => {
          console.log(`✅ COPY symptom successful! ${filePath}`);

          resolve(true);
        });
    });
  } finally {
    // Reset statement timeout to default
    await client.query("SET statement_timeout = 30000");
    client.release();
  }
}

export async function copyParsedVaxDataCsvToDb(filePath: string) {
  const pool = createPool();
  const client = await pool.connect();

  try {
    await client.query(`SET statement_timeout = ${timeoutLimit}`);

    const readableStream = await getReadableStream(filePath);

    return new Promise((resolve, reject) => {
      const copyStream = client.query(
        copyFrom(
          `COPY ${SupabaseTables.rawReports} (${vaersReportColumnsString}) FROM STDIN WITH CSV`
        )
      );

      const transformer = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          const vaxRow = chunk as VaersDataRawRow;
          const mappedRow = mapVaersDataRow(vaxRow, filePath);
          const csvLine =
            Object.values(mappedRow)
              .map((value) => escapeCsvValue(value?.toString() ?? ""))
              .join(",") + "\n";
          this.push(csvLine);
          callback();
        },
      });

      readableStream
        .pipe(parse({ headers: true, objectMode: true }))
        .pipe(transformer)
        .pipe(copyStream)
        .on("error", (error: Error) => {
          console.error(`❌ COPY data failed ${filePath}`, error);

          reject(error);
        })
        .on("finish", () => {
          console.log(`✅ COPY data successful! ${filePath}`);

          resolve(true);
        });
    });
  } finally {
    await client.query("SET statement_timeout = 30000");
    client.release();
  }
}

export async function copyParsedVaccineCsvToDb(filePath: string) {
  const pool = createPool();
  const client = await pool.connect();

  try {
    await client.query(`SET statement_timeout = ${timeoutLimit}`);

    const readableStream = await getReadableStream(filePath);

    return new Promise((resolve, reject) => {
      const copyStream = client.query(
        copyFrom(
          `COPY ${SupabaseTables.rawVaccineData} (${vaersVaccineColumnsString}) FROM STDIN WITH CSV`
        )
      );

      const transformer = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          const vaccineRow = chunk as VaersVaccineRawRow;
          const mappedRow = mapVaersVaccineRow(vaccineRow, filePath);
          const csvLine =
            Object.values(mappedRow)
              .map((value) => escapeCsvValue(value ?? ""))
              .join(",") + "\n";
          this.push(csvLine);
          callback();
        },
      });

      readableStream
        .pipe(parse({ headers: true, objectMode: true }))
        .pipe(transformer)
        .pipe(copyStream)
        .on("error", (error: Error) => {
          console.error(`❌ COPY vaccine failed ${filePath}`, error);

          reject(error);
        })
        .on("finish", () => {
          console.log(`✅ COPY vaccine successful! ${filePath}`);

          resolve(true);
        });
    });
  } finally {
    await client.query("SET statement_timeout = 30000");
    client.release();
  }
}

async function handleSymptomRow(
  row: VaersSymptomRaw,
  path: string
): Promise<VaersSymptomRowInsert[]> {
  const symptoms: VaersSymptomRowInsert[] = [];
  const batchInsert: VaersSymptomRowInsert[] = [];

  const mappedRows = mapSymptomRows(row, path);

  for (const newRow of mappedRows) {
    let existingRow = null;
    try {
      existingRow = await getVaersSymptomRowBySymptomAndVaersId(
        newRow.vaers_id,
        newRow.symptom
      );
    } catch (error) {}

    if (existingRow) {
      symptoms.push(existingRow);
    } else {
      batchInsert.push(newRow);
    }
  }

  if (batchInsert.length > 0) {
    const batchCreated = await batchCreateVaersSymptomRow(batchInsert);
    if (batchCreated) {
      symptoms.push(...batchCreated);
    }
  }

  return symptoms;
}

async function handleVaxRow(
  row: VaersVaccineRawRow | VaersDataRawRow,
  path: string
): Promise<VaersReportRowInsert | null> {
  try {
    const fileName = path.split("/").pop();
    const isVaxFile = fileName?.includes("VAX");
    const isDataFile = fileName?.includes("DATA");

    let existingRow = await getVaersReportRowByVaersId(Number(row.VAERS_ID));

    let mappedRow: VaersReportRowInsert | undefined;

    if (isVaxFile && "VAX_MANU" in row) {
      mappedRow = mapVaersVaccineRow(row, path) as VaersReportRowInsert;
    } else if (isDataFile && "RECVDATE" in row) {
      mappedRow = mapVaersDataRow(row, path) as VaersReportRowInsert;
    } else {
      throw new Error("Invalid file type or row format");
    }

    if (!mappedRow) {
      throw new Error("Failed to map row");
    }

    if (existingRow) {
      const shouldUpdateVaxFile = isVaxFile;
      const shouldUpdateDataFile = isDataFile && !existingRow.symptom_text;

      if (shouldUpdateVaxFile || shouldUpdateDataFile) {
        return await updateVaersReportRow(existingRow.id, mappedRow);
      }
      return null;
    } else {
      return await createVaersSymptomRow(mappedRow as VaersSymptomRowInsert);
    }
  } catch (error) {
    console.log("Error creating vaers report row:", error);
    return null;
  }
}

export const rowHandler = async (
  row: VaersDataRawRow | VaersVaccineRawRow | VaersSymptomRaw,
  path: string
) => {
  const limit = await initPLimit();
  // Wrap the handler in the rate limiter
  return limit(async () => {
    try {
      const fileName = path.split("/").pop();
      const isSymptomFile = fileName?.includes("SYMPTOMS");

      // Add a small delay between operations (100ms)
      await delay(50);

      if (isSymptomFile && "SYMPTOM1" in row) {
        return handleSymptomRow(row, path);
      } else if ("VAX_MANU" in row || "RECVDATE" in row) {
        return handleVaxRow(row as VaersDataRawRow | VaersVaccineRawRow, path);
      }
      throw new Error("Invalid row type");
    } catch (error) {
      console.log("Error handling row:", error);
      return null;
    }
  });
};
