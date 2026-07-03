"use client";

import { usePathname } from "next/navigation";
import { Select } from "./Select";
import type { OptionType, SelectProps } from "./types";

interface SelectWithActiveProps extends Omit<SelectProps, "value"> {
  detectActive?: (pathname: string, options: OptionType[]) => OptionType | null;
}

export function SelectWithActive({
  options,
  detectActive,
  ...rest
}: SelectWithActiveProps) {
  const pathname = usePathname();

  const value = detectActive ? detectActive(pathname, options) : null;

  return <Select options={options} value={value} {...rest} />;
}
