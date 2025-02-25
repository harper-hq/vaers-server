import { SupabaseTables } from "../../supabase/supabase.tables";
import { Database } from "../../supabase/supabaseTypes";

export type DemographicAnalyticsRow = Partial<
  Database["public"]["Tables"][SupabaseTables.demographicAnalytics]["Row"]
>;

export type DemographicAnalyticsRowInsert = Partial<
  Database["public"]["Tables"][SupabaseTables.demographicAnalytics]["Insert"]
>;
