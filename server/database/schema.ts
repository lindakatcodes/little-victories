import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import type { Task, RewardPicture } from "../utils/types";

export const Profiles = sqliteTable("profiles", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().unique().notNull(),
});

export const Journeys = sqliteTable("journeys", {
  id: text().primaryKey(),
  userId: text()
    .references(() => Profiles.id)
    .notNull(),
  taskList: text({ mode: "json" }).$type<Task[]>().notNull(),
  rewardPic: text({ mode: "json" }).$type<RewardPicture>().notNull(),
  tasksCompleted: integer().default(0).notNull(),
  isActiveJourney: integer({ mode: "boolean" }).notNull(),
});
