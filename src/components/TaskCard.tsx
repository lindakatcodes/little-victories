import styles from "@styles/task.module.css";
import { type Task } from "@utils/types.ts";
import { Icon } from "astro-icon/components";
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

  const allowCompletion =
    task.taskAction.task !== "Do the application" ? true : taskPrereq;

  const openDetailsDialog = () => {
    if (detailsDialogRef.current) detailsDialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (detailsDialogRef.current) detailsDialogRef.current.close();
    if (completionDialogRef.current) completionDialogRef.current.close();
  };

  const openCompleteDialog = () => {
    if (detailsDialogRef.current) detailsDialogRef.current.close();
    if (completionDialogRef.current) completionDialogRef.current.showModal();
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

    if (!error && completionDialogRef.current)
      completionDialogRef.current.close();
  };

  return (
    <>
      <div className={styles.taskWrapper}>
        {!task.taskComplete ? (
          <button className={styles.openBtn} onClick={openDetailsDialog}>
            <p>{task.taskId}</p>
            <p>{task.taskAction.task}</p>
          </button>
        ) : (
          <Icon name="star-filled" class={styles.taskComplete} />
        )}
      </div>

      <dialog ref={detailsDialogRef}>
        <button className={styles.closeBtn} onClick={closeDialog}>
          Close
        </button>
        <p>{task.taskAction.tip}</p>
        <button
          className={styles.doneBtn}
          onClick={openCompleteDialog}
          disabled={allowCompletion}
        >
          Mark as Completed!
        </button>
      </dialog>

      <dialog ref={completionDialogRef}>
        <form className={styles.completeForm}>
          <button className={styles.closeBtn} onClick={closeDialog}>
            Close
          </button>
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
        </form>
      </dialog>
    </>
  );
}
