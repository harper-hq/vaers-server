
import { Router } from "express";
import { updateStats } from "./vaers.controller";

const vaersRoutes = Router();

vaersRoutes.get("/stats", updateStats);

export default vaersRoutes;