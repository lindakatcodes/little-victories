<template>
  <main>
    <NuxtPage />
  </main>
</template>

<style>
@import url("~/assets/styles/global.css");

:root {
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
