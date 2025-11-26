<script setup lang="ts">
  const profileStore = useProfileStore();
  await callOnce('profile', () => profileStore.getActiveUser(), { mode: 'navigation' })
</script>

<template>
  <main>
    <NavBar />
    <NuxtPage />
  </main>
</template>

<style>
/* global stylesheet is setting css vars and default text sizing */
@import url("~/assets/styles/global.css");

/* main layout settings */
body {
  font-family: "Plus Jakarta Sans Variable", sans-serif;
  background: var(--light-blue, #bfdbf7);
  color: var(--dark-blue, #071f36);
  display: grid;
  grid-template-rows: max-content 1fr;
}

main {
  container: main / inline-size;
  inline-size: 100%;
}
</style>
