import { Request, Response } from "express";

import {
  copyParsedSymptomCsvToDb,
  copyParsedVaccineCsvToDb,
  copyParsedVaxDataCsvToDb,
} from "../vaers/service/vaers.bulkService";
import { vaersCsvPaths } from "../vaers/vaers.csvPaths";

export const testBulkVaersUpload = async (req: Request, res: Response) => {
  try {
    const year = 2022;
    const vaxPath = vaersCsvPaths.find(
      (path) => path.year === year && path.type === "vax"
    );
    const dataPath = vaersCsvPaths.find(
      (path) => path.year === year && path.type === "data"
    );
    const symptomsPath = vaersCsvPaths.find(
      (path) => path.year === year && path.type === "symptoms"
    );

    if (!vaxPath || !dataPath || !symptomsPath) {
      throw new Error("No vax, data, or symptoms path found for year " + year);
    }

    console.log(`Running bulk upload for year ${year}`);

    await copyParsedVaccineCsvToDb(vaxPath.path);
    await copyParsedVaxDataCsvToDb(dataPath.path);
    await copyParsedSymptomCsvToDb(symptomsPath.path);

    // // Create a wrapped rowHandler that includes the path
    // const rowHandlerWithPath = (row: any) => rowHandler(row, vaxPath.path);

    // const result = await convertCsvHeadersInMemory({ csvData: data, rowHandler: rowHandlerWithPath })
    //   .then((modifiedCsv) => { return modifiedCsv })
    //   .catch(console.error);

    return res.status(200).json({ vaxPath, dataPath, symptomsPath });
  } catch (error: any) {
    console.log(error);
    res.status(422).json({ message: error.message });
  }
};
