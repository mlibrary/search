/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';

export default function Dialog (props) {
  return (
    <div
      className='dialog-backdrop'
      css={{
        backgroundColor: 'rgba(16, 22, 26, 0.7)',
        display: 'block',
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
        zIndex: '998'
      }}
      onClick={(event) => {
        if (event.target.classList.contains('dialog-backdrop')) {
          event.target.style.display = 'none';
          event.target.querySelector('dialog').close();
        }
      }}
    >
      <dialog
        open
        css={{
          border: '0',
          height: '100%',
          left: '0',
          margin: '0',
          overflow: 'auto',
          position: 'fixed',
          top: '0',
          width: '100%',
          zIndex: '999',
          '@media only screen and (min-width: 640px)': {
            borderRadius: '4px',
            boxShadow: `
              0 0 0 1px rgba(16, 22, 26, 0.1),
              0 4px 8px rgba(16, 22, 26, 0.2),
              0 18px 46px 6px rgba(16, 22, 26, 0.2)
            `,
            height: 'auto',
            left: '50%',
            maxHeight: 'calc(100vh - 400px)',
            maxWidth: '40rem',
            padding: '2rem',
            top: '200px',
            transform: 'translateX(-50%)'
          }
        }}
      >
        {props.children}
      </dialog>
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
