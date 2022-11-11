/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '../../../reusable';

export default function SearchButton ({ advanced, styles }) {
  return (
    <Button
      css={{
        alignItems: 'center',
        display: 'flex',
        gap: '0.25rem',
        minWidth: '44px',
        padding: '0.5rem 0.75rem',
        ...styles
      }}
      type='submit'
    >
      <Icon icon='search' size={24} />
      <span
        css={!advanced && {
          border: '0px',
          clip: 'rect(0px, 0px, 0px, 0px)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          overflowWrap: 'normal',
          padding: '0px',
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px'
        }}
      >
        {advanced && 'Advanced '}Search
      </span>
    </Button>
  );
}

SearchButton.propTypes = {
  advanced: PropTypes.bool,
  styles: PropTypes.object
};
