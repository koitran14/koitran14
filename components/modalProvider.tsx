"use client";
import { useEffect, useState } from "react";
import ContactModal from "./contactModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
        <ContactModal />
    </>
  );
};

export default ModalProvider;
