import { atom } from "nanostores";

export const findRoleTaskStatus = atom<boolean | null>(null);
export const totalTasksCompleted = atom<number>(0);
