<script setup lang="ts">
import { useProfileStore } from "~/stores/profile";
import type { UserObject } from "~~/server/utils/types";

const profileStore = useProfileStore();
const allProfiles = await profileStore.getAllProfiles();

const emailQuery = ref("");
const filteredProfiles = ref<UserObject[]>([]);

function filterProfiles() {
  emailQuery.value.length >= 2
    ? (filteredProfiles.value = allProfiles.filter((profile) => {
        return (
          profile.email
            .toLowerCase()
            .includes(emailQuery.value.toLowerCase()) ||
          profile.name.toLowerCase().includes(emailQuery.value.toLowerCase())
        );
      }))
    : (filteredProfiles.value = []);
}

async function handleClick(id: string) {
  // const { error } = await profileStore.login(id);
  // if (!error) {
  //   await navigateTo("/");
  // }
}
</script>

<template>
  <h1>Find Your Profile</h1>
  <section>
    <form>
      <label for="email">Type your name or email below</label>
      <input
        type="email"
        id="email"
        v-model="emailQuery"
        placeholder="Search by email..."
        @input="filterProfiles"
      />
    </form>
    <div class="results">
      <p class="resultsTitle">
        A list of profiles will appear below once you start searching. If you
        see yours, click on it!
      </p>

      <div v-if="filteredProfiles.length >= 1" class="profiles">
        <button
          v-for="profile in filteredProfiles"
          @click="handleClick(profile.id)"
        >
          <p>{{ profile.name }}</p>
          <span>|</span>
          <p>{{ profile.email }}</p>
        </button>
      </div>

      <div
        v-if="filteredProfiles.length === 0 && emailQuery.length >= 3"
        class="noResults"
      >
        <p>
          Hmm, it doesn't seem like we have a profile for this email. Would you
          like to make one?
        </p>
        <NuxtLink to="/create-profile" class="styled-link"
          >Create a Profile</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 1rem auto;
  font-weight: 800;
}

section {
  max-inline-size: 95cqw;
  margin: 0 auto 2rem;
  container-type: inline-size;

  @media (width >= 768px) {
    & {
      max-inline-size: 60cqw;
    }
  }

  @media (width >= 1024px) {
    & {
      max-inline-size: 45cqw;
    }
  }

  @media (width >= 1280px) {
    & {
      max-inline-size: 35cqw;
    }
  }
}

form {
  display: grid;
  gap: 0.75rem;
  inline-size: 90cqw;
  margin: 0 auto 2rem;
}

label {
  text-align: center;
}

input {
  border-radius: 0.25rem;
  padding: 0.25rem 0.375rem;
  border-color: var(--dark-blue);
}

.resultsTitle {
  font-weight: 600;
  font-size: 1.25rem;
  inline-size: 90cqw;
  margin: 0 auto 2rem;
  text-wrap: pretty;
}

.profiles {
  display: grid;
  gap: 1.25rem;
  inline-size: 90cqw;
  margin: 0 auto;
}

.resultsProfile {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  background: var(--dark-blue);
  color: var(--light-blue);
  cursor: pointer;
}

.noResults {
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  inline-size: 90cqw;
  margin: 0 auto;
}
</style>
