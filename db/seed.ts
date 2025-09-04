import { db, Profiles } from "astro:db";

export default async function seed() {
  await db
    .insert(Profiles)
    .values([{ id: 1, name: "Linda", email: "hello@lindakat.com" }]);
}
