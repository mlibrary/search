/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button, Icon, Dialog } from '../../../reusable';
import PropTypes from 'prop-types';

export default function CopyLinkAction (props) {
  const permalink = document.location.origin + document.location.pathname;
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => {
    return setDialogOpen((bool) => {
      return !bool;
    });
  };
  const closeDialog = () => {
    return setDialogOpen(false);
  };
  const handleCopied = () => {
    closeDialog();
    props.setAlert({
      intent: 'success',
      text: 'Link copied!'
    });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(permalink);
    handleCopied();
  };

  return (
    <div>
      <Button
        kind='secondary'
        onClick={toggleDialog}
        css={{
          alignItems: 'center',
          border: '0',
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem'
        }}
      >
        <Icon size={20} d='M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z' />
        <span>Copy Link</span>
      </Button>
      <Dialog open={dialogOpen} onRequestClose={closeDialog} closeOnOutsideClick>
        <div
          css={{
            '& > h2': {
              marginTop: '0'
            },
            '& > *:last-child': {
              marginBottom: '0'
            }
          }}
        >
          <h2 className='heading-large'>
            Copy link
          </h2>
          <input
            type='text'
            aria-label='Permalink'
            value={permalink}
            readOnly
            autoComplete='off'
          />
          <div
            css={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem'
            }}
          >
            <Button onClick={handleCopy}>
              Copy link
            </Button>
            <Button
              kind='secondary'
              onClick={closeDialog}
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

CopyLinkAction.propTypes = {
  setAlert: PropTypes.func
};
