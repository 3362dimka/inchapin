import React from "react";

export interface ModalContextType {
  onClose: () => void;
  closing: boolean;
  setClosing: React.Dispatch<React.SetStateAction<boolean>>;
  startClose: () => void;
}

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
}

export interface ModalBodyProps {
  children: React.ReactNode;
}
