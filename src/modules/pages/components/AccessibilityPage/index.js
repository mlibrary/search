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
        <H1>Library Search Accessibility Statement</H1>
        <p>The University of Michigan Library is dedicated to creating inclusive services and products for all users. See more about our approach to <Anchor href='https://www.lib.umich.edu/about-us/about-library/accessibility/digital-product-accessibility'>digital product accessibility</Anchor>, as well as our overall <Anchor href='https://lib.umich.edu/about-us/about-library/accessibility'>accessibility services and practices</Anchor> at the U-M Library.</p>
        <h2>Standards and compliance</h2>
        <p>Our baseline accessibility target is to meet <Anchor href='https://www.w3.org/TR/WCAG21/'>WCAG 2.1 AA standards</Anchor>. The last accessibility evaluation for Library Search was in March 2023.</p>
        <p>The next scheduled accessibility evaluation for this product is in 2026.</p>
        <h2>Feedback and support</h2>
        <p>We welcome your feedback and will do our best to resolve any issues promptly.</p>
        <p>If you encounter any accessibility issues while using this product or have questions, please contact us <Anchor href='https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf'>via our feedback form</Anchor>.</p>
      </main>
    </div>
  );
};

export default AccessibilityPage;
