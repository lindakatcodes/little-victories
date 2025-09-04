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
    const { error } = await actions.createProfile(formData);
    // would ideally like to be able to pass the new user info along with the navigation, but not sure how yet
    if (!error) navigate("/");
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
