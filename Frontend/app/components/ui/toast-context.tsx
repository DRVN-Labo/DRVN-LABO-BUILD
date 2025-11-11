"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastContainer } from "./toast";

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  removeToastByType: (type: Toast["type"], contractName: string) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      // Auto-remove success and error toasts after 3 seconds
      if (toast.type === "success" || toast.type === "error") {
        setTimeout(() => {
          removeToast(id);
        }, 3000);
      }
    },
    [removeToast],
  );

  // Function to remove toasts by type and contract name
  const removeToastByType = useCallback(
    (type: Toast["type"], contractName: string) => {
      setToasts((prev) =>
        prev.filter(
          (toast) =>
            !(toast.type === type && toast.contractName === contractName),
        ),
      );
    },
    [],
  );

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast, removeToastByType, toasts }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
