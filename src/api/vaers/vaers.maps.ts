import { formatDate } from "../../utils/dateManipulation";
import {
  emptyStringToNull,
  convertYNToBoolean,
} from "../../utils/stringManipulation";
import {
  VaersDataRawRow,
  vaersReportColumnsString,
  VaersReportRowInsert,
  VaersVaccineRawRow,
  VaersVaccineRowInsert,
} from "./vaers.types";

function filterValidColumns(
  mappedRow: Partial<VaersReportRowInsert>
): Record<string, any> {
  const validColumns = vaersReportColumnsString
    .split(",")
    .map((col) => col.trim());
  return Object.fromEntries(
    Object.entries(mappedRow).filter(([key]) => validColumns.includes(key))
  );
}

export function mapVaersDataRow(
  row: VaersDataRawRow,
  csv_url: string
): Partial<VaersReportRowInsert> {
  const mapped = {
    vaers_id: Number(row.VAERS_ID),
    recvdate: formatDate(row.RECVDATE),
    state: emptyStringToNull(row.STATE),
    age_yrs: Number(row.AGE_YRS),
    sex: emptyStringToNull(row.SEX),
    died: convertYNToBoolean(row.DIED),
    rpt_date: formatDate(row.RPT_DATE),
    symptom_text: emptyStringToNull(row.SYMPTOM_TEXT),
    l_threat: convertYNToBoolean(row.L_THREAT),
    er_visit: convertYNToBoolean(row.ER_VISIT),
    hospital: convertYNToBoolean(row.HOSPITAL),
    datedied: formatDate(row.DATEDIED),
    numdays: Number(row.NUMDAYS),
    onset_date: formatDate(row.ONSET_DATE),
    other_meds: emptyStringToNull(row.OTHER_MEDS),
    allergies: emptyStringToNull(row.ALLERGIES),
    cage_yr: Number(row.CAGE_YR),
    cage_mo: Number(row.CAGE_MO),
    v_adminby: emptyStringToNull(row.V_ADMINBY),
    v_fundby: emptyStringToNull(row.V_FUNDBY),
    lab_data: emptyStringToNull(row.LAB_DATA),
    hospdays: Number(row.HOSPDAYS),
    x_stay: convertYNToBoolean(row.X_STAY),
    disable: convertYNToBoolean(row.DISABLE),
    recovd: convertYNToBoolean(row.RECOVD),
    vax_date: formatDate(row.VAX_DATE),
    er_ed_visit: convertYNToBoolean(row.ER_ED_VISIT),
    ofc_visit: convertYNToBoolean(row.OFC_VISIT),
    birth_defect: convertYNToBoolean(row.BIRTH_DEFECT),
    cur_ill: emptyStringToNull(row.CUR_ILL),
    history: emptyStringToNull(row.HISTORY),
    prior_vax: emptyStringToNull(row.PRIOR_VAX),
    splttype: emptyStringToNull(row.SPLTTYPE),
    todays_date: formatDate(row.TODAYS_DATE),
    csv_url,
  };

  return filterValidColumns(mapped);
}

export function mapVaersVaccineRow(
  row: VaersVaccineRawRow,
  csv_url: string
): VaersVaccineRowInsert {
  return {
    vaers_id: Number(row.VAERS_ID),
    vax_manu: emptyStringToNull(row.VAX_MANU),
    vax_type: emptyStringToNull(row.VAX_TYPE),
    vax_lot: emptyStringToNull(row.VAX_LOT),
    vax_route: emptyStringToNull(row.VAX_ROUTE),
    vax_site: emptyStringToNull(row.VAX_SITE),
    vax_dose_series: emptyStringToNull(row.VAX_DOSE_SERIES),
    vax_name: emptyStringToNull(row.VAX_NAME),
    csv_url,
  };
}

export /**
 * Extracts symptom names from an object by removing the `_count` suffix.
 * @param data - Object with symptom_count keys.
 * @returns An array of symptom names without `_count`.
 */
function extractSymptomsFromCountColumns(
  data: Record<string, number>
): string[] {
  return Object.keys(data)
    .filter((key) => key.endsWith("_count")) // Ensure keys have `_count`
    .map(
      (key) =>
        key
          .replace(/_count$/, "") // Remove `_count` suffix
          .replace(/_/g, " ") // Replace remaining underscores with hyphens
          .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
      // capitalize the first letter
    );
}

// Example usage:
const symptomsData = {
  pyrexia_count: 0,
  headache_count: 0,
  pain_count: 0,
  fatigue_count: 0,
  chills_count: 0,
  no_adverse_event_count: 0,
  pain_in_extremity_count: 0,
  nausea_count: 0,
  injection_site_pain_count: 0,
  injection_site_erythema_count: 0,
  dizziness_count: 0,
  rash_count: 0,
  covid_19_count: 0,
  myalgia_count: 0,
  injection_site_swelling_count: 0,
  erythema_count: 0,
  pruritus_count: 0,
  arthralgia_count: 0,
  dyspnoea_count: 0,
  vomiting_count: 0,
};

console.log(extractSymptomsFromCountColumns(symptomsData));
