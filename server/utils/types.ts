export interface UserObject {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  taskId: number;
  taskAction: {
    task: string;
    tip: string;
    hasPrereq: boolean;
  };
  taskComplete: boolean;
  taskCompleteNotes: string;
}

export interface RewardPicture {
  blur_hash: string;
  description: string;
  regUrl: string;
  smUrl: string;
  dlUrl: string;
  creditUrl: string;
  creditName: string;
}

export interface Journey {
  id: string;
  userId: string;
  isActiveJourney: boolean;
  tasksCompleted: number;
  taskList: Task[];
  rewardPic: RewardPicture;
}
