import { createVaersSupabaseClient } from "../../supabase/supabase.service";
import { SupabaseTables } from "../../supabase/supabase.tables";
import { VaccineCategoryRow } from "./vaccineCategory.type";

const supabase = createVaersSupabaseClient();

export const getVaccineCategories = async () => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.vaccineCategory)
      .select("*, unique_vaccine_types(*)")
      .order("total_count", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error getting vaccine categories:", error);
    throw error;
  }
};

export const getVaccineCategoryBySlug = async (
  slug: string
): Promise<VaccineCategoryRow> => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.vaccineCategory)
      .select("*, unique_vaccine_types(*)")
      .eq("slug", slug);
    if (error) {
      throw error;
    }
    return data[0];
  } catch (error) {
    console.error("Error getting vaccine category by slug:", error);
    throw error;
  }
};
