import { Router } from "express";
import { getEvents, getEventById } from "./events.controller";

const eventsRoutes = Router();

// Get list of events with optional filtering
eventsRoutes.get("/", getEvents);

// Get specific event by ID
eventsRoutes.get("/:id", getEventById);

export default eventsRoutes;