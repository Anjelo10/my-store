// components/NoSSRWrapper.tsx
import { useEffect, useState, ReactNode } from "react";

interface NoSSRWrapperProps {
  children: ReactNode;
}

const NoSSRWrapper = ({ children }: NoSSRWrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Atau skeleton yang sama
  }

  return <>{children}</>;
};

export default NoSSRWrapper;
