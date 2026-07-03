import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  mask?: string;
}

export interface PhoneInputProps {
  value?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  name?: string;
  lazy?: boolean;
}
