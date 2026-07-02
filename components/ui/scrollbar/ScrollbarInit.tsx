"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Scrollbar from "smooth-scrollbar";

export default function ScrollbarInit() {
  const pathname = usePathname();

  const scrollbarRef = useRef<Scrollbar | null>(null);

  // Инициализация один раз
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const SmoothScrollbar = (await import("smooth-scrollbar")).default;

      const container = document.getElementById("scroll-container");

      if (!container || !mounted) return;

      if (!scrollbarRef.current) {
        scrollbarRef.current = SmoothScrollbar.init(container, {
          damping: 0.03,
        });
      }
    };

    init();

    return () => {
      mounted = false;
      scrollbarRef.current?.destroy();
      scrollbarRef.current = null;
    };
  }, []);

  // При смене маршрута
  useEffect(() => {
    if (!scrollbarRef.current) return;

    requestAnimationFrame(() => {
      scrollbarRef.current?.update();
      scrollbarRef.current?.scrollTo(0, 0, 0);
    });
  }, [pathname]);

  return null;
}
