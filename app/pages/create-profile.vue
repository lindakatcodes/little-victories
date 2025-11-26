<script setup lang="ts">
const formError = ref("");
const name = ref("");
const email = ref("");

const profileStore = useProfileStore();

async function handleSubmit() {
  formError.value = "";
  const { error } = await profileStore.createProfile(name.value, email.value);

  if (!error) {
    await navigateTo('/');
  } else {
    formError.value = error;
  }
}
</script>

<template>
  <h1>Create Your Profile</h1>
  <form @submit.prevent="handleSubmit">
    <span class="error">{{ formError }}</span>
    <label for="name">
      What would you like to be called?
      <input type="text" id="name" name="name" v-model="name" required />
    </label>
    <label for="email">
      Your email address
      <input type="email" id="email" name="email" v-model="email" required />
    </label>
    <button class="styled-button" type="submit">Create Profile</button>
  </form>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 1rem auto;
  font-weight: 800;
}

form {
  display: grid;
  gap: 0.75rem;
  inline-size: 85cqw;
  margin: 0 auto;

  @media (width >= 768px) {
    & {
      inline-size: 60cqw;
    }
  }

  @media (width >= 1024px) {
    & {
      inline-size: 45cqw;
    }
  }

  @media (width >= 1280px) {
    & {
      inline-size: 30cqw;
    }
  }
}

label {
  display: grid;
  gap: 0.25rem;
}

label:last-of-type {
  margin-bottom: 0.25rem;
}

input {
  border-radius: 0.25rem;
  padding: 0.25rem 0.375rem;
  border-color: var(--dark-blue);
}

.error {
  block-size: 1.5rem;
  font-weight: 600;
  text-decoration: underline wavy var(--seagreen);
  text-underline-offset: 0.375rem;
  margin-bottom: 0.25rem;
}
</style>
