import { Request, Response } from "express";
import { addTopVaccineSymptomTypeStats } from "./service/vaers.statsService";


export const updateStats = async (req: Request, res: Response) => {
    try {
        const vaccineTypeStatsWhereSymptomsAreZero = await addTopVaccineSymptomTypeStats();
        return res.status(200).json({
            data: vaccineTypeStatsWhereSymptomsAreZero,
        });
    } catch (error) {
        console.error("Error updating stats:", error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}