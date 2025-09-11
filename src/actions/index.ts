import { defineAction, ActionError } from "astro:actions";
import { db, Profiles, Journeys, eq, and } from "astro:db";
import { z } from "astro:schema";
import crypto from "node:crypto";
import type { Task, RewardPicture } from "@utils/types.ts";

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
  getActiveJourney: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async ({ id }, ctx) => {
      console.log("finding the journey");
      const activeJourney = await db
        .select()
        .from(Journeys)
        .where(
          and(eq(Journeys.userId, id), eq(Journeys.isActiveJourney, true))
        );
      if (activeJourney.length > 0) {
        return activeJourney[0];
      } else {
        const newTaskList: Task[] = Array.from({ length: 15 }, (_, index) => ({
          taskId: index + 1,
          taskComplete: false,
          taskAction: "",
        }));

        const picUrl = `${
          import.meta.env.UNSPLASH_API
        }/photos/random?query=ocean&orientation=landscape&client_id=${
          import.meta.env.UNSPLASH_ACCESS_KEY
        }`;
        const freshPic = await fetch(picUrl).then((res) => res.json());
        const newReward: RewardPicture = {
          blur_hash: freshPic.blur_hash,
          description: freshPic.description,
          regUrl: freshPic.urls.regular,
          smUrl: freshPic.urls.small,
          dlUrl: freshPic.links.download,
          creditUrl: freshPic.user.links.html,
        };

        const newJourney = {
          id: crypto.randomUUID(),
          userId: id,
          isActiveJourney: true,
          tasksCompleted: 0,
          taskList: newTaskList,
          rewardPic: newReward,
        };

        await db.insert(Journeys).values(newJourney);
        return newJourney;
      }
    },
  }),
};
