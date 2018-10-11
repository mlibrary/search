import React from 'react';
import { Link } from 'react-router-dom'

import {
  AskALibrarian
} from '../../../core'

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container container-narrow">
        <ul className="site-footer-nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/accessibility">Accessibility</Link>
          </li>
          <li>
            <Link to="/how-to-use-search">How to Use Search</Link>
          </li>
          <li>
            <a href="https://www.lib.umich.edu/get-research-help">Get Research Help</a>
          </li>
          <li>
            <a href="https://ill.lib.umich.edu/">Make an <abbr title="Interlibrary Loan">I.L.L.</abbr> Request</a>
          </li>
          <li>
            <AskALibrarian />
          </li>
        </ul>

        <p>©2018 Regents of the University of Michigan. For details and exceptions, see the <a href="https://www.lib.umich.edu/library-administration/library-copyright-statement">Copyright Policy</a>.</p>
      </div>
    </footer>
  )
}

export default Footer;
