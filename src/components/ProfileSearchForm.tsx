import styles from "@styles/profileSearchForm.module.css";
import type { FormEvent, PropsWithChildren } from "react";
import { useState, useId } from "react";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";

interface Profile {
  id: string;
  name: string;
  email: string;
}

interface ProfileSearchFormProps {
  allProfiles: Profile[];
}

export default function ProfileSearchForm({
  allProfiles,
  children,
}: PropsWithChildren<ProfileSearchFormProps>) {
  const id = useId();
  const emailId = `${id}-email`;
  const [query, setQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

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
                  allProfiles.filter(
                    (profile) =>
                      profile.email
                        .toLowerCase()
                        .includes(input.toLowerCase()) ||
                      profile.name.toLowerCase().includes(input.toLowerCase())
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
              <button
                className={styles.resultsProfile}
                key={profile.id}
                onClick={async () => {
                  const { error } = await actions.login({ id: profile.id });
                  if (!error) navigate("/");
                }}
              >
                <p>{profile.name}</p>
                <span>|</span>
                <p>{profile.email}</p>
              </button>
            ))}
          </div>
        )}

        {filteredProfiles.length === 0 && query.length >= 3 && (
          <div className={styles.noResults}>
            <p>
              Hmm, it doesn't seem like we have a profile for this email. Would
              you like to make one?
            </p>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
