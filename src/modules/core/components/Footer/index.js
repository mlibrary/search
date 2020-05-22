import React from "react";
import { Link } from "react-router-dom";

import { Chat } from "@umich-lib/core";

const footer_links = [
  {
    text: "Home",
    to: "/everything",
  },
  {
    text: "Accessibility",
    to: "/accessibility",
  },
  {
    text: "Tips for Using Library Search",
    href: "https://guides.lib.umich.edu/c.php?g=914690",
  },
  {
    text: "Get research help",
    href: "https://www.lib.umich.edu/get-research-help",
  },
  {
    text: "Technical overview",
    to: "/technical-overview",
  },
];

const Footer = () => {
  return (
    <footer
      className="site-footer"
      role="contentinfo"
      style={{ textAlign: "center" }}
    >
      <div className="container container-medium">
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
            >
              Make an <abbr title="Interlibrary Loan">I.L.L.</abbr> Request
            </a>
          </li>
        </ul>

        <p>
          ©2018 Regents of the University of Michigan. For details and
          exceptions, see the{" "}
          <a href="https://www.lib.umich.edu/library-administration/library-copyright-statement">
            Copyright Policy
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
