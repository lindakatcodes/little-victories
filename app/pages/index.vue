<script setup lang="ts">
import { useProfileStore } from '~/stores/profile';

const profileStore = useProfileStore();
</script>

<template>
  <section>
    <h1>Little Victories</h1>
    <Journey v-if="profileStore.isLoggedIn" />
    <Pitch v-else />
  </section>
</template>

<style>
section {
  max-inline-size: 95cqw;
  margin: 0 auto;

  @media (width >= 1024px) {
    & {
      max-inline-size: 70cqw;
    }
  }

  @media (width >= 1280px) {
    & {
      max-inline-size: 60cqw;
    }
  }

  @media (width >= 1536px) {
    & {
      max-inline-size: 50cqw;
    }
  }
}

h1 {
  text-align: center;
  margin: 1rem auto;
  font-weight: 700;
}
</style>
