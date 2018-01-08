import React from 'react';

import {
  Link
} from 'react-router-dom'

const NoMatch = function NoMatch() {
  document.title = '404 · Library Search'
  return (
    <div className="container container-narrow">
      <div class="margin-top-2">
        <h1>Are you lost?</h1>
        <p>What you're looking for isn't here.</p>

        <Link to="/" className="button">Go back home</Link>
      </div>
    </div>
  );
};

export default NoMatch;
