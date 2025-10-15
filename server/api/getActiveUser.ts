import { db } from "../utils/turso";
import { Profiles } from "../database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, "userId");
  if (!userId) {
    return [];
  }
  const user = await db.select().from(Profiles).where(eq(Profiles.id, userId));
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No user found matching the provided id.",
    });
  }
  return user;
});
