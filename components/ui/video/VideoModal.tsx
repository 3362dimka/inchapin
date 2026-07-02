"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./VideoModal.module.scss";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

export function VideoModal({ isOpen, onClose, src }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }

    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    containerRef.current?.requestFullscreen().catch((err) => {
      console.warn("Ошибка входа в полноэкранный режим:", err);
    });

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isOpen, onClose]);

  // Получение длительности видео
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    const handleLoadedMetadata = () => {
      const duration = video.duration;
      if (!isNaN(duration)) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const formattedDuration = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")} минут`;

        const durationElement = document.querySelector(
          `.${styles.videoDuration}`,
        );

        if (durationElement) {
          durationElement.textContent = formattedDuration;
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isOpen]);

  // Автовоспроизведение
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      video.play().catch((err) => {
        console.warn("Автовоспроизведение заблокировано:", err);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.fullscreenContainer} ref={containerRef}>
      <button
        className={styles.closeButton}
        onClick={closeModal}
        aria-label="Закрыть"
      >
        ✕
      </button>

      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          controls
          playsInline
          poster="/images/video-preview.jpg"
        >
          <source src={src} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>
  );
}
