import { db } from "../utils/turso";
import { Profiles } from "../database/schema";

export default defineEventHandler(async () => {
  const allUsers = await db.select().from(Profiles);
  return allUsers;
});
