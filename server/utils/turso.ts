import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const { turso } = useRuntimeConfig();

let clientConfig;

if (process.env.NODE_ENV === "development") {
  // For local development, use turso dev
  clientConfig = {
    url: "http://127.0.0.1:8080",
  };
} else {
  // For production or other environments, use the configured Turso database
  clientConfig = {
    url: turso.databaseUrl,
    authToken: turso.authToken,
  };
}

export const tursoClient = createClient(clientConfig);

export const db = drizzle(tursoClient);
