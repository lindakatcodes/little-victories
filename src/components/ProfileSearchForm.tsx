import styles from "@styles/ProfileSearchForm.module.css";
import type { ComponentProps } from "astro/types";
import type { FormEvent } from "react";
import { useState, useId } from "react";

interface Props {
  LinkButton: ComponentProps<typeof String>;
  allProfiles: {
    id: string;
    name: string;
    email: string;
  }[];
}

export default function ProfileSearchForm(props: Props) {
  const id = useId();
  const emailId = `${id}-email`;
  const [query, setQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<
    Props["allProfiles"]
  >([]);

  return (
    <section>
      <form>
        <label htmlFor={emailId}>Type your email below</label>
        <input
          type="email"
          id={emailId}
          value={query}
          placeholder="Search by email..."
          onChange={(e: FormEvent<HTMLInputElement>) => {
            const input = e.currentTarget.value;
            setQuery(input);
            input.length >= 2
              ? setFilteredProfiles(
                  props.allProfiles.filter((profile) =>
                    profile.email.includes(input)
                  )
                )
              : setFilteredProfiles([]);
          }}
        />
      </form>
      <div className={styles.results}>
        <p className={styles.resultsTitle}>
          A list of profiles will appear below once you start searching. If you
          see yours, click on it!
        </p>

        {filteredProfiles.length >= 1 && (
          <div className={styles.profiles}>
            {filteredProfiles.map((profile) => (
              <div className={styles.resultsProfile} key={profile.id}>
                <p>{profile.name}</p>
                <span>|</span>
                <p>{profile.email}</p>
              </div>
            ))}
          </div>
        )}

        {filteredProfiles.length === 0 && query.length >= 3 && (
          <div className={styles.noResults}>
            <p>
              Hmm, it doesn't seem like we have a profile for this email. Would
              you like to make one?
            </p>
            {props.LinkButton}
          </div>
        )}
      </div>
    </section>
  );
}
