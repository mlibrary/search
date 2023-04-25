import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    text: 'Home',
    to: '/everything'
  },
  {
    text: 'Accessibility',
    to: '/accessibility'
  },
  {
    text: 'Tips for Using Library Search',
    href: 'https://guides.lib.umich.edu/c.php?g=914690'
  },
  {
    text: 'Get research help',
    href:
      'https://lib.umich.edu/research-and-scholarship/help-research/how-we-can-help'
  },
  {
    text: 'About Library Search',
    to: '/about-library-search'
  },
  {
    text: 'Make an <abbr title="Interlibrary Loan">I.L.L.</abbr> Request',
    href:
      'https://ill.lib.umich.edu/'
  }
];

const Footer = () => {
  return (
    <footer
      className='site-footer'
      role='contentinfo'
      style={{ textAlign: 'center' }}
    >
      <div className='container container-medium'>
        <ul className='site-footer-nav-list'>
          {footerLinks.map((item, i) => {
            return (
              <li key={i}>
                {item.to
                  ? (
                    <Link to={item.to} dangerouslySetInnerHTML={{ __html: item.text }} />
                    )
                  : (
                    <a href={item.href} dangerouslySetInnerHTML={{ __html: item.text }} />
                    )}
              </li>
            );
          })}
        </ul>

        <p>
          &copy;{(new Date().getFullYear())} Regents of the University of Michigan. For details and exceptions, see the <a href='https://lib.umich.edu/about-us/policies/copyright-policy'>Copyright Policy</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
