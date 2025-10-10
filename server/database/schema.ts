import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import type { Task, RewardPicture } from "../utils/types";

export const profiles = sqliteTable("profiles", {
  id: text().primaryKey(),
  name: text(),
  email: text().unique(),
});

export const journeys = sqliteTable("journeys", {
  id: text().primaryKey(),
  userId: text().references(() => profiles.id),
  taskList: text({ mode: "json" }).$type<Task[]>(),
  rewardPic: text({ mode: "json" }).$type<RewardPicture>(),
  tasksCompleted: integer().default(0),
  isActiveJourney: integer({ mode: "boolean" }),
});
