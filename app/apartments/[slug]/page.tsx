import type { Metadata } from "next";

import { APARTMENTS_MAP } from "@/data/apartments";

interface ApartmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ApartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const apartment = APARTMENTS_MAP[slug];

  if (!apartment) {
    return { title: "Квартира не найдена" };
  }

  return {
    title: apartment.title,
    description: apartment.description,
  };
}

export default async function ApartmentPage({ params }: ApartmentPageProps) {
  const { slug } = await params;
  const apartment = APARTMENTS_MAP[slug];

  if (!apartment) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <h1>Квартира не найдена</h1>
        <p>Такой квартиры не существует.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "100px 0" }}>
      <h1>{apartment.title}</h1>
      <p>{apartment.description}</p>
    </div>
  );
}
