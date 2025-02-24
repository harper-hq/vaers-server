import { createVaersSupabaseClient } from "../../supabase/supabase.service";
import { SupabaseTables } from "../../supabase/supabase.tables";
import { UniqueVaccineTypesRow } from "./uniqueVaccineTypes.type";

const supabase = createVaersSupabaseClient();

export const getUniqueVaccineTypes = async (): Promise<
  UniqueVaccineTypesRow[]
> => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.uniqueVaccineTypes)
      .select("*");
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
): Promise<UniqueVaccineTypesRow> => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.uniqueVaccineTypes)
      .select("*")
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

export const getVaccineTypesByVcId = async (
  vcId: string
): Promise<UniqueVaccineTypesRow[]> => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.uniqueVaccineTypes)
      .select("*")
      .eq("vaccine_category_id", vcId);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error getting vaccine types by vc ids:", error);
    throw error;
  }
};

export const getVaccineTypeByType = async (
  type: string
): Promise<UniqueVaccineTypesRow> => {
  try {
    const { data, error } = await supabase
      .from(SupabaseTables.uniqueVaccineTypes)
      .select("*")
      .eq("type", type);
    if (error) {
      throw error;
    }
    return data[0];
  } catch (error) {
    console.error("Error getting vaccine type by type:", error);
    throw error;
  }
};
