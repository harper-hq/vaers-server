import { NextFunction, Request, Response } from "express";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AsyncLocalStorage } from "node:async_hooks";
import pg from 'pg';
import { supabaseConnectionUri, supabaseDbPassword, supabaseServiceRole, supabaseUrl } from "../envVariables";
import { Database } from "./supabaseTypes";


export const pgp = require("pg-promise")();

export const pgpVaersDbConnection = pgp(supabaseConnectionUri);

export const supabaseStorage = new AsyncLocalStorage<SupabaseClient>();

export const createPool = () => {
  return new pg.Pool({
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.ffmgaojljhslrvqyrtiv',
    password: supabaseDbPassword
  })
}

export function createAdminSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceRole) {
    throw new Error("Supabase URL or service role is not set");
  }
  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
    },
  });
}

export function createVaersSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceRole) {
    throw new Error("Supabase URL or service role is not set");
  }
  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
    },
  });
}

// Helper function to get the current request's Supabase client
export function getSupabaseClient(): SupabaseClient<Database> {
  const client = supabaseStorage.getStore();
  if (!client) {
    throw new Error(
      "Supabase client is not initialized. Make sure you are using the middleware."
    );
  }
  return client;
}

// Middleware to initialize Supabase client for each request
export function initSupabaseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const supabase = createAdminSupabaseClient();
  supabaseStorage.run(supabase, next);
}

// Middleware to check and set authenticated session
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { access_token, refresh_token } = req.headers;

    if (!access_token || !refresh_token) {
      throw new Error("403");
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.setSession({
      access_token: access_token as string,
      refresh_token: refresh_token as string,
    });

    if (error) {
      throw new Error("401");
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(parseInt(error.message) || 500).json({
        error:
          error.message === "403"
            ? "Unauthorized - Missing tokens"
            : error.message === "401"
              ? "Invalid session"
              : "Internal server error",
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
