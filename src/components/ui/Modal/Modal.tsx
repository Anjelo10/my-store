"use client";

import { Dispatch, useEffect, useRef } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  const ref: any = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="flex fixed top-0 w-full h-full z-[1000] bg-black/50 items-center justify-center">
      <div
        className=" bg-white p-5 w-[50%] max-h-[80vh] overflow-y-auto"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
