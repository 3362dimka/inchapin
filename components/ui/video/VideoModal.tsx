"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./VideoModal.module.scss";
import type { VideoModalProps } from "./types";

export type { VideoModalProps } from "./types";

const isFullscreenSupported = (): boolean => {
  if (typeof document === "undefined") return false;
  if (document.fullscreenEnabled) return true;
  const doc = document as unknown as { webkitFullscreenEnabled?: boolean };
  return !!doc.webkitFullscreenEnabled;
};

const requestFullscreen = (el: HTMLElement): Promise<void> => {
  const anyEl = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
  };
  if (el.requestFullscreen) return el.requestFullscreen();
  if (anyEl.webkitRequestFullscreen) return anyEl.webkitRequestFullscreen();
  return Promise.resolve();
};

const exitFullscreen = (): Promise<void> => {
  if (document.exitFullscreen) return document.exitFullscreen();
  const doc = document as unknown as {
    webkitExitFullscreen?: () => Promise<void>;
  };
  if (doc.webkitExitFullscreen) return doc.webkitExitFullscreen();
  return Promise.resolve();
};

export function VideoModal({ isOpen, onClose, src }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(async () => {
    if (document.fullscreenElement || (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement) {
      await exitFullscreen().catch(() => {});
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const handleFullscreenChange = () => {
      const isFS = document.fullscreenElement || (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement;
      if (!isFS) {
        onClose();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    if (isFullscreenSupported()) {
      requestFullscreen(containerRef.current).catch(() => {});
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    if (isOpen) {
      video.play().catch(() => {});
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
