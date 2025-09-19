import { useStore } from "@nanostores/react";
import { totalTasksCompleted } from "@stores/taskStore";
import styles from "@styles/rewardImage.module.css";
import type { RewardPicture } from "@utils/types.ts";
import { decode } from "blurhash";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

interface Props {
  image: RewardPicture;
  initialTasksCompleted: number;
}

export default function RewardImage({
  image,
  initialTasksCompleted,
  children,
}: PropsWithChildren<Props>) {
  const tasksCompleted = useStore(totalTasksCompleted);

  const rewardCredit = `${image.creditUrl}${import.meta.env.UNSPLASH_REFERRER}`;
  const rewardSource = `https://unsplash.com/${
    import.meta.env.UNSPLASH_REFERRER
  }`;
  const isLocked = tasksCompleted === 15 ? false : true;

  // create an element for the blurred picture when locked
  useEffect(() => {
    const buildImage = () => {
      const canvas = document.querySelector(
        "#locked-reward"
      ) as HTMLCanvasElement;
      const ctx = canvas!.getContext("2d");
      const hash = canvas.dataset.blurhash || "";

      const pixels = decode(hash, 48, 32);

      const imageData = ctx!.createImageData(48, 32);
      imageData.data.set(pixels);
      ctx!.putImageData(imageData, 0, 0);
    };
    buildImage();
  }, []);

  // set our store's value to the initial value from the page load
  useEffect(() => {
    totalTasksCompleted.set(initialTasksCompleted);
  }, []);

  return isLocked ? (
    <figure>
      <div className={styles.figImage}>
        <canvas
          id="locked-reward"
          data-blurhash={image.blur_hash}
          width="48"
          height="32"
        />
        <div className={styles.lock}>
          {children}
          <p>{`${tasksCompleted}/15 tasks`}</p>
        </div>
      </div>
      <figcaption>Complete tasks to unlock!</figcaption>
    </figure>
  ) : (
    <figure>
      <div className={styles.figImage}>
        <img src={image.smUrl} alt={image.description} />
      </div>
      <figcaption>
        <p>Photo by</p>
        <a href={rewardCredit}>{image.creditName}</a>
        <p>on</p>
        <a href={rewardSource}>Unsplash</a>
      </figcaption>
    </figure>
  );
}
