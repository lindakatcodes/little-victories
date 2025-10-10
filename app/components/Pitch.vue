<template>
  <p>
    Job searching is a grind, and it's easy to burn out when you can't see
    progress. So I'm turning it into a game!
  </p>

  <p>
    Complete 15 actionable tasks each week (that's 3 tasks a day) to travel the
    path of landing a job and unlocking a prize. Each step of the path lets you
    select from a randomized list of tasks, so there's always one you can do.
  </p>

  <p>
    Your progress stays until you complete 15 tasks, so your actions aren't
    wasted when you have a hard week (and can be increased if you're having a
    good week). Your prizes are saved to your profile so you can visualize your
    progress.
  </p>

  <p class="bump">All forward movement counts.</p>

  <div class="cta">
    <p>Ready to try it out?</p>
    <NuxtLink to="/create-profile" class="styled-link"
      >Create a Profile</NuxtLink
    >
  </div>
</template>

<style scoped>
p {
  padding: 0 1rem;
  margin-bottom: 0.75rem;
  text-wrap: pretty;
}

.bump {
  font-weight: 600;
  font-size: var(--txt-lg);
  text-align: center;
}

.cta {
  display: grid;
  place-items: center;
  text-align: center;
}
</style>
