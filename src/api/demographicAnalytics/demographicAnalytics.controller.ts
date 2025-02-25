import { Request, Response } from "express";

import {
  getDemographicAnalytics,
  getDemographicAnalyticsByVtId,
} from "./demographicAnalytics.repository";

export const getDemographicData = async (req: Request, res: Response) => {
  try {
    const demographicAnalytics = await getDemographicAnalytics();
    res.status(200).json({
      data: demographicAnalytics,
    });
  } catch (error) {
    console.error("Error getting vaccine categories:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getDemographicAnalyticsByVt = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const demographicAnalytics = await getDemographicAnalyticsByVtId(id);
    res.status(200).json({
      data: demographicAnalytics,
    });
  } catch (error) {
    console.error("Error getting vaccine category by slug:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
