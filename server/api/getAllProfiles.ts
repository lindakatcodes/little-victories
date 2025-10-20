import { db } from "../utils/turso";
import { Profiles } from "../database/schema";

export default defineEventHandler(async () => {
  const allUsers = await db.select().from(Profiles);
  console.log({ allUsers });
  return allUsers;
});
