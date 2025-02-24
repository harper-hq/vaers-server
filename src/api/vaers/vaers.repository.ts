


import { createVaersSupabaseClient, pgpVaersDbConnection } from "../../supabase/supabase.service";
import { VaersReportRow, VaersReportRowInsert, VaersSymptomRow, VaersSymptomRowInsert, VaersTables, VaccineTypeStatsRow, SymptomTypeStatsRow } from "./vaers.types";

const supabase = createVaersSupabaseClient()

export const testDbConnection = async () => {
    const client = await pgpVaersDbConnection.connect(); // Connect to get a client

    try {
        // Get the table names
        const result = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';");
        console.log(result);
        return result;
    } catch (error) {
        console.log("Error testing db connection:", error);
        throw error;
    }
}

export const createVaersReportRow = async (values: VaersReportRowInsert): Promise<VaersReportRow> => {
    try {

        const { data, error } = await supabase.from(VaersTables.REPORT).insert({ ...values })
            .select();

        if (error) {
            console.log("Error creating vaers report row:", error);
            throw error;
        }
        return data[0] as VaersReportRow;
    } catch (error) {
        console.log("Error creating vaers report row:", error);
        throw error;
    }
}

export const batchCreateVaersReportRow = async (values: VaersReportRowInsert[]): Promise<VaersReportRow[] | null> => {
    try {
        const { data, error } = await supabase.from(VaersTables.REPORT).upsert(values)
        if (error) {
            console.log("Error batch creating vaers report row:", error);
            throw error;
        }
        return data as VaersReportRow[] | null;
    } catch (error) {
        console.log("Error batch creating vaers report row:", error);
        throw error;
    }
}

export const getVaersReportRowByVaersId = async (vaersId: number): Promise<VaersReportRow | null> => {
    try {

        const { data, error } = await supabase.from(VaersTables.REPORT).select("*").eq("vaers_id", vaersId)

        if (error) {
            console.log("Error getting vaers report row by vaers id:", error);
            throw error;
        }

        return data[0] as VaersReportRow | null;
    } catch (error) {
        console.log("Error getting vaers report row by vaers id:", error);
        throw error;
    }
}

export const updateVaersReportRow = async (id: string, values: VaersReportRowInsert): Promise<VaersReportRow> => {
    try {

        const { data, error } = await supabase.from(VaersTables.REPORT).update(values).eq("id", id).select();
        if (error) {
            console.log("Error updating vaers report row:", error);
            throw error;
        }
        return data[0] as VaersReportRow;
    } catch (error) {
        console.log("Error updating vaers report row:", error);
        throw error;
    }
}

export const createVaersSymptomRow = async (values: VaersSymptomRowInsert): Promise<VaersSymptomRow | null> => {
    try {

        const { data, error } = await supabase.from(VaersTables.SYMPTOM).insert({ ...values })

        if (error) {
            console.log("Error creating vaers symptom row:", error, values);
            throw error;
        }
        if (!data) {
            return null;
        }
        return data[0] as VaersSymptomRow | null;
    } catch (error) {
        console.log("Error creating vaers symptom row:", error);
        throw error;
    }
}
export const batchCreateVaersSymptomRow = async (values: VaersSymptomRowInsert[]): Promise<VaersSymptomRow[] | null> => {
    try {
        const { data, error } = await supabase.from(VaersTables.SYMPTOM).upsert(values)
        if (error) {
            console.log("Error batch creating vaers symptom row:", error);
            throw error;
        }
        return data as VaersSymptomRow[] | null;
    } catch (error) {
        console.log("Error batch creating vaers symptom row:", error);
        throw error;
    }
}

export const getAllVaccineTypeStats = async () => {
    const { data, error } = await supabase.from(VaersTables.VACCINE_TYPE_STATS).select('*');
    if (error) {
        console.log("Error getting all vaccine type stats:", error);
        throw error;
    }
    return data as VaccineTypeStatsRow[];
}

export const getSymptomsBySymptom = async (vaccine: string, symptom: string) => {
    const { data, error } = await supabase.from(VaersTables.SYMPTOM).select('*').eq('vaccine', vaccine).eq('symptom', symptom);
    if (error) {
        console.log("Error getting symtoms by vaccine and symptom:", error);
        throw error;
    }
    return data as VaersSymptomRow[];
}

export const getVaersSymptomRowBySymptomAndVaersId = async (vaersId: number, symptom: string): Promise<VaersSymptomRow | null> => {
    try {

        const { data, error } = await supabase.from(VaersTables.SYMPTOM).select("*").eq("vaers_id", vaersId).eq("symptom", symptom)

        if (error) {
            console.log("Error getting vaers symptom row by vaers id:", error, vaersId, symptom);
            throw error;
        }
        return data[0] as VaersSymptomRow | null;
    } catch (error) {
        console.log("Error getting vaers symptom row by vaers id:", error);
        throw error;
    }
}

export const getVaccineTypeStatsWhereSymptomsAreZero = async (count: number) => {

    const { data, error } = await supabase.from(VaersTables.VACCINE_TYPE_STATS).select('*').eq('pyrexia_count', 0).limit(count);

    if (error) {
        console.log("Error getting vaccine type stats where symptoms are zero:", error);
        throw error;
    }
    return data as VaccineTypeStatsRow[];
}

export const getSymptomTypeStatsWhereUpdatedNull = async (count: number) => {
    const { data, error } = await supabase.from(VaersTables.SYMPTOM_TYPE_STATS).select('*').is('updated_at', null).limit(count);
    if (error) {
        console.log("Error getting symptom type stats where updated null:", error);
        throw error;
    }
    return data as SymptomTypeStatsRow[];
}

export const getTopVaccineTypeStatsWhereUpdatedNull = async (count: number) => {
    try {
        const { data, error } = await supabase
            .from(VaersTables.SYMPTOM_TYPE_STATS)
            .select("*")
            .is('updated_at', null)
            .order('count', { ascending: false })
            .limit(count);

        if (error) {
            console.log("Error getting top vaccine type stats:", error);
            throw error;
        }
        return data;
    } catch (error) {
        console.log("Error getting top vaccine type stats:", error);
        throw error;
    }
}

export const runUpdateVaccineSymptomStats = async (symptom: string) => {


    let { data, error } = await supabase
        .rpc('update_vaccine_symptom_stats', {
            target_symptom: symptom
        })
    if (error) console.error(error)
    else console.log(data)

    return data;
}