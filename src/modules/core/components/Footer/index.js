import React from 'react';

import {
  AskALibrarian
} from '../../../core'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container container-narrow">
        <AskALibrarian />

        <p>©2017 Regents of the University of Michigan. For details and exceptions, see the <a href="https://www.lib.umich.edu/library-administration/library-copyright-statement">Copyright Policy</a>.</p>
      </div>
    </footer>
  )
}

export default Footer;
