import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Header.css'

import UMichLibraryLogo from './UMichLibraryLogo'

const NavItem = ({
  item,
  renderAnchor
}) => {
  if (item.href) {
    return (
      <a href={item.href}>{ item.text }</a>
    )
  }

  if (item.to) {
    return (
      renderAnchor(item)
    )
  }
}

const Header = ({
  name,
  baseUrl,
  nav,
  renderAnchor
}) => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="logo">
          <a href="https://www.lib.umich.edu/" className="logo__umich-library-link"><UMichLibraryLogo className="logo__image" /></a><a href="/" className="logo__site-name-link">{name}</a>
        </div>

        {nav.length && (
          <nav className="header__nav">
            <ul className="header__nav-list">
              {nav.map((item, key) => (
                <li key={key} className="header__nav-list-item"><NavItem item={item} renderAnchor={renderAnchor} /></li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  renderAnchor: PropTypes.func
};

Header.defaultProps = {
  baseUrl: '/',
};

export default Header
