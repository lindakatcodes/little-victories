import { useStore } from "@nanostores/react";
import { findRoleTaskStatus, totalTasksCompleted } from "@stores/taskStore";
import styles from "@styles/task.module.css";
import { type Task } from "@utils/types.ts";
import { actions } from "astro:actions";
import type { PropsWithChildren } from "react";
import { useEffect, useRef, useState } from "react";

interface TaskCardProps {
  task: Task;
  journeyId: string;
  findJobPrereq: boolean;
}

export default function TaskCard({
  task,
  journeyId,
  findJobPrereq,
  children,
}: PropsWithChildren<TaskCardProps>) {
  const detailsDialogRef = useRef<HTMLDialogElement | null>(null);
  const completionDialogRef = useRef<HTMLDialogElement | null>(null);
  const [completedDescription, setCompletedDescription] = useState("");
  const [taskComplete, setTaskComplete] = useState(task.taskComplete);
  const isFindRoleTaskComplete = useStore(findRoleTaskStatus);
  const tasksCompletedCount = useStore(totalTasksCompleted);

  useEffect(() => {
    findRoleTaskStatus.set(findJobPrereq);
  }, []);

  // a few tasks are specifically related to finding a role to apply for and doing the work to fill out the application well. these we want to not let be completed unless you've already found a role - otherwise they don't make sense.
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

    // create a clean copy with our updated info
    const updatedTask = {
      ...task,
      taskComplete: true,
      taskCompleteNotes: completedDescription,
    };

    // update the db
    const { error } = await actions.completeTask({
      task: updatedTask,
      journeyId: journeyId,
    });

    // if the db entry went well, we need to tell this card the task is complete, check for if it was the prereq for other tasks and if so update that, and update the count of completed tasks
    if (!error) {
      setTaskComplete(true);

      if (task.taskAction.task === "Find a job to apply for") {
        findRoleTaskStatus.set(true);
      }

      const newTasksCompletedTotal = tasksCompletedCount + 1;
      totalTasksCompleted.set(newTasksCompletedTotal);

      // then finally closing the dialog itself
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
