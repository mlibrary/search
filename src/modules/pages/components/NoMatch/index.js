import React from 'react';

const NoMatch = function NoMatch() {
  document.title = '404 · Library Search'
  return (
    <div className="container">
      <p>Page not found.</p>
    </div>
  );
};

export default NoMatch;
