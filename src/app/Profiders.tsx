"use client";

import { SessionProvider } from "next-auth/react";
import { ToasterProvider } from "@/components/common/ToasterWrapper";
import ClientOnly from "@/utils/clientOnly";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <ToasterProvider>
        <SessionProvider>{children}</SessionProvider>
      </ToasterProvider>
    </ClientOnly>
  );
}
