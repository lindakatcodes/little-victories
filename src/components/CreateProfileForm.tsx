import type { FormEvent } from "react";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import type { ComponentProps } from "astro/types";
import styles from "@styles/createProfileForm.module.css";

export default function CreateProfileForm(
  props: ComponentProps<typeof String>
) {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { data, error } = await actions.createProfile(formData);

    if (error) return console.log({ error });
    localStorage.setItem("userId", data[0].id);
    navigate("/");
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <label htmlFor="name" className={styles.label}>
        What would you like to be called?
        <input
          type="text"
          id="name"
          name="name"
          required
          className={styles.input}
        />
      </label>
      <label htmlFor="email" className={styles.label}>
        Your email address
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
        />
      </label>
      {props.submitButton}
    </form>
  );
}
