/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";
import config from "../../../../config";
import { ChooseAffiliation } from "../../../affiliation";
import { MEDIA_QUERIES } from "../../../reusable/umich-lib-core-temp";
import { Modal } from "../../../reusable";

function SearchHeader(props) {
  const [open, setOpen] = React.useState(false);
  const loginRoot = config.loginUrl;
  const loginUrl =
    loginRoot +
    "?dest=" +
    encodeURIComponent(document.location.pathname + document.location.search);
  const logoutUrl =
    "https://weblogin.umich.edu/cgi-bin/logout?" + document.location;
  const loginText = props.isAuthenticated ? "Log out" : "Log in";
  const loginHref = props.isAuthenticated ? logoutUrl : loginUrl;
  let navItems = [
    { text: "Account", href: "https://account.lib.umich.edu/" },
    {
      text: "My Favorites",
      href: "https://apps.lib.umich.edu/my-account/favorites",
    },
    { text: loginText, href: loginHref },
  ];

  if (props.favoritesDisabled) {
    navItems = [
      { text: "Account", href: "https://apps.lib.umich.edu/my-account" },
      { text: loginText, href: loginHref },
    ];
  }

  return (
    <m-website-header name="Search" variant="dark" to="/everything">
      <nav aria-label="utility" css={{
        gridTemplateColumns: 'repeat(4, auto)',
        alignItems: 'baseline',
        display: 'block',
        '& > *': {
          display: 'inline-block',
          marginTop: '1rem'
        },
        '& > *:not(:last-child)': {
          marginRight: '1rem',
          marginBottom: '0.5rem'
        },
        [MEDIA_QUERIES.LARGESCREEN]: {
          '& > *': {
            margin: '0'
          },
          '& > *:not(:last-child)': {
            marginBottom: '0'
          }
        }
      }}>
        {navItems.map(n => (
          <a
            href={n.href}
            css={{ color: 'white', '&:hover': { textDecoration: 'underline' } }}
            data-ga-action="Click"
            data-ga-category="Header"
            data-ga-label={n.text}
          >
            {n.text}
          </a>
        ))}
        <ChooseAffiliation />
      </nav>
    </m-website-header>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.profile.status === "Logged in",
    datastore: state.datastores.active,
    search: state.search,
    favoritesDisabled: state.favorites.disabled === true,
  };
}

export default connect(mapStateToProps)(SearchHeader);
