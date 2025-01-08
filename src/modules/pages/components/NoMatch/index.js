import { Anchor, H1 } from '../../../reusable';
import React, { useEffect } from 'react';
import { setDocumentTitle } from '../../../a11y';

const NoMatch = () => {
  useEffect(() => {
    setDocumentTitle(['404']);
  }, []);

  return (
    <main className='container container-narrow padding-top__m'>
      <H1>Page not found - 404</H1>
      <p className='font-lede'>We can&apos;t find the page you&apos;re looking for.</p>
      <h2>Try these options instead</h2>
      <ul>
        <li>
          Start over from <Anchor to='/everything'>the homepage</Anchor>.
        </li>
        <li>
          The link to the resource you&apos;re looking for may have changed, please search for the title or related keyword to check for current access.
        </li>
        <li>
          <Anchor to='/databases/browse'>Browse all Databases</Anchor> or <Anchor to='/onlinejournals/browse'>Browse all Online Journals</Anchor> to view comprehensive lists of current library resources.
        </li>
        <li>
          <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a librarian</Anchor> and we&apos;ll help you find what you&apos;re looking for!
        </li>
      </ul>
    </main>
  );
};

export default NoMatch;
