import { SupabaseTables } from "../../supabase/supabase.tables";
import { Database } from "../../supabase/supabaseTypes";
import { UniqueVaccineTypesRow } from "../uniqueVaccineTypes/uniqueVaccineTypes.type";

export type VaccineCategoryRow = Partial<
  Database["public"]["Tables"][SupabaseTables.vaccineCategory]["Row"]
>;

export type VaccineCategoryRowWithUniqueVaccineTypes = VaccineCategoryRow & {
  unique_vaccine_types: UniqueVaccineTypesRow[];
};
