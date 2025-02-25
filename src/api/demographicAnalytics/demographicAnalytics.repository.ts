import { createVaersSupabaseClient } from "../../supabase/supabase.service";
import { SupabaseTables } from "../../supabase/supabase.tables";
import { DemographicAnalyticsRow } from "./demographicAnalytics.type";

const supabase = createVaersSupabaseClient();

export const getDemographicAnalytics = async () => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.demographicAnalytics)
      .select("*");

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error getting demographic analytics:", error);
    throw error;
  }
};

export const getDemographicAnalyticsByVtId = async (
  id: string
): Promise<DemographicAnalyticsRow[]> => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.demographicAnalytics)
      .select("*")
      .eq("vaccine_type_id", id)
      .gt("total_count", 100)
      .order("total_count", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error getting demographic analytics by vt id:", error);
    throw error;
  }
};
