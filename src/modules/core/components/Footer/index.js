import React from 'react';
import { Link } from 'react-router-dom'

import Chat from '@umich-lib/chat'

const footer_links = [
  {
    text: 'Home',
    to: '/'
  },
  {
    text: 'Accessibility',
    to: '/accessibility'
  },
  {
    text: 'How to Use Search',
    to: '/how-to-use-search'
  },
  {
    text: 'Get Research Help',
    href: 'https://www.lib.umich.edu/get-research-help'
  }
]

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container container-narrow">
        <ul className="site-footer-nav-list">
          {footer_links.map((item, i) => (
            <li key={i}>
              {item.to ? (
                <Link
                  to={item.to}
                  data-ga-action="Click"
                  data-ga-category="Footer"
                  data-ga-label={item.text}
                >
                  {item.text}
                </Link>
              ) : (
                <a
                  href={item.href}
                  data-ga-action="Click"
                  data-ga-category="Footer"
                  data-ga-label={item.text}
                >
                  {item.text}
                </a>
              )}
            </li>
          ))}
          <li>
            <a
              href="https://ill.lib.umich.edu/"
              data-ga-action="Click"
              data-ga-category="Footer"
              data-ga-label="Make an I.L.L. Request"
            >Make an <abbr title="Interlibrary Loan">I.L.L.</abbr> Request</a>
          </li>
          <li>
            <Chat fixed />
          </li>
        </ul>

        <p>©2018 Regents of the University of Michigan. For details and exceptions, see the <a href="https://www.lib.umich.edu/library-administration/library-copyright-statement">Copyright Policy</a>.</p>
      </div>
    </footer>
  )
}

export default Footer;
