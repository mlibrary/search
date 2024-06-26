import './styles.css';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
      <div className='dialog-container'>
        <section>
          {children}
        </section>
        <button onClick={handleCloseClick} className='btn btn--small btn--secondary'>
          Dismiss
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};
