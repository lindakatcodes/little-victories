<script setup lang="ts">
import ClosedLock from "~/assets/icons/lock.svg";
import OpenLock from "~/assets/icons/open-lock.svg";
import type { RewardPicture } from "~~/server/utils/types";
import { decode } from "blurhash";
import { useJourneyStore } from "~/stores/journey";
import { onMounted } from "vue";

const props = defineProps<{
  image: RewardPicture;
  imageCredit: string;
  imageSrc: string;
  initialTasksCompleted: number;
}>();

const journeyStore = useJourneyStore();
const isAnimating = useState("isAnimating", () => false);
const showUnlocked = useState("showUnlocked", () => false);

const lockedReward = ref<HTMLCanvasElement | null>(null);

const buildImage = () => {
  const canvas = lockedReward.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const hash = canvas.dataset.blurhash || "";
  console.log(canvas, ctx, hash)
  const pixels = decode(hash, 48, 32);

  const imageData = ctx.createImageData(48, 32);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
};

// onMounted(() => buildImage());

// need a watcher ?? or similar to update my state values when the right number of tasks are complete - maybe those need to be computed values and set in the store instead? except once needs to be delayed

//     // watches for all tasks to be complete to trigger a reward animation
//     useEffect(() => {
//       if (tasksCompleted === 15) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setShowUnlocked(true);
//       }, 800);
//     }
//   }, [tasksCompleted]);
</script>

<template>
  <figure>
    <div class="figImage">
      <!-- <canvas
        v-if="!showUnlocked || isAnimating"
        id="locked-reward"
        :data-blurhash="image.blur_hash"
        width="48"
        height="32"
        :class="{ isAnimating: 'fadeOut' }"
      />
      <img
        v-if="showUnlocked || isAnimating"
        :src="image.smUrl"
        :alt="image.description"
        :class="{ isAnimating: 'fadeIn' }"
      /> -->
      <!-- <div
        v-if="!showUnlocked || isAnimating"
        class="lock"
        :class="{ isAnimating: 'unlockAnimation' }"
      >
        <OpenLock v-if="isAnimating" />
        <ClosedLock v-else />
        <p>{{ `${journeyStore.tasksCompleted}/15 tasks` }}</p>
      </div> -->
    </div>
    <figcaption>
      <template v-if="showUnlocked">
        <p>Photo by</p>
        <a :href="imageCredit">{{ image.creditName }}</a>
        <p>on</p>
        <a :href="imageSrc">Unsplash</a>
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
