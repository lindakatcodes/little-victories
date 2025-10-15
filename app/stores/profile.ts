import { defineStore } from "pinia";
import type { UserObject } from "~~/server/utils/types";

interface ProfileState {
  error: string;
  loading: boolean;
  activeUser: UserObject;
}

export const useProfileStore = defineStore("profile", {
  state: (): ProfileState => ({
    error: "",
    loading: false,
    activeUser: {
      id: "",
      name: "",
      email: "",
    },
  }),
  actions: {
    async createProfile(
      name: string,
      email: string
    ): Promise<
      { data: UserObject; error?: never } | { data?: never; error: string }
    > {
      this.loading = true;
      this.error = "";

      try {
        const data: UserObject = await $fetch("/api/createProfile", {
          method: "POST",
          body: {
            name,
            email,
          },
        });

        this.activeUser = data;

        return { data };
      } catch (e: any) {
        this.error = e.data.message;
        return { error: e.data.message };
      } finally {
        this.loading = false;
      }
    },
    async getActiveUser() {
      this.loading = true;
      this.error = "";
      try {
        const user: UserObject[] = await $fetch("/api/getActiveUser");
        if (user.length > 0 && user[0]) {
          this.activeUser = user[0];
          this.error = "";
        } else {
          this.activeUser = {
            id: "",
            name: "",
            email: "",
          };
          this.error = "";
        }
      } catch (e: any) {
        this.error = e.data.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
