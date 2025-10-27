import { defineStore } from "pinia";
import type { Journey, RewardPicture } from "~~/server/utils/types";

interface JourneyState {
  journeyError: string;
  journeyLoading: boolean;
  currentJourney: Journey;
}

export const useJourneyStore = defineStore("journey", {
  state: (): JourneyState => ({
    journeyError: "",
    journeyLoading: false,
    currentJourney: {
      id: "",
      userId: "",
      isActiveJourney: false,
      tasksCompleted: 0,
      taskList: [],
      rewardPic: {} as RewardPicture,
    },
  }),
  getters: {
    tasksCompleted: (state) => state.currentJourney.tasksCompleted,
  },
  actions: {
    async getActiveJourney() {
      this.journeyLoading = true;
      this.journeyError = "";
      try {
        const { data } = await useFetch<Journey>("/api/getActiveJourney");
        if (data.value) {
          this.currentJourney = data.value;
        }
      } catch (e: any) {
        this.journeyError =
          e.data?.message ?? "An error without a specific message occurred.";
      } finally {
        this.journeyLoading = false;
      }
    },
  },
});
