"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed top-0 left-0 bg-black/60 flex justify-center items-center w-screen h-screen z-50 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black p-6 rounded-lg relative w-full max-w-5xl ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-red-600"
        >
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
