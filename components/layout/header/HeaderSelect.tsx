"use client";

import { usePathname } from "next/navigation";
import { Select } from "@/components/ui/select/Select";
import { UI } from "@/data/ui";
import type { OptionType } from "@/components/ui/select/types";

function detectApartment(pathname: string, options: OptionType[]): OptionType | null {
  const match = pathname.match(/\/apartments\/([^/]+)/);
  if (!match) return null;
  const slug = match[1];
  return options.find((o) => o.value === slug) ?? null;
}

interface HeaderSelectProps {
  className?: string;
}

export function HeaderSelect({ className }: HeaderSelectProps) {
  const pathname = usePathname();
  const value = detectApartment(pathname, UI.header.apartments);

  return (
    <Select
      className={className}
      ariaLabel={UI.header.selectAriaLabel}
      options={UI.header.apartments}
      value={value}
      placeholder={UI.header.selectPlaceholder}
    />
  );
}
