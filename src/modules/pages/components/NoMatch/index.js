/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { setDocumentTitle } from '../../../a11y';

const NoMatch = function NoMatch () {
  setDocumentTitle(['404']);

  return (
    <div className='container container-narrow'>
      <main className='page-not-found-container'>
        <h1 className='heading-xlarge' id='maincontent' tabIndex='-1'>
          Page not found - 404
        </h1>
        <p className='font-lede'>We can't find the page you're looking for.</p>
        <h2 className='heading-medium'>
          Try these options instead
        </h2>
        <ul css={{
          margin: '0',
          padding: '0',
          marginLeft: '1.5rem',
          maxWidth: '32em'
        }}
        >
          <li>
            <p>Start over from <Link to='/everything'>the homepage</Link>.</p>
          </li>
          <li>
            <p>The link to the resource you're looking for may have changed, please
              search for the title or related keyword to check for current access.
            </p>
          </li>
          <li>
            <p>
              <Link to='/databases/browse'>Browse all Databases</Link> or <Link to='/onlinejournals/browse'>Browse all Online Journals</Link> to view comprehensive lists
              of current library resources.
            </p>
          </li>
          <li>
            <p>
              <a href='https://www.lib.umich.edu/ask-librarian'>Ask a librarian</a> and we'll help you find what you're
              looking for!
            </p>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default NoMatch;
