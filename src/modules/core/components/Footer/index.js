/** @jsx jsx */
import { jsx } from '@emotion/core'

import {
  Margins,
  Chat,
  COLORS,
  SPACING
} from '@umich-lib/core'

import { Link } from '../../../core'

const footer_links = [
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
    to: 'https://guides.lib.umich.edu/c.php?g=914690'
  },
  {
    text: 'Get research help',
    to: 'https://www.lib.umich.edu/get-research-help'
  },
  {
    text: 'Technical overview',
    to: '/technical-overview'
  }
]

const Footer = () => {
  return (
    <footer css={{
      background: COLORS.teal['400'],
      paddingTop: SPACING['XL'],
      paddingBottom: SPACING['XL'],
      minHeight: '14rem'
    }}>
      <Margins>
        <nav aria-label="footer links">
          <ul className="site-footer-nav-list">
            {footer_links.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.to}
                  data-ga-action="Click"
                  data-ga-category="Footer"
                  data-ga-label={item.text}
                  kind="light"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="https://ill.lib.umich.edu/"
                data-ga-action="Click"
                data-ga-category="Footer"
                data-ga-label="Make an I.L.L. Request"
                kind="light"
              >Make an <abbr title="Interlibrary Loan">I.L.L.</abbr> Request</Link>
            </li>
            <li>
              <Chat fixed />
            </li>
          </ul>
        </nav>

        <p css={{ color: 'white' }}>©2018 Regents of the University of Michigan. For details and exceptions, see the <a href="https://www.lib.umich.edu/library-administration/library-copyright-statement">Copyright Policy</a>.</p>

      </Margins>
    </footer>
  )
}

export default Footer;
