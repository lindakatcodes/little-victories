import { db } from "../utils/turso";
import { Journeys } from "../database/schema";
import { eq } from "drizzle-orm";
import { createJourney } from "../utils/createJourney";

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, "userId");
  const { currentJourneyId } = await readBody<{ currentJourneyId: string }>(
    event
  );
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No user id found in local cookies.",
    });
  }
  if (!currentJourneyId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message:
        "No current journey id provided, this is needed to complete the current journey.",
    });
  }
  await db
    .update(Journeys)
    .set({
      isActiveJourney: false,
    })
    .where(eq(Journeys.id, currentJourneyId));

  const newJourney = await createJourney({ id: userId });
  await db.insert(Journeys).values(newJourney);
  return newJourney;
});
