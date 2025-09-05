import styles from "@styles/createProfileForm.module.css";
import type { ComponentProps } from "astro/types";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import type { FormEvent } from "react";
import { useState } from "react";

export default function CreateProfileForm(
  props: ComponentProps<typeof String>
) {
  const [emailError, setEmailError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { error } = await actions.createProfile(formData);
    if (!error) navigate("/");
    if (error && error.code === "CONFLICT") {
      setEmailError(`* ${error.message}`);
    }
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
        <span className={styles.error}>{emailError}</span>
      </label>
      {props.submitButton}
    </form>
  );
}
