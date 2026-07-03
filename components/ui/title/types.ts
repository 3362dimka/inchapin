import React from "react";

export interface TitleProps extends React.HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}
