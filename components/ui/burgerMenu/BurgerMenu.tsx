"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./BurgerMenu.module.scss";
import Modal from "@/components/ui/modal/Modal";
import { UI } from "@/data/ui";

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
          <Modal.Header>{UI.menu.title}</Modal.Header>
          <Modal.Body>
            <nav className={styles.menuNav}>
              <ul>
                {UI.menu.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
