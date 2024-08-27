import { Anchor, H1 } from '../../../reusable';
import React, { useEffect } from 'react';
import { setDocumentTitle } from '../../../a11y';

const NoMatch = () => {
  useEffect(() => {
    setDocumentTitle(['404']);
  }, []);

  return (
    <div className='container container-narrow'>
      <main className='page-not-found-container'>
        <H1 className='heading-xlarge'>Page not found - 404</H1>
        <p className='font-lede'>We can&apos;t find the page you&apos;re looking for.</p>
        <h2 className='heading-medium'>Try these options instead</h2>
        <ul className='margin-left-2 feedback-form-fieldset'>
          <li>
            Start over from <Anchor to='/everything'>the homepage</Anchor>.
          </li>
          <li className='u-margin-top-1'>
            The link to the resource you&apos;re looking for may have changed, please search for the title or related keyword to check for current access.
          </li>
          <li className='u-margin-top-1'>
            <Anchor to='/databases/browse'>Browse all Databases</Anchor> or <Anchor to='/onlinejournals/browse'>Browse all Online Journals</Anchor> to view comprehensive lists of current library resources.
          </li>
          <li className='u-margin-top-1'>
            <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a librarian</Anchor> and we&apos;ll help you find what you&apos;re looking for!
          </li>
        </ul>
      </main>
    </div>
  );
};

export default NoMatch;
