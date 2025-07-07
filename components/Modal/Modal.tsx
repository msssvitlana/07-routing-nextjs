'use client';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.css';
import { useEffect, useCallback } from 'react';
type Props = {
  children: React.ReactNode;
  onClose?: () => void; // ✅ додаємо підтримку кастомного закриття
};

const Modal = ({ children, onClose }: Props) => {
  const router = useRouter();

  const close = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [close]);

  return (
    <div className={styles.backdrop} onClick={close}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button onClick={close} className={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

