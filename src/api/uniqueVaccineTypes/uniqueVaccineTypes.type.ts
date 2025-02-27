import { SupabaseTables } from "../../supabase/supabase.tables";
import { Database } from "../../supabase/supabaseTypes";
import { VaccineCategoryRow } from "../vaccineCategory/vaccineCategory.type";

export type UniqueVaccineTypesRow = Partial<
  Database["public"]["Tables"][SupabaseTables.uniqueVaccineTypes]["Row"]
>;

export type UniqueVaccineTypesRowWithCategory = Partial<
  UniqueVaccineTypesRow & {
    vaccine_category: VaccineCategoryRow;
  }
>;
