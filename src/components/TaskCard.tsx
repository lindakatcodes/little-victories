import styles from "@styles/task.module.css";
import { type Task } from "@utils/types.ts";
import { actions } from "astro:actions";
import { useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
import { useStore } from "@nanostores/react";
import { findRoleTaskStatus } from "@stores/taskStore";

interface TaskCardProps {
  task: Task;
  journeyId: string;
  taskPrereq: boolean;
}

export default function TaskCard({
  task,
  journeyId,
  taskPrereq,
  children,
}: PropsWithChildren<TaskCardProps>) {
  const detailsDialogRef = useRef<HTMLDialogElement | null>(null);
  const completionDialogRef = useRef<HTMLDialogElement | null>(null);
  const [completedDescription, setCompletedDescription] = useState("");
  const [taskComplete, setTaskComplete] = useState(task.taskComplete);
  const isFindRoleTaskComplete = useStore(findRoleTaskStatus);

  // useEffect(() => {
  //   findRoleTaskStatus.set(taskPrereq);
  // }, [taskPrereq]);

  // a few tasks are specifically related to finding a role to apply for and doing the work to fill the application well. these we want to not let be completed unless you've already found a role - otherwise they don't make sense.
  const taskIdsWithPrereq = [5, 7, 8];

  const allowCompletion = taskIdsWithPrereq.includes(task.taskId)
    ? isFindRoleTaskComplete ?? false
    : true;

  const openDetailsDialog = () => {
    if (detailsDialogRef.current) detailsDialogRef.current.showModal();
  };

  const closeDetailsDialog = () => {
    if (detailsDialogRef.current) detailsDialogRef.current.close();
  };

  const openCompleteDialog = () => {
    if (detailsDialogRef.current) detailsDialogRef.current.close();
    if (completionDialogRef.current) completionDialogRef.current.showModal();
  };

  const closeCompleteDialog = (e: React.FormEvent) => {
    e.preventDefault();
    if (completionDialogRef.current) completionDialogRef.current.close();
  };

  const handleCompletion = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      taskComplete: true,
      taskCompleteNotes: completedDescription,
    };

    const { error } = await actions.completeTask({
      task: updatedTask,
      journeyId: journeyId,
    });

    if (!error) {
      setTaskComplete(true);
      if (task.taskAction.task === "Find a job to apply for") {
        findRoleTaskStatus.set(true);
      }
      if (completionDialogRef.current) completionDialogRef.current.close();
    } else {
      console.log({ error });
    }
  };

  return (
    <>
      <div className={styles.taskWrapper}>
        {!taskComplete ? (
          <button className={styles.openBtn} onClick={openDetailsDialog}>
            <p>{task.taskId}</p>
            <p>{task.taskAction.task}</p>
          </button>
        ) : (
          <div className={styles.completed}>{children}</div>
        )}
      </div>

      <dialog ref={detailsDialogRef}>
        <div>
          <button className={styles.closeBtn} onClick={closeDetailsDialog}>
            Close
          </button>
          {taskIdsWithPrereq.includes(task.taskId) && (
            <p>
              NOTE: This task can only be completed after you've done the 'Find
              a role to apply for' task!
            </p>
          )}
          <p>{task.taskAction.tip}</p>
          <button
            className={styles.doneBtn}
            onClick={openCompleteDialog}
            disabled={!allowCompletion}
          >
            Completed!
          </button>
        </div>
      </dialog>

      <dialog ref={completionDialogRef}>
        <form>
          <button className={styles.closeBtn} onClick={closeCompleteDialog}>
            Close
          </button>
          <label htmlFor="textarea">
            Write a reminder for future you on how you completed this task:
          </label>
          <textarea
            id="textarea"
            value={completedDescription}
            autoFocus={true}
            onChange={(event) => {
              setCompletedDescription(event.target.value);
            }}
          />
          <button
            className={styles.doneBtn}
            onClick={handleCompletion}
            disabled={completedDescription === ""}
          >
            Save note & complete
          </button>
        </form>
      </dialog>
    </>
  );
}
