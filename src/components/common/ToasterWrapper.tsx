// components/common/ToasterContext.tsx
"use client";
import { createContext, useContext, useState } from "react";
import Toaster from "../ui/Toaster";

type Toast = {
  show: boolean;
  message: string;
  variant: "success" | "error" | "warning";
};

type ToasterContextType = {
  showToast: (message: string, variant?: Toast["variant"]) => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<Toast>({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = (
    message: string,
    variant: Toast["variant"] = "success"
  ) => {
    setToast({ show: true, message, variant });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <Toaster variant={toast.variant} message={toast.message} />
      )}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};
