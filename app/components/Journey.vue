<script setup lang="ts">
import { useJourneyStore } from "~/stores/journey";
import { type RewardPicture, type Task, Numbers } from "~/../server/utils/types";

const journeyStore = useJourneyStore();
await journeyStore.getActiveJourney();

const reward = journeyStore.currentJourney.rewardPic;

const rewardCredit = `${reward.creditUrl}/?${
  process.env.UNSPLASH_REFERRER
}`;
const rewardSource = `https://unsplash.com/?${
  process.env.UNSPLASH_REFERRER
}`;
</script>

<template>
  <section>
    <div class="reward">
      <RewardImage
        :image="reward"
        :imageCredit="rewardCredit"
        :imageSrc="rewardSource"
        :initialTasksCompleted="journeyStore.tasksCompleted"
      />
    </div>

    <div class="completed">
      <!-- <Button
        text="Start a new Journey!"
        action="setNewJourney"
        actionVars="{newJourneyVars}"
      /> -->
    </div>

    <div class="path-wrapper">
      <!-- <canvas class="path-canvas"></canvas> -->
      <!-- <div class="path-tiles">
        { tasks.map((task) => (
        <div class:list="{[`tile" ${Numbers[task.taskId]}`]}>
          <TaskCard
            task="{task}"
            journeyId="{data!.id}"
            findJobPrereq="{findJobTaskDone}"
            client:visible
          >
            <StarFilled />
          </TaskCard>
        </div>
        )) }
      </div> -->
    </div>
  </section>
</template>

<style scoped>
section {
  container: inline-size;
  inline-size: 80cqw;
  margin: 0 auto;

  @media (width >= 48rem) {
    & {
      inline-size: 75cqw;
    }
  }

  @media (width >= 64rem) {
    & {
      inline-size: 65cqw;
    }
  }

  @media (width >= 80rem) {
    & {
      inline-size: 55cqw;
    }
  }

  @media (width >= 96rem) {
    & {
      inline-size: 40cqw;
    }
  }
}

.reward {
  inline-size: 80cqw;
  margin: 0 auto;

  @media (width >= 48rem) {
    & {
      inline-size: 60cqw;
    }
  }

  @media (width >= 80rem) {
    & {
      inline-size: 50cqw;
    }
  }

  @media (width >= 96rem) {
    & {
      inline-size: 40cqw;
    }
  }
}

.completed {
  margin: 2rem auto;
  block-size: 2.875rem;
  display: grid;
  justify-items: center;
  visibility: hidden;
  opacity: 0;
}

.path-wrapper {
  inline-size: 80cqw;
  margin: 0 auto 2rem;
  display: grid;

  @media (width >= 48rem) {
    & {
      inline-size: 60cqw;
    }
  }

  @media (width >= 80rem) {
    & {
      inline-size: 50cqw;
    }
  }

  @media (width >= 96rem) {
    & {
      inline-size: 40cqw;
    }
  }
}

.path-canvas {
  grid-area: 1 / 1;
  inline-size: 100%;
  block-size: 100%;
  z-index: -1;
}

.path-tiles {
  grid-area: 1 / 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(15, 6rem);
  place-items: center;
  row-gap: 1.25rem;
}

.tile {
  inline-size: 7rem;
  block-size: 6rem;
  border: 2px solid var(--dark-blue);
  border-radius: 0.25rem;
  background: var(--light-blue);
}

.one {
  grid-column: 1 / span 2;
  grid-row: 15;
}

.two {
  grid-column: 2 / span 2;
  grid-row: 14;
}

.three {
  grid-column: 3 / span 2;
  grid-row: 13;
}

.four {
  grid-column: 4 / span 2;
  grid-row: 12;
}

.five {
  grid-column: 3 / span 2;
  grid-row: 11;
}

.six {
  grid-column: 2 / span 2;
  grid-row: 10;
}

.seven {
  grid-column: 1 / span 2;
  grid-row: 9;
}

.eight {
  grid-column: 2 / span 2;
  grid-row: 8;
}

.nine {
  grid-column: 3 / span 2;
  grid-row: 7;
}

.ten {
  grid-column: 4 / span 2;
  grid-row: 6;
}

.eleven {
  grid-column: 3 / span 2;
  grid-row: 5;
}

.twelve {
  grid-column: 2 / span 2;
  grid-row: 4;
}

.thirteen {
  grid-column: 1 / span 2;
  grid-row: 3;
}

.fourteen {
  grid-column: 2 / span 2;
  grid-row: 2;
}

.fifteen {
  grid-column: 3 / span 2;
  grid-row: 1;
}
</style>
