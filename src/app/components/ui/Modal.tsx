"use client";

import type React from "react";
import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <>
      {/* Portal-like behavior with fixed positioning */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal container */}
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          {/* Modal panel */}
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} sm:p-6`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3
                id="modal-title"
                className="text-lg font-semibold leading-6 text-gray-900">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Close modal">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
