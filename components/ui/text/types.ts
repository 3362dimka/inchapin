export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}
