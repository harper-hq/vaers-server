import { SupabaseTables } from "../../supabase/supabase.tables";
import { Database } from "../../supabase/supabaseTypes";

export type VaccineCategoryRow = Partial<
  Database["public"]["Tables"][SupabaseTables.vaccineCategory]["Row"]
>;
