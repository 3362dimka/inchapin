"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./BurgerMenu.module.scss";
import Modal from "@/components/ui/modal/Modal";
import { Title } from "../title/Title";

export function BurgerMenu({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-expanded={open}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className={`${styles.burgerMenu}`}
        onClick={() => setOpen((s) => !s)}
      >
        <div className={`${styles.burgerIcon} ${open ? styles.open : ""}`}>
          <div />
          <div />
          <div />
        </div>
        <div className={styles.burgerText}>{children}</div>
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <Modal.Header>Меню</Modal.Header>
          <Modal.Body>
            <nav className={styles.menuNav}>
              <ul>
                <li>
                  <Link href="/">Главная</Link>
                </li>
                <li>
                  <Link href="/about">О нас</Link>
                </li>
                <li>
                  <Link href="/apartments">Квартиры</Link>
                </li>
                <li>
                  <Link href="/contacts">Контакты</Link>
                </li>
              </ul>
            </nav>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
