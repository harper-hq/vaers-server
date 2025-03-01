import { User } from "@supabase/supabase-js";
import bodyParser, { urlencoded } from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";

import vaersRoutes from "./api/vaers/vaers.routes";
import vaccineCategoryRoutes from "./api/vaccineCategory/vaccineCategory.routes";
import uniqueVaccineTypeRoutes from "./api/uniqueVaccineTypes/uniqueVaccineTypes.routes";
import demographicAnalyticsRoutes from "./api/demographicAnalytics/demographicAnalytics.routes";

declare global {
  namespace Express {
    interface Request {
      rawBody?: string;
      user?: User;
    }
  }
}

export function createApp() {
  const app: Express = express();

  const corsOptions = {
    origin: "*",
  };
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(urlencoded({ extended: false }));
  app.use(
    bodyParser.json({
      limit: "50mb",
      verify: (
        req: Request,
        res: Response,
        buf: Buffer,
        encoding: BufferEncoding
      ) => {
        if (buf && buf.length) {
          req.rawBody = buf.toString(encoding || "utf8");
        }
      },
    })
  );

  app.use("/vaers", vaersRoutes);
  app.use("/vaccine-category", vaccineCategoryRoutes);
  app.use("/unique-vaccine-types", uniqueVaccineTypeRoutes);
  app.use("/demographic-analytics", demographicAnalyticsRoutes);

  app.use("/", (req: Request, res: Response) => {
    res.send("It's alive! I'm the Harper AI server. Let's gooooo!");
  });

  return app;
}
