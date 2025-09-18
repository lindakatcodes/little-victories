import styles from "@styles/task.module.css";
import { type Task } from "@utils/types.ts";
import { actions } from "astro:actions";
import { useRef, useState } from "react";

export default function TaskCard({
  task,
  journeyId,
  taskPrereq,
}: {
  task: Task;
  journeyId: string;
  taskPrereq: boolean;
}) {
  const detailsDialogRef = useRef<HTMLDialogElement | null>(null);
  const completionDialogRef = useRef<HTMLDialogElement | null>(null);
  const [completedDescription, setCompletedDescription] = useState("");
  const [taskComplete, setTaskComplete] = useState(task.taskComplete);

  const allowCompletion =
    task.taskAction.task !== "Do the application" ? true : taskPrereq;

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
          <div className={styles.completed}>
            <p>Done</p>
          </div>
        )}
      </div>

      <dialog ref={detailsDialogRef}>
        <div>
          <button className={styles.closeBtn} onClick={closeDetailsDialog}>
            Close
          </button>
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
