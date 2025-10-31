<script setup lang="ts">
const props = defineProps<{
  task: Task;
  journeyId: string;
}>();

const journeyStore = useJourneyStore();

const detailsDialog = useTemplateRef("detailsDialog");
const completionDialog = useTemplateRef("completionDialog");
const completedDescription = ref("");

const allowCompletion = computed(() => {
  if (!props.task.taskAction.hasPrereq) return true;
  return journeyStore.findRoleTaskStatus;
})

function openDetailsDialog() {
  if (detailsDialog.value) detailsDialog.value.showModal();
}

function closeDetailsDialog() {
  if (detailsDialog.value) detailsDialog.value.close();
}

function openCompleteDialog() {
  if (detailsDialog.value) detailsDialog.value.close();
  if (completionDialog.value) completionDialog.value.showModal();
}

function closeCompleteDialog() {
  if (completionDialog.value) completionDialog.value.close();
}

function handleTaskCompletion() {}
</script>

<template>
  <div class="taskWrapper">
    <button
      v-if="!task.taskComplete"
      class="openBtn"
      @click="openDetailsDialog"
      type="button"
    >
      <p>{{ task.taskId }}</p>
      <p>{{ task.taskAction.task }}</p>
    </button>
    <div v-else class="completed">
      <SvgoStarFilled />
    </div>
  </div>

  <dialog ref="detailsDialog">
    <div>
      <button type="button" class="closeBtn" @click="closeDetailsDialog">
        Close
      </button>
      <p>{{ task.taskAction.tip }}</p>
      <button
        type="button"
        class="doneBtn"
        @click="openCompleteDialog"
        :disabled="!allowCompletion"
      >
        Completed!
      </button>
    </div>
  </dialog>

  <dialog ref="completionDialog">
    <form>
      <button type="button" class="closeBtn" @click="closeCompleteDialog">
        Close
      </button>
      <label for="textarea"
        >Write a reminder for future you on how you completed this task:
      </label>
      <textarea id="textarea" autofocus v-model="completedDescription" />
      <button
        type="submit"
        class="doneBtn"
        @click.prevent="handleTaskCompletion"
        :disabled="completedDescription === ''"
      >
        Save note & complete
      </button>
    </form>
  </dialog>
</template>

<style scoped>
.taskWrapper {
  inline-size: 100%;
  block-size: 100%;
  display: grid;
  place-items: center;
}

.openBtn {
  background: none;
  color: inherit;
  border: none;
  inline-size: 100%;
  block-size: 100%;

  & p {
    font-size: var(--txt-sm);
  }

  &:focus {
    outline-offset: 0.25rem;
    border-radius: 0.125rem;
  }
}

.closeBtn {
  background: var(--dark-blue);
  color: var(--light-blue);
  justify-self: end;
  border-radius: 0.25rem;
  padding: 0.5rem;
}

.doneBtn {
  background: var(--dark-blue);
  color: var(--light-blue);
  border-radius: 0.25rem;
  padding: 0.5rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

::backdrop {
  opacity: 0.85;
  background-color: var(--dark-blue);
}

dialog {
  background-color: var(--light-blue);
  border-radius: 0.25rem;
  border: 2px solid var(--dark-blue);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  inline-size: 85dvw;

  & form,
  & div {
    display: grid;
    gap: 1.25rem;

    & textarea {
      border-radius: 0.25rem;
      padding: 0.25rem 0.375rem;
      border-color: var(--dark-blue);
    }
  }

  @media (width >= 1024px) {
    & {
      inline-size: 65dvw;
    }
  }

  @media (width >= 1280px) {
    & {
      inline-size: 50dvw;
    }
  }

  @media (width >= 1536px) {
    & {
      inline-size: 35dvw;
    }
  }
}

.completed {
  inline-size: 100%;
  block-size: 100%;
  background: var(--dark-blue);
  display: grid;
  place-items: center;

  & svg {
    inline-size: 2.5rem;
    block-size: 2.5rem;
    color: var(--light-blue);
  }
}
</style>
