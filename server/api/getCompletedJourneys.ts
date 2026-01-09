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
  const completedJourneys = await db
    .select()
    .from(Journeys)
    .where(
      and(eq(Journeys.userId, userId), eq(Journeys.isActiveJourney, false))
    );
  if (completedJourneys.length > 0) {
    return {
      status: "Success",
      journeys: completedJourneys,
    };
  } else {
    return {
      status: "No completed journeys",
      journeys: null,
    };
  }
});
