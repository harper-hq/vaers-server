export const vaersReportColumnsString = `vaers_id, recvdate, state, age_yrs, sex, died, rpt_date, symptom_text, l_threat, er_visit, hospital, datedied, numdays, onset_date, other_meds, allergies, cage_yr, cage_mo, v_adminby, v_fundby, lab_data, hospdays, x_stay, disable, recovd, vax_date, er_ed_visit, ofc_visit, birth_defect, cur_ill, history, prior_vax, splttype, todays_date, csv_url`;

export const vaersSymptomColumnsString = `vaers_id, symptom, symptom_version, csv_url`;

export const vaersVaccineColumnsString = `vaers_id, vax_manu, vax_type, vax_lot, vax_route, vax_site, vax_dose_series, vax_name, csv_url`;

export type VaersDataRawRow = {
  VAERS_ID: string;
  RECVDATE: string;
  STATE: string;
  AGE_YRS: string;
  SEX: string;
  DIED: string;
  RPT_DATE: string;
  SYMPTOM_TEXT: string;
  L_THREAT: string;
  ER_VISIT: string;
  HOSPITAL: string;
  DATEDIED: string;
  NUMDAYS: string;
  ONSET_DATE: string;
  OTHER_MEDS: string;
  PATIENT_ID: string;
  PATIENT_ZIP: string;
  ALLERGIES: string;
  CAGE_YR: string;
  CAGE_MO: string;
  V_ADMINBY: string;
  V_FUNDBY: string;
  LAB_DATA: string;
  HOSPDAYS: string;
  X_STAY: string;
  DISABLE: string;
  RECOVD: string;
  VAX_DATE: string;
  ER_ED_VISIT: string;
  OFC_VISIT: string;
  BIRTH_DEFECT: string;
  CUR_ILL: string;
  HISTORY: string;
  PRIOR_VAX: string;
  SPLTTYPE: string;
  TODAYS_DATE: string;
};

export type VaersVaccineRawRow = {
  VAERS_ID: string;
  VAX_MANU: string;
  VAX_TYPE: string;
  VAX_LOT: string;
  VAX_ROUTE: string;
  VAX_SITE: string;
  VAX_DOSE_SERIES: string;
  VAX_NAME: string;
};
export type VaersVaccineRowInsert = {
  vaers_id: number;
  vax_manu: string | null;
  vax_type: string | null;
  vax_lot: string | null;
  vax_route: string | null;
  vax_site: string | null;
  vax_dose_series: string | null;
  vax_name: string | null;
  csv_url: string;
};

export type VaersReportRowInsert = {
  vaers_id: number;
  recvdate?: string | null;
  state?: string | null;
  age_yrs?: number | null;
  sex?: string | null;
  died?: boolean | null;
  rpt_date?: string | null;
  symptom_text?: string | null;
  l_threat?: boolean | null;
  er_visit?: boolean | null;
  hospital?: boolean | null;
  datedied?: string | null;
  numdays?: number | null;
  onset_date?: string | null;
  other_meds?: string | null;
  patient_id?: string | null;
  patient_zip?: string | null;
  prg_name?: string | null;
  allergies?: string | null;
  cage_yr?: number | null;
  cage_mo?: number | null;
  v_adminby?: string | null;
  v_fundby?: string | null;
  lab_data?: string | null;
  hospdays?: number | null;
  x_stay?: boolean | null;
  disable?: boolean | null;
  recovd?: boolean | null;
  vax_date?: string | null;
  er_ed_visit?: boolean | null;
  ofc_visit?: boolean | null;
  birth_defect?: boolean | null;
  cur_ill?: string | null;
  history?: string | null;
  prior_vax?: string | null;
  splttype?: string | null;
  todays_date?: string | null;
  csv_url: string;
};

export type VaersReportRow = {
  id: string;
  vaers_id: number;
  recvdate: string;
  state: string;
  age_yrs: number;
  sex: string;
  died: boolean;
  rpt_date: string;
  symptom_text: string;
  l_threat: boolean;
  er_visit: boolean;
  hospital: boolean;
  datedied: string;
  numdays: number;
  onset_date: string;
  other_meds: string;
  patient_id: string;
  patient_zip: string;
  prg_name: string;
  allergies: string;
  cage_yr: number;
  cage_mo: number;
  v_adminby: string;
  v_fundby: string;
  lab_data: string;
  hospdays: number;
  x_stay: boolean;
  disable: boolean;
  recovd: boolean;
  vax_date: string;
  er_ed_visit: boolean;
  ofc_visit: boolean;
  birth_defect: boolean;
  cur_ill: string;
  history: string;
  prior_vax: string;
  splttype: string;
  todays_date: string;
  csv_url: string;
};

export type VaersVaccineRow = {
  id: string;
  vaers_id: number;
  vax_manu: string;
  vax_type: string;
  vax_lot: string;
  vax_route: string;
  vax_site: string;
  vax_dose_series: string;
  vax_name: string;
  csv_url: string;
};

export type VaersSymptomRaw = {
  VAERS_ID: string;
  SYMPTOM1: string;
  SYMPTOMVERSION1: string;
  SYMPTOM2: string;
  SYMPTOMVERSION2: string;
  SYMPTOM3: string;
  SYMPTOMVERSION3: string;
  SYMPTOM4: string;
  SYMPTOMVERSION4: string;
  SYMPTOM5: string;
  SYMPTOMVERSION5: string;
};

export type VaersSymptomRowInsert = {
  vaers_id: number;
  symptom: string;
  symptom_version: number;
  csv_url: string;
};

export type VaersSymptomRow = {
  id: string;
  vaers_id: number;
  symptom: string;
  symptom_version: number;
  csv_url: string;
};

export type VaccineTypeStatsRow = {
  id: string;
  type: string;
  total_count: number;
  pyrexia_count: number;
  headache_count: number;
  pain_count: number;
  fatigue_count: number;
  chills_count: number;
  no_adverse_event_count: number;
  pain_in_extremity_count: number;
  nausea_count: number;
  injection_site_pain_count: number;
  injection_site_erythema_count: number;
  dizziness_count: number;
  rash_count: number;
  covid_19_count: number;
  myalgia_count: number;
  injection_site_swelling_count: number;
  erythema_count: number;
  pruritus_count: number;
  arthralgia_count: number;
  dyspnoea_count: number;
  vomiting_count: number;
};

export type SymptomTypeStatsRow = {
  id: string;
  symptom: string;
  type: string;
  count: number;
  updated_at: string;
  slug: string;
};
