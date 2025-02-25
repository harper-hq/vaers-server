import { Router } from "express";
import {
  getDemographicAnalyticsByVt,
  getDemographicData,
} from "./demographicAnalytics.controller";

const demographicAnalyticsRoutes = Router();

demographicAnalyticsRoutes.get("/", getDemographicData);
demographicAnalyticsRoutes.get(
  "/vaccine-type/:id",
  getDemographicAnalyticsByVt
);

export default demographicAnalyticsRoutes;
