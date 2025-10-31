import { db } from "../utils/turso";
import { Journeys } from "../database/schema";
import { eq } from "drizzle-orm";
import { Task } from "../utils/types";

export default defineEventHandler(async (event) => {
  const { task, journeyId } = await readBody<{ task: Task; journeyId: string }>(
    event
  );

  if (!task) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Need a task to complete.",
    });
  }

  if (!journeyId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Need to know which journey this task is related to.",
    });
  }

  const journeys = await db
    .select()
    .from(Journeys)
    .where(eq(Journeys.id, journeyId));

  if (journeys.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Journey with ID ${journeyId} not found.`,
    });
  } else {
    const journey = journeys[0];

    const updatedTaskList: Task[] = journey.taskList.map((existingTask: Task) =>
      existingTask.taskId === task.taskId ? task : existingTask
    );

    await db
      .update(Journeys)
      .set({
        taskList: updatedTaskList,
        tasksCompleted: journey.tasksCompleted + 1,
      })
      .where(eq(Journeys.id, journeyId));

    return updatedTaskList;
  }
});
