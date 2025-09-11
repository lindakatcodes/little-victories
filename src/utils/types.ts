export interface Task {
  taskId: number;
  taskComplete: boolean;
  taskAction: string;
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
