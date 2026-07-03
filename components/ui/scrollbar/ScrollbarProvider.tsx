"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type Scrollbar from "smooth-scrollbar";

const MOBILE_BREAKPOINT = 768;

function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

interface ScrollbarProviderProps {
  children: ReactNode;
}

export function ScrollbarProvider({ children }: ScrollbarProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Определение мобилки
  useEffect(() => {
    const check = () => setIsMobile(getIsMobile());
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Инициализация скролла (только десктоп)
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    let mounted = true;

    const init = async () => {
      const SmoothScrollbar = (await import("smooth-scrollbar")).default;

      if (!containerRef.current || !mounted) return;

      if (!scrollbarRef.current) {
        scrollbarRef.current = SmoothScrollbar.init(containerRef.current, {
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
  }, [isMobile]);

  // При смене маршрута — скролл наверх
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
      return;
    }

    if (!scrollbarRef.current) return;

    requestAnimationFrame(() => {
      scrollbarRef.current?.update();
      scrollbarRef.current?.scrollTo(0, 0, 0);
    });
  }, [pathname, isMobile]);

  return (
    <div
      ref={containerRef}
      className="scroll-container"
      style={
        isMobile
          ? undefined
          : { height: "100vh", overflow: "hidden" }
      }
    >
      {children}
    </div>
  );
}
