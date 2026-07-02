"use client";

import { createContext, useEffect, useRef, useState, useCallback } from "react";
import styles from "./Modal.module.scss";
import CloseIcon from "@/components/icons/CloseIcon";

interface ModalContextType {
  onClose: () => void;
  closing: boolean;
  setClosing: React.Dispatch<React.SetStateAction<boolean>>;
  startClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

interface ModalHeaderProps {
  children: React.ReactNode;
}

interface ModalBodyProps {
  children: React.ReactNode;
}

function ModalComponent({ children, onClose }: ModalProps) {
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  // Cleanup on unmount to prevent errors during navigation
  useEffect(() => {
    return () => {
      setClosing(false);
    };
  }, []);

  return (
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
  );
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
