import { defineDb, defineTable, column } from "astro:db";

const Profiles = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
  },
});

const Journeys = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => Profiles.columns.id }),
    taskList: column.json(),
    rewardPic: column.json(),
    tasksCompleted: column.number({ default: 0 }),
    isActiveJourney: column.boolean(),
  },
});

export default defineDb({
  tables: { Profiles, Journeys },
});
