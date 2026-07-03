"use client";

import { createContext, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import CloseIcon from "@/components/icons/CloseIcon";
import type { ModalContextType, ModalProps, ModalHeaderProps, ModalBodyProps } from "./types";

export type { ModalProps, ModalHeaderProps, ModalBodyProps } from "./types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalComponent({ children, onClose }: ModalProps) {
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [closing, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !closing) {
        startClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [startClose, closing]);

  useEffect(() => {
    return () => {
      setClosing(false);
    };
  }, []);

  const content = useMemo(() => (
    <ModalContext.Provider value={{ onClose, closing, setClosing, startClose }}>
      <div className={`${styles.overlay} ${closing ? styles.closing : ""}`}>
        <button onClick={startClose} className={styles.closeBtn}>
          <CloseIcon />
        </button>
        <div
          ref={ref}
          className={`${styles.modalContent} ${closing ? styles.closingContent : ""}`}
          role="dialog"
          aria-modal
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  ), [children, closing, onClose, startClose, setClosing]);

  if (!mounted) return null;

  return createPortal(content, document.body);
}

function ModalHeader({ children }: ModalHeaderProps) {
  return <div className={styles.modalHeader}>{children}</div>;
}

function ModalBody({ children }: ModalBodyProps) {
  return <div className={styles.modalBody}>{children}</div>;
}

const Modal = Object.assign(ModalComponent, {
  Header: ModalHeader,
  Body: ModalBody,
}) as typeof ModalComponent & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
};

export { ModalHeader, ModalBody };
export default Modal;
