import { Router } from "express";
import { getCategories, getCategoryBySlug } from "./vaccineCategory.controller";

const vaccineCategoryRoutes = Router();

vaccineCategoryRoutes.get("/", getCategories);
vaccineCategoryRoutes.get("/slug/:slug", getCategoryBySlug);

export default vaccineCategoryRoutes;
