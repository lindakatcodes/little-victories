import styles from "@styles/task.module.css";
import { type Task } from "@utils/types.ts";
import { actions } from "astro:actions";
import { useRef, useState } from "react";

export default function TaskCard({
  task,
  journeyId,
}: {
  task: Task;
  journeyId: string;
}) {
  const detailsDialogRef = useRef<HTMLDialogElement | null>(null);
  const completionDialogRef = useRef<HTMLDialogElement | null>(null);
  const [completedDescription, setCompletedDescription] = useState("");

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

  const handleCompletion = async () => {
    const updatedTask = {
      ...task,
      taskComplete: true,
      taskCompleteNotes: completedDescription,
    };

    const { error } = await actions.completeTask({
      task: updatedTask,
      journeyId: journeyId,
    });

    if (!error && completionDialogRef.current)
      completionDialogRef.current.close();
  };

  return (
    <>
      <div className={styles.taskWrapper}>
        <button className={styles.openBtn} onClick={openDetailsDialog}>
          {task.taskAction.task}
        </button>
      </div>

      <dialog ref={detailsDialogRef}>
        <button className={styles.closeBtn} onClick={closeDetailsDialog}>
          Close
        </button>
        <p>{task.taskAction.tip}</p>

        <button className={styles.doneBtn} onClick={openCompleteDialog}>
          Mark as Completed!
        </button>
      </dialog>

      <dialog ref={completionDialogRef}>
        <div className={styles.complete}>
          <label htmlFor="textarea">
            Leave a note for yourself of what you did to complete this task:
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
        </div>
      </dialog>
    </>
  );
}
