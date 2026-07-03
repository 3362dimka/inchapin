"use client";

import { useState } from "react";
import { IMaskInput } from "react-imask";

import styles from "./Input.module.scss";
import type { InputProps, PhoneInputProps } from "./types";

export type { InputProps } from "./types";

const PhoneInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  className,
  placeholder,
  name,
  lazy,
}: PhoneInputProps) => {
  return (
    <IMaskInput
      mask="+{7} (000) 000-00-00"
      lazy={lazy}
      placeholderChar="_"
      value={value || ""}
      onAccept={(value: string) => {
        onChange?.({
          target: {
            value: value,
            name: name,
          },
        });
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      placeholder={placeholder}
      unmask={false}
    />
  );
};

export const Input = ({
  label,
  error,
  className,
  mask,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = !!String(props.value ?? "").trim();
  const isActive = isFocused || hasValue;

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
  };

  const inputElement =
    mask === "phone" ? (
      <PhoneInput
        className={`${styles.input} ${error ? styles.inputErrorBorder : ""} ${className || ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange as PhoneInputProps["onChange"]}
        value={String(props.value ?? "")}
        placeholder={isFocused ? props.placeholder : ""}
        name={props.name}
        lazy={!isFocused}
      />
    ) : (
      <input
        {...props}
        className={`${styles.input} ${error ? styles.inputErrorBorder : ""} ${className || ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={isFocused ? props.placeholder : ""}
      />
    );

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.inputLabel}>
        {inputElement}
        <span
          className={`${styles.floatingLabel} ${isActive ? styles.floatingLabelActive : ""}`}
        >
          {label}
        </span>
      </label>
      {error && <span className={styles.inputError}>{error}</span>}
    </div>
  );
};
