import { defineStore } from "pinia";
import type { UserObject } from "~~/server/utils/types";
import { useJourneyStore } from "./journey";

interface ProfileState {
  profileError: string;
  profileLoading: boolean;
  activeUser: UserObject;
}

export const useProfileStore = defineStore("profile", {
  state: (): ProfileState => ({
    profileError: "",
    profileLoading: false,
    activeUser: {
      id: "",
      name: "",
      email: "",
    },
  }),
  getters: {
    isLoggedIn: (state) => state.activeUser.id !== "",
  },
  actions: {
    async createProfile(
      name: string,
      email: string
    ): Promise<
      { data: UserObject; error?: never } | { data?: never; error: string }
    > {
      this.profileLoading = true;
      this.profileError = "";

      try {
        const { data } = await useFetch<UserObject>("/api/createProfile", {
          method: "POST",
          body: {
            name,
            email,
          },
        });

        if (data.value) {
          this.activeUser = data.value;
          return { data: data.value };
        }
        throw new Error("Failed to create a profile.");
      } catch (e: any) {
        this.profileError =
          e.data?.message ?? "An error without a specific message occurred.";
        return { error: this.profileError };
      } finally {
        this.profileLoading = false;
      }
    },
    async getActiveUser() {
      this.profileLoading = true;
      this.profileError = "";
      try {
        const { data } = await useFetch<UserObject[]>("/api/getActiveUser");
        if (data.value?.[0]) {
          const user = data.value[0];
          this.activeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } else {
          this.activeUser = {
            id: "",
            name: "",
            email: "",
          };
        }
      } catch (e: any) {
        this.profileError =
          e.data?.message ?? "An error without a specific message occurred.";
      } finally {
        this.profileLoading = false;
      }
    },
    async getAllProfiles(): Promise<UserObject[]> {
      this.profileLoading = true;
      this.profileError = "";
      try {
        const { data } = await useFetch<UserObject[]>("/api/getAllProfiles");
        return data.value ?? [];
      } catch (e: any) {
        this.profileError =
          e.data?.message ?? "An error without a specific message occurred.";
        return [];
      } finally {
        this.profileLoading = false;
      }
    },
    async login(id: string) {
      this.profileLoading = true;
      this.profileError = "";
      try {
        const data = await $fetch<UserObject[]>("/api/login", {
          method: "POST",
          body: { id },
        });
        if (data?.[0]) {
          this.activeUser = data[0];
        } else {
          this.activeUser = {
            id: "",
            name: "",
            email: "",
          };
        }
      } catch (e: any) {
        this.profileError =
          e.data?.message ?? "An error without a specific message occurred.";
      } finally {
        this.profileLoading = false;
      }
    },
    async logout() {
      this.profileLoading = true;
      this.profileError = "";
      try {
        await $fetch("/api/logout");
        this.activeUser = {
          id: "",
          name: "",
          email: "",
        };
        const journeyStore = useJourneyStore();
        journeyStore.$reset();
      } catch (e: any) {
        this.profileError =
          e.data?.message ?? "An error without a specific message occurred.";
      } finally {
        this.profileLoading = false;
      }
    },
  },
});
