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
    journeyCompleted: (state) => state.currentJourney.tasksCompleted === 15,
    findRoleTaskStatus: (state) =>
      state.currentJourney.taskList.find(
        (task) => task.taskAction.task === "Find a job to apply for"
      )?.taskComplete ?? false,
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
    async createNewJourney(
      currentJourneyId: string
    ): Promise<
      { data: Journey; error?: never } | { data?: never; error: string }
    > {
      this.journeyLoading = true;
      this.journeyError = "";
      try {
        const data = await $fetch<Journey>("/api/createNewJourney", {
          method: "POST",
          body: {
            currentJourneyId,
          },
        });
        if (data) {
          this.currentJourney = data;
          return { data };
        }
        throw new Error("Failed to create a new journey.");
      } catch (e: any) {
        this.journeyError =
          e.data?.message ??
          "An error happened while trying to create a new journey.";
        return { error: this.journeyError };
      } finally {
        this.journeyLoading = false;
      }
    },
  },
});
