import { taskList } from "./taskList";
import type { Task, RewardPicture } from "./types";

export const createJourney = async ({ id }: { id: string }) => {
  const newTaskList: Task[] = Array.from({ length: 15 }, (_, index) => ({
    taskId: index + 1,
    taskComplete: false,
    taskAction: taskList[index],
    taskCompleteNotes: "",
  })).reverse();

  const picUrl = `${process.env.UNSPLASH_API}/photos/random?query=ocean&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
  const freshPic = await fetch(picUrl).then((res) => res.json());
  const newReward: RewardPicture = {
    blur_hash: freshPic.blur_hash,
    description: freshPic.description,
    regUrl: freshPic.urls.regular,
    smUrl: freshPic.urls.small,
    dlUrl: freshPic.links.download,
    creditUrl: freshPic.user.links.html,
    creditName: freshPic.user.name,
  };

  return {
    id: crypto.randomUUID(),
    userId: id,
    isActiveJourney: true,
    tasksCompleted: 0,
    taskList: newTaskList,
    rewardPic: newReward,
  };
};
