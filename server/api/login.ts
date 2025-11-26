import { db } from "../utils/turso";
import { Profiles } from "../database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = body.id;

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "An ID must be provided to log in.",
    });
  }

  const user = await db.select().from(Profiles).where(eq(Profiles.id, userId));

  if (!user || user.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: "No user found matching the provided id.",
    });
  }

  setCookie(event, "userId", user[0].id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return user;
});
