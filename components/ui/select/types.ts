export type OptionType = {
  value: string;
  label: string;
  href?: string;
};

export type SelectProps = {
  options: OptionType[];
  placeholder?: string;
  value?: OptionType | null;
  onChange?: (option: OptionType | null) => void;
  isSearchable?: boolean;
  className?: string;
  ariaLabel?: string;
};
