/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Dialog ({ closeOnOutsideClick, onRequestClose, open, ...props }) {
  const dialogRef = useRef(null);
  const lastActiveElement = useRef(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (!dialogNode.hasAttribute('open') && open) {
      lastActiveElement.current = document.activeElement;
      dialogNode.showModal();
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      dialogNode.close();
      lastActiveElement?.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = (event) => {
      event.preventDefault();
      onRequestClose();
    };
    dialogNode.addEventListener('cancel', handleCancel);
    return () => {
      dialogNode.removeEventListener('cancel', handleCancel);
      document.querySelector('body').style.overflow = 'auto';
    };
  }, [onRequestClose]);

  function handleOutsideClick (event) {
    const dialogNode = dialogRef.current;
    if (closeOnOutsideClick && event.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      css={{
        border: '0',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        width: '100%',
        padding: '0',
        '@media only screen and (min-width: 640px)': {
          borderRadius: '4px',
          boxShadow: `
            0 0 0 1px rgba(16, 22, 26, 0.1),
            0 4px 8px rgba(16, 22, 26, 0.2),
            0 18px 46px 6px rgba(16, 22, 26, 0.2)
          `,
          height: 'max-content',
          marginTop: '200px',
          maxHeight: 'calc(100vh - 400px)',
          maxWidth: '42.5rem'
        },
        '::backdrop': {
          background: 'rgba(16, 22, 26, 0.7);'
        }
      }}
      onClick={(event) => {
        return handleOutsideClick(event);
      }}
    >
      <div
        css={{
          height: '100%',
          width: '100%',
          padding: '1rem',
          '@media only screen and (min-width: 640px)': {
            height: 'auto',
            padding: '2rem'
          }
        }}
        {...props}
      />
    </dialog>
  );
}

Dialog.propTypes = {
  closeOnOutsideClick: PropTypes.bool,
  onRequestClose: PropTypes.func,
  open: PropTypes.bool
};
