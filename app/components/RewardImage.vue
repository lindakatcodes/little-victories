<script setup lang="ts">
import { decode } from "blurhash";

const props = defineProps<{
  image: RewardPicture;
  initialTasksCompleted: number;
}>();

const journeyStore = useJourneyStore();
const config = useRuntimeConfig();

const isAnimating = ref(false);
const showUnlocked = computed(() => {
  return journeyStore.journeyCompleted;
});

const lockedReward = ref<HTMLCanvasElement | null>(null);

// this is computed so when the hash changes it will recalculate
const blurredHash = computed(() => decode(props.image.blur_hash, 48, 32));

const rewardCredit = computed(() => `${journeyStore.currentJourney.rewardPic.creditUrl}/?${config.public.UNSPLASH_REFERRER}`);
const rewardSource = `https://unsplash.com/?${config.public.UNSPLASH_REFERRER}`;

const buildImage = () => {
  const canvas = lockedReward.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.createImageData(48, 32);
  imageData.data.set(blurredHash.value);
  ctx.putImageData(imageData, 0, 0);
};

onMounted(() => {
  buildImage();
});

// a watch directly for the image to change, so we get the new one when a new journey starts
watch(() => props.image, () => {
  buildImage();
}, { immediate: true });

watch(() => journeyStore.tasksCompleted, (updatedCount, prevCount) => {
  if (updatedCount >= 15) {
    isAnimating.value = true;
    setTimeout(() => {
      isAnimating.value = false;
    }, 800)
  }

  if (typeof prevCount !== 'undefined' && prevCount >= 15 && updatedCount === 0) {
    isAnimating.value = false;
    nextTick(() => {
      buildImage();
    })
  }
}, {immediate: true})

onBeforeUnmount(() => {isAnimating.value = false})
</script>

<template>
  <figure>
    <div class="figImage">
      <canvas
        v-if="!showUnlocked"
        ref="lockedReward"
        :data-blurhash="image.blur_hash"
        width="48"
        height="32"
        :class="{ fadeOut: isAnimating }"
      />
      <img
        v-if="showUnlocked || isAnimating"
        :src="image.smUrl"
        :alt="image.description"
        :class="{ fadeIn: isAnimating }"
      />
      <div
        v-if="!showUnlocked || isAnimating"
        class="lock"
        :class="{ unlockAnimation: isAnimating }"
      >
        <SvgoOpenLock v-if="isAnimating" />
        <SvgoClosedLock v-else />
        <p>{{ `${journeyStore.tasksCompleted}/15 tasks` }}</p>
      </div>
    </div>
    <figcaption>
      <template v-if="showUnlocked">
        <p>Photo by</p>
        <a :href="rewardCredit">{{ image.creditName }}</a>
        <p>on</p>
        <a :href="rewardSource">Unsplash</a>
      </template>
      <template v-else>Complete tasks to unlock!</template>
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  border-radius: 0.25rem;
  border: 0.25rem solid var(--seagreen);
  margin-bottom: 1rem;
  box-shadow: -4px 7px 15px -3px var(--dark-blue);
}

.figImage {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
  aspect-ratio: 6 / 4;
}

canvas {
  inline-size: 100%;
  grid-area: 1 / 1;
  transition: opacity 1s ease-out;
}

.lock {
  grid-area: 1 / 1;
  width: 7rem;
  color: var(--light-blue);
  background-color: rgba(7, 31, 54, 0.4);
  border-radius: 0.25rem;
  padding: 0.5rem;
  display: grid;
  justify-items: center;
  grid-template-rows: 2fr 1fr;
  z-index: 1;

  & svg {
    width: 3rem;
    height: 3rem;
  }
}

img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: center;
  grid-area: 1 / 1;
  transition: opacity 1s ease-out;
}

figcaption {
  background: var(--ivory);
  display: inline-flex;
  justify-content: center;
  width: 100%;
  gap: 0.25rem;
  padding: 0.25rem;

  & a {
    color: var(--dark-blue);
  }
}

.fadeOut {
  opacity: 0;
  transition: opacity 1s ease-out;
}

.fadeIn {
  opacity: 0;
  animation: fadeIn 1s ease-out 0.4s forwards;
}

.unlockAnimation {
  animation: unlock 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes unlock {
  0% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.2) rotate(-15deg);
    opacity: 0;
  }
}
</style>
