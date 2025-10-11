import { db } from "../utils/turso";
import { Profiles } from "../database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { name, email } = await readBody<{ name: string; email: string }>(
    event
  );

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name is required",
    });
  }

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is required",
    });
  }

  const id = crypto.randomUUID();
  const existingEmail = await db
    .select()
    .from(Profiles)
    .where(eq(Profiles.email, email));
  if (existingEmail.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "This email is already in use. Please sign in instead.",
    });
  }
  const newUser = await db
    .insert(Profiles)
    .values({ id, name, email })
    .returning();

  setCookie(event, "userId", id);

  return newUser;
});
