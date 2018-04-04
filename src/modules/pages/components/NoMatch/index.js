import React from 'react';

import {
  Link
} from 'react-router-dom'
import {
  setDocumentTitle
} from '../../../a11y'

const NoMatch = function NoMatch() {
  setDocumentTitle(['404'])

  return (
    <div className="container container-narrow">
      <div className="page-not-found-container">
        <h1>Page not found - 404</h1>
        <p>What you're looking for isn't here.</p>

        <Link to="/" className="button">Go back home</Link>
      </div>
    </div>
  );
};

export default NoMatch;
