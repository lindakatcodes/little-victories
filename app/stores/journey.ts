import { defineStore } from "pinia";
import type { Journey } from "~~/server/utils/types";

interface JourneyState {
  journeyError: string;
  journeyLoading: boolean;
  tasksCompleted: number;
  currentJourneyId: string;
}

export const useJourneyStore = defineStore("journey", {
  state: (): JourneyState => ({
    journeyError: "",
    journeyLoading: false,
    tasksCompleted: 0,
    currentJourneyId: "",
  }),
  actions: {
    async getActiveJourney() {
      this.journeyLoading = true;
      this.journeyError = "";
      try {
        const currentJourney = await $fetch<Journey>("/api/getActiveJourney");
        if (currentJourney) {
          this.tasksCompleted = currentJourney.tasksCompleted;
          this.currentJourneyId = currentJourney.id;
        }
      } catch (err: any) {
        this.journeyError = err.data.message;
      } finally {
        this.journeyLoading = false;
      }
    },
  },
});
