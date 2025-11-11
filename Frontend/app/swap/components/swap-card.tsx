"use client";

import { ReactNode } from "react";

interface SwapCardProps {
  children: ReactNode;
  className?: string;
}

export function SwapCard({ children, className = "" }: SwapCardProps) {
  return (
    <div
      className={`max-w-md mx-auto relative ${className}`}
      style={{ zIndex: 1 }}
    >
      {children}
    </div>
  );
}
