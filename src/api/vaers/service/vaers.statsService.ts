import { getAllVaccineTypeStats, getSymptomTypeStatsWhereUpdatedNull, getTopVaccineTypeStatsWhereUpdatedNull, getVaccineTypeStatsWhereSymptomsAreZero, runUpdateVaccineSymptomStats } from "../vaers.repository";


export async function addTopVaccineSymptomTypeStats() {
    const items = await getSymptomTypeStatsWhereUpdatedNull(2);
    const vaccines = await getAllVaccineTypeStats();

    let values = []
    for (const vax of vaccines) {
        const symptoms = items.find(item => item.symptom === vax.type);
    }
    return {
        vaccines,
        items,
    };
}