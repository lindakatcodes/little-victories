import { defineAction, ActionError } from "astro:actions";
import { db, Profiles, eq } from "astro:db";
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
      const existingEmail = await db
        .select()
        .from(Profiles)
        .where(eq(Profiles.email, email));
      if (existingEmail.length > 0) {
        throw new ActionError({
          code: "CONFLICT",
          message: "This email is already in use. Please sign in instead.",
        });
      }
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
  login: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async ({ id }, context) => {
      const user = await db.select().from(Profiles).where(eq(Profiles.id, id));
      await context.cookies.set("userId", id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        httpOnly: true,
        secure: import.meta.env.PROD,
      });
      return user;
    },
  }),
  logout: defineAction({
    handler: async (_input, context) => {
      await context.cookies.delete("userId", { path: "/" });
      return "signed out successfully";
    },
  }),
};
