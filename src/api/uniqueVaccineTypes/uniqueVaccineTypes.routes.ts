import { Router } from "express";
import {
  getTypeByType,
  getVaccineTypes,
  getVaccineTypesByCategoryBySlug,
} from "./uniqueVaccineTypes.controller";

const uniqueVaccineTypeRoutes = Router();
uniqueVaccineTypeRoutes.get("/category/:slug", getVaccineTypesByCategoryBySlug);
uniqueVaccineTypeRoutes.get("/type/:type", getTypeByType);

uniqueVaccineTypeRoutes.get("/", getVaccineTypes);

export default uniqueVaccineTypeRoutes;
