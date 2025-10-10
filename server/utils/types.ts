export interface Task {
  taskId: number;
  taskAction: {
    task: string;
    tip: string;
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

interface NumbersObject {
  [index: number]: string;
}

export const Numbers: NumbersObject = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
};
