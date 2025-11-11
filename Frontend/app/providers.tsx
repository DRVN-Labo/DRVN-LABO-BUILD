"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { ToastProvider } from "./components/ui/toast-context";

// Main Provider - Using Coinbase Mini Kit and Toast Provider
export function Providers(props: { children: ReactNode }) {
  return (
    <ToastProvider>
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: "auto",
            theme: "mini-app-theme",
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
            logo: process.env.NEXT_PUBLIC_ICON_URL,
          },
          wallet: {
            display: "modal",
            termsUrl: "",
            privacyUrl: "",
          },
        }}
      >
        {props.children}
      </MiniKitProvider>
    </ToastProvider>
  );
}
