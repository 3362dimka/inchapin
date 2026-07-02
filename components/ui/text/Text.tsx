import React from "react";
import styles from "./Text.module.scss";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Text({
  tag: Tag = "div",
  className,
  children,
  size = "md",
  ...rest
}: TextProps) {
  const tagName = typeof Tag === "string" ? Tag.toLowerCase() : "div";

  const classNames = [
    styles.text,
    styles[tagName] || "",
    styles[size] || "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classNames} {...rest}>
      {children}
    </Tag>
  );
}
