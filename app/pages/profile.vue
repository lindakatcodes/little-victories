<script setup lang="ts">
const journeyStore = useJourneyStore();
await callOnce("journeys", () => journeyStore.getCompletedJourneys(), {
  mode: "navigation",
});
</script>

<template>
  <h1>Your Victory Gallery</h1>
  <!-- card grid here of earned reward images -->
  <p>Total completed journeys: {{ journeyStore.completedJourneys.length }}</p>
  <h2>Task Archive</h2>
  <!-- view of completed tasks and options to filter/search/sort them here -->
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
