"use client";

import { forwardRef } from "react";
import Link from "next/link";

import styles from "./Button.module.scss";
import type { AnimateProps, ButtonWithLoading } from "./types";

export type { ButtonProps, ButtonWithLoading, ButtonVariant, ButtonSize } from "./types";

export const Animate = ({ children, className }: AnimateProps) => {
  return (
    <div className={`${styles.animationCnt}`}>
      <div
        data-text={children}
        className={`${styles.animationTop} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonWithLoading
>(
  (
    { children, variant = "button", size = "md", className, as, href, isLoading = false, ...rest },
    ref,
  ) => {
    const classes = [
      styles.buttonBase,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (as === "link" || href) {
      return (
        <Link
          href={href!}
          className={classes}
          {...(rest as Omit<
            React.ComponentProps<typeof Link>,
            "href" | "className" | "children"
          >)}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        disabled={isLoading}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
      >
        {isLoading ? "Отправка..." : children}
      </button>
    );
  },
);

Button.displayName = "Button";
