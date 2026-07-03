"use client";

import { useState } from "react";
import PlayIcon from "@/components/icons/PlayIcon";
import styles from "./Video.module.scss";
import Image from "next/image";
import { VideoModal } from "./VideoModal";
import { HOME } from "@/data/home";
import { useVideoMetadata } from "@/hooks/useVideoMetadata";

export function Video() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { videoRef, duration } = useVideoMetadata({
    src: "/videos/video.mp4",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.VideoBlock}`} onClick={openModal}>
        <div className={`${styles.VideoInfo}`}>
          <div className={`${styles.VideoName}`}>{HOME.video.label}</div>
          <div className={`${styles.VideoTime}`}>{duration}</div>
        </div>
        <div className={`${styles.VideoDecor}`}></div>
        <div className={`${styles.VideoPreview}`}>
          <Image
            quality={90}
            className={`${styles.img}`}
            src="/images/video-preview.webp"
            width={241}
            height={241}
            alt="Превью видео о проекте"
            sizes="(max-width: 767px) 100vw, 733px"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQxIiBoZWlnaHQ9IjI0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQxIiBoZWlnaHQ9IjI0MSIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
          />
          <div className={`${styles.VideoPlay}`}>
            <PlayIcon />
            <div>play</div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        src="/videos/video.mp4"
      />

      <video
        ref={videoRef}
        src="/videos/video.mp4"
        style={{ display: "none" }}
        preload="metadata"
      />
    </>
  );
}
