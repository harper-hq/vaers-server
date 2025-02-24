import { Request, Response } from "express";

import {
  getVaccineCategories,
  getVaccineCategoryBySlug,
} from "./vaccineCategory.repository";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const vaccineCategories = await getVaccineCategories();
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

export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const vaccineCategory = await getVaccineCategoryBySlug(slug);
    res.status(200).json({
      data: vaccineCategory,
    });
  } catch (error) {
    console.error("Error getting vaccine category by slug:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
