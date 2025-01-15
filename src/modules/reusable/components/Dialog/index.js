import './styles.css';
import React, { useEffect, useRef } from 'react';

const Dialog = ({ children, isOpen, onClose }) => {
  const dialogRef = useRef(null);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen && !wasOpen.current) {
      dialogRef.current.showModal();
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKeyPress);
      document.querySelector('body').style.overflow = 'hidden';
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }

    wasOpen.current = isOpen;

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
      document.querySelector('body').style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!children) {
    return null;
  }

  const handleCloseClick = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <dialog ref={dialogRef}>
      <section>
        {children}
      </section>
      <button onClick={handleCloseClick} className='btn btn--small btn--secondary'>
        Dismiss
      </button>
    </dialog>
  );
};

export default Dialog;
