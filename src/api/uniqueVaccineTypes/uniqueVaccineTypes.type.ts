import { SupabaseTables } from "../../supabase/supabase.tables";
import { Database } from "../../supabase/supabaseTypes";

export type UniqueVaccineTypesRow = Partial<
  Database["public"]["Tables"][SupabaseTables.uniqueVaccineTypes]["Row"]
>;
