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
    handler: async ({ name, email }, context) => {
      const id = crypto.randomUUID();
      const newUser = await db
        .insert(Profiles)
        .values({ id, name, email })
        .returning();

      await context.cookies.set("userId", id, {
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
        path: "/",
        httpOnly: true,
        secure: import.meta.env.PROD,
      });
      return newUser;
    },
  }),
};
