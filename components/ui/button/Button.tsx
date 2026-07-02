"use client";

import React, { forwardRef } from "react";
import Link from "next/link";

import styles from "./Button.module.scss";

type ButtonVariant = "button" | "ghost" | "link" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps & {
  as?: "button";
  href?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = BaseButtonProps & {
  as: "link";
  href: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

interface AnimateProps {
  children: React.ReactNode;
  className?: string;
}

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

interface ButtonWithLoadingProps extends BaseButtonProps {
  isLoading?: boolean;
}

type ButtonAsButtonWithLoading = ButtonWithLoadingProps & {
  as?: "button";
  href?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLinkWithLoading = ButtonWithLoadingProps & {
  as: "link";
  href: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

export type ButtonWithLoading = ButtonAsButtonWithLoading | ButtonAsLinkWithLoading;

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
