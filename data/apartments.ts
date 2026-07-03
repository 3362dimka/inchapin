export interface Apartment {
  slug: string;
  label: string;
  title: string;
  description: string;
}

export const APARTMENTS: Apartment[] = [
  {
    slug: "first",
    label: "Квартира 1",
    title: "Квартира 1",
    description: "Просторная квартира с чистовой отделкой",
  },
  {
    slug: "second",
    label: "Квартира 2",
    title: "Квартира 2",
    description: "Уютная квартира с панорамными окнами",
  },
];

export const APARTMENTS_MAP: Record<string, Apartment> = Object.fromEntries(
  APARTMENTS.map((apt) => [apt.slug, apt]),
);
