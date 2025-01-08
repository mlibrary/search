import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import React from 'react';

const Footer = () => {
  return (
    <>
      <aside className='container container-narrow feedback-container'>
        <Anchor
          href='https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Give feedback about this page - Opens in new window'
        >
          Give feedback about this page
          <Icon
            icon='open_in_new'
            className='margin-left__2xs'
          />
        </Anchor>
      </aside>
      <footer
        className='site-footer'
        role='contentinfo'
      >
        <div className='container container-medium'>
          <ul className='site-footer-nav-list list__unstyled'>
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
    </>
  );
};

export default Footer;
