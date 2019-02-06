import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '@umich-lib/icon'
import EmailAction from '../EmailAction'
import TextAction from '../TextAction'
import FileAction from '../FileAction'
import FavoriteAction from '../FavoriteAction'
import CitationAction from '../CitationAction'
import { AuthenticationRequired } from '../../../profile'

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
        icon: 'chat'
      },
      {
        uid: 'citation',
        action: 'citation',
        name: 'Citation',
        icon: 'format_quote'
      },
      {
        uid: 'zotero',
        action: 'file',
        name: 'Zotero',
        icon: 'insert_drive_file'
      },
      {
        uid: 'endnote',
        action: 'file',
        name: 'Endnote',
        icon: 'insert_drive_file'
      },
      {
        uid: 'ris',
        action: 'file',
        name: 'Export RIS',
        icon: 'insert_drive_file'
      },
      {
        uid: 'favorite',
        action: 'favorite',
        name: 'Favorite',
        icon: 'star_border'
      },
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

  renderActionDetails = () => {
    const {
      active
    } = this.props

    if (!active) {
      return null
    }

    return (
      <React.Fragment>
        {active.action === 'email' && (
          <AuthenticationRequired>
            <EmailAction action={active} {...this.props} />
          </AuthenticationRequired>
        )}
        {active.action === 'text' && (
          <AuthenticationRequired>
            <TextAction action={active} {...this.props} />
          </AuthenticationRequired>
        )}
        {active.action === 'favorite' && (
          <AuthenticationRequired>
            <FavoriteAction action={active} {...this.props} />
          </AuthenticationRequired>
        )}
        
        {active.action === 'citation' && (<CitationAction action={active}  {...this.props} />)}
        {active.action === 'file' && (<FileAction action={active}  {...this.props} />)}
      </React.Fragment>
    )
  }

  render() {
    const {
      active,
      favoritesDisabled
    } = this.props

    const activeUid = active ? active.uid : null

    return (
      <React.Fragment>
        <ul className="lists-actions-list">
          {this.state.actions.map(action => {
            if (action.uid === 'favorite' && favoritesDisabled) {
              return null
            }
            const isActive = action.uid === activeUid
            const activeClassName = isActive ? 'lists-action-button--active' : ''
            return (
              <li key={action.uid}>
                <button
                  className={`button-link lists-action-button ${activeClassName}`}
                  onClick={() => this.handleClick(action)}
                  aria-pressed={isActive}
                >
                  <span style={{ opacity: '0.75' }}><Icon size={20} icon={action.icon} /></span>{action.name}
                </button>
              </li>
            )
          })}
        </ul>
        {this.renderActionDetails()}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    favoritesDisabled: state.favorites.disabled === true
  };
}

export default connect(mapStateToProps)(ActionsList);
