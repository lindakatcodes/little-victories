import { defineAction } from "astro:actions";
import { db, Profiles } from "astro:db";
import { z } from "astro:schema";
import crypto from "node:crypto";

export const server = {
  createProfile: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    // can try storing the id as a cookie pulled in from the context option, but will need to adjust the path and expiration time so they last
    handler: async ({ name, email }) => {
      const id = crypto.randomUUID();
      const newUser = await db
        .insert(Profiles)
        .values({ id, name, email })
        .returning();
      return newUser;
    },
  }),
};
