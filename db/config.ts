import { defineDb, defineTable, column } from "astro:db";

const Profiles = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
  },
});

export default defineDb({
  tables: { Profiles },
});
