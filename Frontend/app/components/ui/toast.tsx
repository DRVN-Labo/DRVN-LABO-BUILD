"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  type: "approve" | "minting" | "success" | "error";
  title: string;
  message: string;
  contractName: string;
  quantity?: number;
  hash?: string;
}

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export function ToastNotification({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case "approve":
      case "minting":
        return <Loader2 className="w-5 h-5 animate-spin text-green-400" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case "approve":
      case "minting":
        return "bg-black";
      case "success":
        return "bg-black";
      case "error":
        return "bg-black";
      default:
        return "bg-black";
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl min-w-[320px] max-w-md",
          getBackgroundColor(),
          "border border-gray-800",
        )}
      >
        {getIcon()}

        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm mb-1">
            {toast.title}
          </div>
          <div className="text-gray-300 text-xs">{toast.message}</div>
          {toast.hash && (
            <div className="text-green-400 text-xs mt-1 font-mono">
              {toast.hash.slice(0, 6)}...{toast.hash.slice(-4)}
            </div>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div className="space-y-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastNotification toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </div>
    </div>
  );
}
