import styles from "@styles/task.module.css";
import { useState, useRef, useId } from "react";
import { actions } from "astro:actions";
import { type Task } from "@utils/types.ts";

export default function TaskCard({
  task,
  isCurrentTask,
}: {
  task: Task;
  isCurrentTask: boolean;
}) {
  const [selectedAction, setSelectedAction] = useState(task.taskAction);
  const [completed, setCompleted] = useState(task.taskComplete);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const idMod = useId();
  const taskRefId = `${idMod}-${task.taskId}`;

  const openDialog = () => {
    if (dialogRef.current && isCurrentTask) dialogRef.current.showModal();
  };

  const closeDialog = (e: React.FormEvent) => {
    e.preventDefault();
    // check for a new action and if it exists update in db

    // check for completion check, if exists call the completion dialog and close this one

    // then close the dialog
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <div id={taskRefId} className={styles.taskWrapper}>
      <button className={styles.openBtn} onClick={openDialog}>
        {`Set Task ${task.taskId}`}
      </button>
      <p>{selectedAction}</p>

      <dialog ref={dialogRef}>
        <form>
          <button className={styles.closeBtn} onClick={closeDialog}>
            Close
          </button>
          <div className={styles.taskPicker}>
            <label htmlFor="select">Select your task:</label>
            <select
              id="select"
              autoFocus
              value={selectedAction}
              onChange={(event) => {
                setSelectedAction(event.target.value);
              }}
            >
              <option value="default">Choose…</option>
              <option value="task 1">task 1</option>
              <option value="task 2">task 2</option>
              <option value="task 3">task 3</option>
            </select>
          </div>
          {/* think I want to change this and make it a checkbox instead that you mark and then submit; then it'll open a new dialog to enter the notes and save those, and give a little emoji celebration */}
          <div className={styles.complete}>
            <p>
              <input
                id={`complete-${taskRefId}`}
                type="checkbox"
                checked={completed}
                onChange={(event) => {
                  setCompleted(event.target.checked);
                }}
              />
              <label htmlFor={`complete-${taskRefId}`}>Task finished?</label>
            </p>
            <button
              className={styles.doneBtn}
              onClick={closeDialog}
              disabled={!completed}
            >
              Mark as Completed!
            </button>
          </div>
          {/* <div className={styles.complete}>
            <label htmlFor="textarea">
              Task finished? Write a quick note detailing how you completed it:
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
              onClick={closeDialog}
              disabled={completedDescription === ""}
            >
              Mark as Complete!
            </button>
          </div> */}
        </form>
      </dialog>
    </div>
  );
}
