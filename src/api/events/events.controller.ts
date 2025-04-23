import { Request, Response } from "express";
import { supabase } from "../../supabase/supabaseClient";

export const getEvents = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            state,
            vax_type,
            from_date,
            to_date,
            died,
            hospital,
            life_threatening,
            permanent_disability
        } = req.query;

        let query = supabase
            .from('raw_reports')
            .select('*', { count: 'exact' });

        // Apply filters if provided
        if (state) query = query.eq('state', state);
        if (vax_type) query = query.eq('vax_type', vax_type);
        if (from_date) query = query.gte('vax_date', from_date);
        if (to_date) query = query.lte('vax_date', to_date);
        if (died) query = query.eq('died', died === 'true');
        if (hospital) query = query.eq('hospital', hospital === 'true');
        if (life_threatening) query = query.eq('l_threat', life_threatening === 'true');
        if (permanent_disability) query = query.eq('disable', permanent_disability === 'true');

        // Add pagination
        const pageNumber = parseInt(page as string);
        const pageSize = parseInt(limit as string);
        const start = (pageNumber - 1) * pageSize;
        
        const { data, error, count } = await query
            .range(start, start + pageSize - 1)
            .order('recvdate', { ascending: false });

        if (error) throw error;

        return res.status(200).json({
            data,
            pagination: {
                page: pageNumber,
                limit: pageSize,
                total: count,
                total_pages: Math.ceil((count || 0) / pageSize)
            }
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Get the main report
        const { data: report, error: reportError } = await supabase
            .from('raw_reports')
            .select('*')
            .eq('id', id)
            .single();

        if (reportError) throw reportError;

        if (!report) {
            return res.status(404).json({
                error: "Event not found"
            });
        }

        // Get associated symptoms
        const { data: symptoms, error: symptomsError } = await supabase
            .from('raw_symptoms')
            .select('*')
            .eq('vaers_id', report.vaers_id);

        if (symptomsError) throw symptomsError;

        // Get associated vaccine data
        const { data: vaccines, error: vaccinesError } = await supabase
            .from('raw_vaccine_data')
            .select('*')
            .eq('vaers_id', report.vaers_id);

        if (vaccinesError) throw vaccinesError;

        return res.status(200).json({
            data: {
                report,
                symptoms,
                vaccines
            }
        });
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};