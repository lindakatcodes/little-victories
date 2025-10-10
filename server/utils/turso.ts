import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const { turso } = useRuntimeConfig();
export const tursoClient = createClient({
  url: turso.databaseUrl,
  authToken: turso.authToken,
});

export const db = drizzle(tursoClient);
