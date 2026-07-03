import type { Metadata } from "next";
import Link from "next/link";

import { APARTMENTS } from "@/data/apartments";

export const metadata: Metadata = {
  title: "Квартиры",
  description: "Выберите квартиру в доме бизнес-класса INCHAPIN",
};

export default function ApartmentsPage() {
  return (
    <div style={{ padding: "100px 0" }}>
      <h1>Квартиры</h1>
      <ul>
        {APARTMENTS.map((apt) => (
          <li key={apt.slug}>
            <Link href={`/apartments/${apt.slug}`}>{apt.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
