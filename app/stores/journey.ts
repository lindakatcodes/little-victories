import { defineStore } from "pinia";

interface JourneyState {
  error: string;
  loading: boolean;
  tasksCompleted: number;
  currentJourneyId: string;
}

export const useJourneyStore = defineStore("journey", {
  state: (): JourneyState => ({
    error: "",
    loading: false,
    tasksCompleted: 0,
    currentJourneyId: "",
  }),
  actions: {},
});
