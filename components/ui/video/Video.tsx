"use client";

import { useState, useEffect, useRef } from "react";
import PlayIcon from "@/components/icons/PlayIcon";
import styles from "./Video.module.scss";
import Image from "next/image";
import { VideoModal } from "./VideoModal";

export function Video() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoDuration, setVideoDuration] = useState<string>("--:-- минут");
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Получение длительности видео при монтировании
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log("loadedmetadata сработало", video.duration);
      const duration = video.duration;
      if (!isNaN(duration) && duration > 0 && !isLoaded) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")} минут`;
        setVideoDuration(formattedDuration);
        setIsLoaded(true);
      }
    };

    // Проверяем, уже ли загружены метаданные
    if (video.duration > 0) {
      console.log("Метаданные уже загружены", video.duration);
      handleLoadedMetadata();
    } else {
      console.log("Ожидание loadedmetadata");
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // Обработка ошибок загрузки
    video.addEventListener("error", (e) => {
      console.error("Ошибка загрузки видео", e);
      setIsLoaded(true);
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <>
      <div className={`${styles.VideoBlock}`} onClick={openModal}>
        <div className={`${styles.VideoInfo}`}>
          <div className={`${styles.VideoName}`}>Видео о проекте</div>
          <div className={`${styles.VideoTime}`}>{videoDuration}</div>
        </div>
        <div className={`${styles.VideoDecor}`}></div>
        <div className={`${styles.VideoPreview}`}>
          <Image
            className={`${styles.img}`}
            src="/images/video-preview.jpg"
            width={241}
            height={241}
            alt="about"
            sizes="(max-width: 767px) 100vw, 733px"
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
