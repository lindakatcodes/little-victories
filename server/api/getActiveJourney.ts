import { db } from "../utils/turso";
import { Journeys } from "../database/schema";
import { eq, and } from "drizzle-orm";
import { createJourney } from "../utils/createJourney";

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
    return activeJourney[0];
  } else {
    const newJourney = await createJourney({ id: userId });
    await db.insert(Journeys).values(newJourney);
    return newJourney;
  }
});
