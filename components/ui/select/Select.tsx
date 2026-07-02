"use client";

import { useId } from "react";
import ReactSelect from "react-select";
import Link from "next/link";
import ChevronDown from "@/components/icons/ChevronDown";
import styles from "./Select.module.scss";

export type OptionType = {
  value: string;
  label: string;
  href?: string;
};

type Props = {
  options: OptionType[];
  placeholder?: string;
  value?: OptionType | null;
  onChange?: (option: OptionType | null) => void;
  isSearchable?: boolean;
  className?: string;
  ariaLabel?: string;
};

import { components, OptionProps, PlaceholderProps } from "react-select";

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
}: Props) {
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
