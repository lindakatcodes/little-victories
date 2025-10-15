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

/* shared styles throughout the app */
.styled-link {
  padding: 0.5rem 0.75rem;
  background-color: var(--dark-blue);
  color: var(--light-blue);
  border-radius: 0.25rem;
  font-weight: 500;
  text-decoration: none;
}

.inverse-styled-link {
  padding: 0.5rem 0.75rem;
  background-color: var(--light-blue);
  color: var(--dark-blue);
  border-radius: 0.25rem;
  font-weight: 500;
  text-decoration: none;
}

.styled-button {
  padding: 0.5rem 0.75rem;
  background-color: var(--dark-blue);
  color: var(--light-blue);
  border-radius: 0.25rem;
  font-weight: 500;
}
</style>
