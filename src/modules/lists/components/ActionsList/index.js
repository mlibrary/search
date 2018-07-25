import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Icon
} from '../../../core'
import EmailAction from '../EmailAction'
import TextAction from '../TextAction'
import FileAction from '../FileAction'
import FavoriteAction from '../FavoriteAction'
import { Login } from '../../../profile'
import { Button } from '../../../reusable'

class ActionsList extends Component {
  state = {
    actions: [
      {
        uid: 'email',
        action: 'email',
        name: 'Email',
        icon: 'email'
      },
      {
        uid: 'text',
        action: 'text',
        name: 'Text',
        icon: 'text-message'
      },
      {
        uid: 'refworks',
        action: 'file',
        name: 'RefWorks',
        icon: 'file'
      },
      {
        uid: 'zotero',
        action: 'file',
        name: 'Zotero',
        icon: 'zotero'
      },
      {
        uid: 'endnote',
        action: 'file',
        name: 'Endnote',
        icon: 'endnote'
      },
      {
        uid: 'ris',
        action: 'file',
        name: 'Export RIS',
        icon: 'export-ris'
      },
      {
        uid: 'favorite',
        action: 'favorite',
        name: 'Favorite',
        icon: 'star'
      }
    ]
  }

  handleClick = (type) => {
    const {
      active,
      setActive
    } = this.props
    // Set the active Action to what was just clicked.
    // If it is already active, then deselect it making
    // no action active.
    if (active === type) {
      setActive(undefined)
    } else {
      setActive(type)
    }
  }

  renderActionDetails = (login) => {
    const {
      active
    } = this.props

    if (!active) {
      return null
    }

    switch (active.action) {
      case 'email':
      case 'text':
      case 'favorite':
        if (login.authenticated) {
          return (
            <React.Fragment>
              {active.action === 'email' && (<EmailAction action={active} {...this.props} />)}
              {active.action === 'text' && (<TextAction action={active} {...this.props} />)}
              {active.action === 'favorite' && (<FavoriteAction action={active}  {...this.props} />)}
            </React.Fragment>
          )
        } else {
          return (
            <Button href={login.href} className="u-margin-top-1"><b>Log in</b> to continue</Button>
          )
        }
      case 'file':
        return (
          <React.Fragment>
            {active.action === 'file' && (<FileAction action={active}  {...this.props} />)}
          </React.Fragment>
        )
      default:
        return null
    }
  }

  render() {
    const {
      active
    } = this.props

    const activeUid = active ? active.uid : null

    return (
      <React.Fragment>
        <ul className="lists-actions-list">
          {this.state.actions.map(action => {
            const isActive = action.uid === activeUid
            const activeClassName = isActive ? 'lists-action-button--active' : ''
            return (
              <li key={action.uid}>
                <button className={`button-link lists-action-button ${activeClassName}`} onClick={() => this.handleClick(action)} aria-pressed={isActive}><Icon name={action.icon} />{action.name}</button>
              </li>
            )
          })}
        </ul>
        <Login render={login => (
          <React.Fragment>{this.renderActionDetails(login)}</React.Fragment>
        )} />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(ActionsList);
