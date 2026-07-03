"use client";

import { useId } from "react";
import ReactSelect, {
  components,
  type OptionProps,
  type PlaceholderProps,
} from "react-select";
import Link from "next/link";
import ChevronDown from "@/components/icons/ChevronDown";
import styles from "./Select.module.scss";
import type { OptionType, SelectProps } from "./types";

export type { OptionType, SelectProps } from "./types";

const Option = (props: OptionProps<OptionType, false>) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      {data.href ? (
        <Link href={data.href} className={styles.optionLink}>
          {data.label}
        </Link>
      ) : (
        data.label
      )}
    </components.Option>
  );
};

const CustomPlaceholder = (props: PlaceholderProps<OptionType, false>) => {
  const { children, innerProps } = props;
  return (
    <div {...innerProps} className={styles.animationCnt}>
      <div data-text={children} className={styles.animationTop}>
        {children}
      </div>
    </div>
  );
};

export function Select({
  options,
  placeholder = "",
  value = null,
  onChange,
  isSearchable = false,
  className = "",
  ariaLabel,
}: SelectProps) {
  const rawId = useId();
  const id = rawId ? rawId.replace(/[:]/g, "") : undefined;
  const inputId = id ? `${id}-input` : undefined;

  return (
    <div className={`${styles.select} ${className}`}>
      <ReactSelect
        inputId={inputId}
        instanceId={id}
        isSearchable={isSearchable}
        classNamePrefix="select"
        options={options}
        placeholder={placeholder}
        value={value}
        aria-label={ariaLabel}
        onChange={(opt) => onChange?.(opt as OptionType | null)}
        components={{
          Option,
          Placeholder: CustomPlaceholder,
          IndicatorSeparator: () => null,
          DropdownIndicator: (props) => {
            const { innerProps } = props;
            return (
              <div {...innerProps}>
                <ChevronDown />
              </div>
            );
          },
        }}
      />
    </div>
  );
}
