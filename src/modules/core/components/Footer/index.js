import React from 'react';
import { Anchor } from '../../../reusable';

function Footer () {
  return (
    <footer
      className='site-footer'
      role='contentinfo'
    >
      <div className='container container-medium'>
        <ul className='site-footer-nav-list'>
          <li>
            <Anchor to='/everything'>
              Home
            </Anchor>
          </li>
          <li>
            <Anchor to='/accessibility'>
              Accessibility
            </Anchor>
          </li>
          <li>
            <Anchor href='https://guides.lib.umich.edu/c.php?g=914690'>
              Tips for Using Library Search
            </Anchor>
          </li>
          <li>
            <Anchor href='https://lib.umich.edu/research-and-scholarship/help-research/how-we-can-help'>
              Get research help
            </Anchor>
          </li>
          <li>
            <Anchor to='/about-library-search'>
              About Library Search
            </Anchor>
          </li>
          <li>
            <Anchor href='https://ill.lib.umich.edu/'>
              Make an <abbr title='Interlibrary Loan'>I.L.L.</abbr> Request
            </Anchor>
          </li>
        </ul>

        <p>
          &copy;{(new Date().getFullYear())} Regents of the University of Michigan. For details and exceptions, see the <Anchor href='https://lib.umich.edu/about-us/policies/copyright-policy'>Copyright Policy</Anchor>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
