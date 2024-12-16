"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, isOpen }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    children,
    document.body
  );
};

export default Modal; 