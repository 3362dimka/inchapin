import type { Metadata, Viewport } from "next";
import "./globals.scss";
import { Header } from "@/components/layout/header/Header";
import { ScrollbarProvider } from "@/components/ui/scrollbar/ScrollbarProvider";

const SITE_URL = "https://inchapin.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "INCHAPIN - Дом бизнес-класса для ценителей роскоши",
    template: "%s | INCHAPIN",
  },
  description:
    "Уютное и безопасное пространство для счастливой, спокойной и размеренной жизни. Квартиры от 65 до 356 м² с чистовой отделкой в закрытой охраняемой территории.",
  keywords: [
    "недвижимость",
    "квартиры бизнес-класса",
    "INCHAPIN",
    "дом бизнес-класса",
    "квартиры с отделкой",
    "закрытая территория",
  ],
  authors: [{ name: "INCHAPIN" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "INCHAPIN",
    title: "INCHAPIN - Дом бизнес-класса для ценителей роскоши",
    description:
      "Уютное и безопасное пространство для счастливой, спокойной и размеренной жизни. Квартиры от 65 до 356 м².",
    images: [
      {
        url: "/images/hero-pc.webp",
        width: 1760,
        height: 600,
        alt: "INCHAPIN - Дом бизнес-класса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INCHAPIN - Дом бизнес-класса для ценителей роскоши",
    description:
      "Уютное и безопасное пространство для счастливой, спокойной и размеренной жизни.",
    images: ["/images/hero-pc.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <ScrollbarProvider>
          <div className="container" role="main">
            {children}
            {modal}
          </div>
        </ScrollbarProvider>
      </body>
    </html>
  );
}
