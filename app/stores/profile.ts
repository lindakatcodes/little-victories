import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    error: "",
    loading: false,
    userData: {
      name: "",
      email: "",
    },
  }),
  getters: {},
  actions: {
    async createProfile(
      name: string,
      email: string
    ): Promise<{ data?: any; error?: string }> {
      this.loading = true;
      this.error = "";

      try {
        const data = await $fetch("/api/createProfile", {
          method: "POST",
          body: {
            name,
            email,
          },
        });

        this.userData.name = data[0]!.name as string;
        this.userData.email = data[0]!.email as string;

        return { data };
      } catch (e: any) {
        this.error = e.data.message;
        return { error: e.data.message };
      } finally {
        this.loading = false;
      }
    },
  },
});
