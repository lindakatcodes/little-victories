import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  createProfile: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    handler: async ({ name, email }) => {
      /* name and email need to get entered into the db */
      return { name, email };
    },
  }),
};
