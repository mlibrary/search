/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";
import config from "../../../../config";
import { ChooseAffiliation } from "../../../affiliation";

class SearchHeader extends React.Component {
  render() {
    const loginRoot = config.loginUrl;
    const loginUrl =
      loginRoot +
      "?dest=" +
      encodeURIComponent(document.location.pathname + document.location.search);
    const logoutUrl =
      "https://weblogin.umich.edu/cgi-bin/logout?" + document.location;
    const loginText = this.props.isAuthenticated ? "Log out" : "Log in";
    const loginHref = this.props.isAuthenticated ? logoutUrl : loginUrl;
    let navItems = [
      { text: "Account", href: "https://account.lib.umich.edu/" },
      {
        text: "Favorites",
        href: "https://apps.lib.umich.edu/my-account/favorites",
      },
      { text: loginText, href: loginHref },
    ];

    if (this.props.favoritesDisabled) {
      navItems = [
        { text: "My Account", href: "https://apps.lib.umich.edu/my-account" },
        { text: loginText, href: loginHref },
      ];
    }

    return (
      <m-website-header name="Search" variant="dark">
        <nav aria-label="utility" css={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(4, auto)',
          alignContent: 'baseline'
        }}>
          {navItems.map(n => <a href={n.href} css={{ color: 'white' }}>{n.text}</a>)}
          <ChooseAffiliation />
        </nav>
      </m-website-header>
    );
  }
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
