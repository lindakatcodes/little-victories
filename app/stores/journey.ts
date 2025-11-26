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
    journeyCompleted: (state) => state.currentJourney.tasksCompleted >= 15,
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
        const { data } = await useFetch<{
          status: string;
          journey: Journey | null;
        }>("/api/getActiveJourney");

        if (data.value) {
          // handle no active journey case first
          if (data.value.status === "No active journey") {
            const newJourney = await this.createNewJourney("");
            if (newJourney.error) {
              this.journeyError = newJourney.error;
            } else if (newJourney.data) {
              this.currentJourney = newJourney.data;
            }
          } else if (data.value.journey) {
            this.currentJourney = data.value.journey;
          }
        }
      } catch (e: any) {
        this.journeyError =
          e.data?.message ?? "An error occurred while fetching your journey.";
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
    async completeTask({
      task,
      journeyId,
    }: {
      task: Task;
      journeyId: string;
    }): Promise<
      | {
          data: { updatedTaskList: Task[]; updatedTasksCompleted: number };
          error?: never;
        }
      | { data?: never; error: string }
    > {
      this.journeyLoading = true;
      this.journeyError = "";
      try {
        const data = await $fetch<{
          updatedTaskList: Task[];
          updatedTasksCompleted: number;
        }>("/api/setTaskCompletion", {
          method: "POST",
          body: {
            task,
            journeyId,
          },
        });
        if (data) {
          this.currentJourney.taskList = data.updatedTaskList;
          this.currentJourney.tasksCompleted = data.updatedTasksCompleted;
          return { data };
        }
        throw new Error("Failed to mark the task as complete.");
      } catch (e: any) {
        this.journeyError =
          e.data?.message ??
          "An error happened while trying to mark a task as complete.";
        return { error: this.journeyError };
      } finally {
        this.journeyLoading = false;
      }
    },
  },
});
