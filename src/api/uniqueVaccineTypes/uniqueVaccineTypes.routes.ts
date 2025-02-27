import { Router } from "express";
import {
  getTypeByType,
  getVaccineById,
  getVaccineTypes,
  getVaccineTypesByCategoryBySlug,
} from "./uniqueVaccineTypes.controller";

const uniqueVaccineTypeRoutes = Router();

//base route: /unique-vaccine-types
uniqueVaccineTypeRoutes.get("/:id", getVaccineById);
uniqueVaccineTypeRoutes.get("/category/:slug", getVaccineTypesByCategoryBySlug);
uniqueVaccineTypeRoutes.get("/type/:type", getTypeByType);

uniqueVaccineTypeRoutes.get("/", getVaccineTypes);

export default uniqueVaccineTypeRoutes;
