import { Anchor, H1 } from '../../../reusable';
import React, { useEffect } from 'react';
import { setDocumentTitle } from '../../../a11y';

const AccessibilityPage = () => {
  useEffect(() => {
    setDocumentTitle(['Accessibility']);
  }, []);

  return (
    <div className='container container-narrow'>
      <main className='container__rounded page'>
        <H1 className='u-margin-top-none'>Accessibility</H1>
        <p>We are dedicated to creating inclusive services and products for all users. We are constantly working to make Library Search as accessible and usable as possible.</p>
        <p>We aim to meet <Anchor href='https://www.w3.org/TR/WCAG21/'>WCAG 2.1 AA standards</Anchor></p>
        <h2>Compatibility with tools</h2>
        <p>Library Search should be compatible with recent version of the following screen readers:</p>
        <ul>
          <li>JAWS</li>
          <li>NVDA</li>
          <li>VoiceOver</li>
        </ul>
        <p>The site should also be compatible with:</p>
        <ul>
          <li>basic operating system screen magnifiers, such as ZoomText magnifier</li>
          <li>speech recognition software</li>
          <li>operating system speech package</li>
        </ul>
        <h2>Provide feedback</h2>
        <p>Are you having trouble using Library Search? <Anchor href='https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf'>Please let us know</Anchor> so that we can make improvements to improve your experience.</p>
      </main>
    </div>
  );
};

export default AccessibilityPage;
