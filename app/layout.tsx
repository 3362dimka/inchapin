import type { Metadata } from "next";
import "./globals.scss";
import { Header } from "@/components/layout/header/Header";
import ScrollbarInit from "@/components/ui/scrollbar/ScrollbarInit";

export const metadata: Metadata = {
  title: "INCHAPIN - Дом бизнес-класса для ценителей роскоши",
  description:
    "Уютное и безопасное пространство для счастливой, спокойной и размеренной жизни",
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
        <div id="scroll-container" className="conteiner">
          {children}
          {modal}
        </div>

        <ScrollbarInit />
      </body>
    </html>
  );
}
