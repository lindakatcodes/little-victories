import { db } from "../utils/turso";
import { Journeys } from "../database/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, "userId");
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No user id found in local cookies.",
    });
  }
  const activeJourney = await db
    .select()
    .from(Journeys)
    .where(
      and(eq(Journeys.userId, userId), eq(Journeys.isActiveJourney, true))
    );
  if (activeJourney.length > 0) {
    return {
      status: "Success",
      journey: activeJourney[0],
    };
  } else {
    return {
      status: "No active journey",
      journey: null,
    };
  }
});
