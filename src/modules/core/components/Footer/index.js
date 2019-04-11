import React from 'react';
import { Link } from 'react-router-dom'

import { Chat } from '@umich-lib/core'

const footer_links = [
  {
    text: 'Home',
    href: '/'
  },
  {
    text: 'Accessibility',
    to: '/accessibility'
  },
  {
    text: 'How to use search',
    to: '/how-to-use-search'
  },
  {
    text: 'Get research help',
    href: 'https://www.lib.umich.edu/get-research-help'
  },
  {
    text: 'Technical overview',
    href: '/technical-overview'
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
