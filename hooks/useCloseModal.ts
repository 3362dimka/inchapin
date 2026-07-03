"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCloseModalOptions {
  onClose: () => void;
  animationMs?: number;
}

export function useCloseModal({
  onClose,
  animationMs = 300,
}: UseCloseModalOptions) {
  const [isClosing, setIsClosing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, animationMs);
  }, [isClosing, onClose, animationMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isClosing) {
        startClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startClose, isClosing]);

  return { isClosing, startClose };
}
