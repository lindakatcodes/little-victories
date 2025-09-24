// @ts-expect-error
import ClosedLock from "@icons/lock.svg?react";
// @ts-expect-error
import OpenLock from "@icons/open-lock.svg?react";
import { useStore } from "@nanostores/react";
import { totalTasksCompleted } from "@stores/taskStore";
import styles from "@styles/rewardImage.module.css";
import type { RewardPicture } from "@utils/types.ts";
import { decode } from "blurhash";
import { useEffect, useState } from "react";

interface Props {
  image: RewardPicture;
  imageCredit: string;
  imageSrc: string;
  initialTasksCompleted: number;
}

export default function RewardImage({
  image,
  imageCredit,
  imageSrc,
  initialTasksCompleted,
}: Props) {
  const tasksCompleted = useStore(totalTasksCompleted);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showUnlocked, setShowUnlocked] = useState(false);

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

  // watches for all tasks to be complete to trigger a reward animation
  useEffect(() => {
    if (tasksCompleted === 15) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowUnlocked(true);
      }, 800);
    }
  }, [tasksCompleted]);

  return (
    <figure>
      <div className={styles.figImage}>
        {(!showUnlocked || isAnimating) && (
          <canvas
            id="locked-reward"
            data-blurhash={image.blur_hash}
            width="48"
            height="32"
            className={isAnimating ? styles.fadeOut : ""}
          />
        )}
        {(showUnlocked || isAnimating) && (
          <img
            src={image.smUrl}
            alt={image.description}
            className={isAnimating ? styles.fadeIn : ""}
          />
        )}
        {(!showUnlocked || isAnimating) && (
          <div
            className={`${styles.lock} ${
              isAnimating ? styles.unlockAnimation : ""
            }`}
          >
            {isAnimating ? <OpenLock /> : <ClosedLock />}
            <p>{`${tasksCompleted}/15 tasks`}</p>
          </div>
        )}
      </div>
      <figcaption>
        {showUnlocked ? (
          <>
            <p>Photo by</p>
            <a href={imageCredit}>{image.creditName}</a>
            <p>on</p>
            <a href={imageSrc}>Unsplash</a>
          </>
        ) : (
          "Complete tasks to unlock!"
        )}
      </figcaption>
    </figure>
  );
}
