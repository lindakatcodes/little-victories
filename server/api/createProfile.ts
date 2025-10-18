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
      statusMessage: "Bad Request",
      message: "Name is required.",
    });
  }

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Email is required.",
    });
  }

  const id = crypto.randomUUID();
  const existingEmail = await db
    .select()
    .from(Profiles)
    .where(eq(Profiles.email, email));
  if (existingEmail.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: "Conflict",
      message: "This email is already in use. Please sign in instead.",
    });
  }
  const newUser = await db
    .insert(Profiles)
    .values({ id, name, email })
    .returning();

  setCookie(event, "userId", id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return newUser[0];
});
