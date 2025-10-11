import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({}),
  getters: {},
  actions: {
    async createProfile(name: string, email: string) {
      // if i want loading or error state, init those here
      try {
        const data = await $fetch("/api/createProfile", {
          method: "POST",
          body: {
            name,
            email,
          },
        });

        return { data };
        // set any state values here
      } catch (e) {
        // do something with the error here
      } finally {
        // if i did a loading state fall, close it here
      }
    },
  },
});

// const { error } = await actions.createProfile(formData);
//     if (!error) navigate("/");
//     if (error && error.code === "CONFLICT") {
//       setEmailError(`* ${error.message}`);
//     }
