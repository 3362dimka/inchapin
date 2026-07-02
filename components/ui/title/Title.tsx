import React from "react";
import styles from "./Title.module.scss";

interface TitleProps extends React.HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Title({
  tag: Tag = "div",
  className,
  children,
  ...rest
}: TitleProps) {
  const tagName = typeof Tag === "string" ? Tag.toLowerCase() : "div";

  const classNames = [styles.title, styles[tagName] || "", className || ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classNames} {...rest}>
      {children}
    </Tag>
  );
}
