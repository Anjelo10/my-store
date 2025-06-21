"use client";

import { SessionProvider } from "next-auth/react";
import { ToasterProvider } from "@/components/common/ToasterWrapper";
import NoSSRWrapper from "@/utils/clientOnly";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NoSSRWrapper>
      <ToasterProvider>
        <SessionProvider>{children}</SessionProvider>
      </ToasterProvider>
    </NoSSRWrapper>
  );
}
