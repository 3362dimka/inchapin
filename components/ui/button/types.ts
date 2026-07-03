import React from "react";
import Link from "next/link";

export type ButtonVariant = "button" | "ghost" | "link" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

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

export interface AnimateProps {
  children: React.ReactNode;
  className?: string;
}

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
