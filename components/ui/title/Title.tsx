import styles from "./Title.module.scss";
import type { TitleProps } from "./types";

export type { TitleProps } from "./types";

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
