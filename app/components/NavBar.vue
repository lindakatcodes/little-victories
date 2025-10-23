<script setup lang="ts">
import { useProfileStore } from "~/stores/profile";

const profileStore = useProfileStore();

async function handleClick() {
  await profileStore.logout();
  if (!profileStore.error) {
    await navigateTo("/");
  }
}
</script>

<template>
  <nav>
    <NuxtLink to="/" class="home">Little Victories</NuxtLink>
    <div v-if="profileStore.isLoggedIn">
      <p>Welcome back, {{ profileStore.activeUser.name }}</p>
      <button class="inverse-styled-button" @click="handleClick">
        Sign Out
      </button>
    </div>
    <NuxtLink v-else to="/pick-profile" class="inverse-styled-link"
      >Sign In</NuxtLink
    >
  </nav>
</template>

<style scoped>
nav {
  background-color: var(--dark-blue);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.5rem 1rem;
}

.home {
  color: var(--light-blue);
  font-weight: 600;
  font-size: var(--txt-lg);
  text-decoration: none;
}

div {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  color: var(--light-blue);
}
</style>
