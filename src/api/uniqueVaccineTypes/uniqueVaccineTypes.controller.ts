import { Request, Response } from "express";

import {
  getUniqueVaccineTypes,
  getVaccineCategoryBySlug,
  getVaccineTypeById,
  getVaccineTypeByType,
  getVaccineTypesByVcId,
} from "./uniqueVaccineTypes.repository";

export const getVaccineTypes = async (req: Request, res: Response) => {
  try {
    const vaccineCategories = await getUniqueVaccineTypes();
    res.status(200).json({
      data: vaccineCategories,
    });
  } catch (error) {
    console.error("Error getting vaccine categories:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getVaccineTypesByCategoryBySlug = async (
  req: Request,
  res: Response
) => {
  try {
    const { slug } = req.params;

    const vaccineCategory = await getVaccineCategoryBySlug(slug);

    if (!vaccineCategory) {
      return res.status(404).json({
        error: "Vaccine category not found",
      });
    }

    const vaccineTypes = await getVaccineTypesByVcId(
      vaccineCategory.id as string
    );

    res.status(200).json({
      data: vaccineTypes,
    });
  } catch (error) {
    console.error("Error getting vaccine category by slug:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getTypeByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    const vaccineType = await getVaccineTypeByType(type);

    if (!vaccineType) {
      return res.status(404).json({
        error: "Vaccine type not found",
      });
    }

    res.status(200).json({
      data: vaccineType,
    });
  } catch (error) {
    console.error("Error getting vaccine type by type:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
  ``;
};

export const getVaccineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vaccineType = await getVaccineTypeById(id);

    if (!vaccineType) {
      return res.status(404).json({
        error: "Vaccine type not found",
      });
    }

    res.status(200).json({
      data: vaccineType,
    });
  } catch (error) {
    console.error("Error getting vaccine type by id:", error);
  }
};
