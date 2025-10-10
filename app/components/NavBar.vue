<script setup lang="ts"></script>

<template>
  <nav>
    <NuxtLink to="/" class="home">Little Victories</NuxtLink>
    <NuxtLink to="/pick-profile" class="inverse-styled-link">Sign In</NuxtLink>
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
</style>
