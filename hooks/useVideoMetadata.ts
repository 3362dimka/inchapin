"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseVideoMetadataOptions {
  src: string;
  enabled?: boolean;
}

interface UseVideoMetadataReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  duration: string;
  isLoaded: boolean;
}

export function useVideoMetadata({
  src,
  enabled = true,
}: UseVideoMetadataOptions): UseVideoMetadataReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState("--:-- минут");
  const [isLoaded, setIsLoaded] = useState(false);

  const formatDuration = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")} минут`;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const d = video.duration;
      if (!isNaN(d) && d > 0) {
        setDuration(formatDuration(d));
        setIsLoaded(true);
      }
    };

    if (video.duration > 0) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    video.addEventListener("error", () => setIsLoaded(true));

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [src, enabled, formatDuration]);

  return { videoRef, duration, isLoaded };
}
