import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailAction from '../EmailAction'
import TextAction from '../TextAction'
import FileAction from '../FileAction'
import FavoriteAction from '../FavoriteAction'
import PermalinkAction from '../PermalinkAction'
import CitationAction from '../CitationAction'
import { AuthenticationRequired } from '../../../profile'
import { ContextProvider } from '../../../reusable'
import { Alert, Icon } from '@umich-lib/core'
import ReactGA from 'react-ga'

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
        uid: 'endnote',
        action: 'file',
        name: 'Export Citation (EndNote)',
        icon: 'insert_drive_file'
      },
      {
        uid: 'ris',
        action: 'file',
        name: 'Export Citation (RIS)',
        icon: 'insert_drive_file'
      },
      {
        uid: 'favorite',
        action: 'favorite',
        name: 'Favorite',
        icon: 'star_border'
      },
      {
        uid: 'permalink',
        action: 'permalink',
        name: 'Copy link',
        icon_d: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'
      }
    ],
    alert: null
  }

  setAlert = ({ intent, text }) => {
    this.setState({
      alert: { intent, text }
    })
  }

  handleClick = (type, view) => {
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

    // also reset Alert
    this.setState({ alert: null })
  }

  handleUse = (action, view) => {
    ReactGA.event({
      action: 'Click',
      category: 'Actions',
      label: `Use ${action} from ${view}`
    })
  }

  renderActionDetails = () => {
    const {
      active
    } = this.props

    if (!active) {
      return null
    }

    return (
      <ContextProvider render={data => (
        <React.Fragment>
          {active.action === 'email' && (
            <AuthenticationRequired>
              <EmailAction
                action={active}
                onUsed={() => this.handleUse(active.uid, data.viewType)}
                {...this.props}
              />
            </AuthenticationRequired>
          )}
          {active.action === 'text' && (
            <AuthenticationRequired>
              <TextAction
                action={active}
                onUsed={() => this.handleUse(active.uid, data.viewType)}
                {...this.props}
              />
            </AuthenticationRequired>
          )}
          {active.action === 'favorite' && (
            <AuthenticationRequired>
              <FavoriteAction
                action={active}
                onUsed={() => this.handleUse(active.uid, data.viewType)}
                {...this.props}
              />
            </AuthenticationRequired>
          )}
          {active.action === 'permalink' && (
            <PermalinkAction
              action={active}
              onUsed={() => this.handleUse(active.uid, data.viewType)}
              setAlert={this.setAlert}
              {...this.props}
            />
          )}
          
          {active.action === 'citation' && (
            <CitationAction
              {...data}
              action={active}
              onUsed={() => this.handleUse(active.uid, data.viewType)}
              setAlert={this.setAlert}
              {...this.props}
            />
          )}
          {active.action === 'file' && (
            <FileAction
              action={active}
              onUsed={() => this.handleUse(active.uid, data.viewType)}
              {...this.props}
            />
          )}
        </React.Fragment>
        )}>
      </ContextProvider>
    )
  }

  render() {
    const {
      active,
      favoritesDisabled
    } = this.props

    const activeUid = active ? active.uid : null

    return (
      <ContextProvider render={data => (
        <div className="y-spacing">
          <ul className="lists-actions-list">
            {this.state.actions.map(action => {
              if (action.uid === 'favorite' && favoritesDisabled) {
                return null
              }
              if (action.uid === 'permalink' && data.viewType !== 'Full') {
                return null
              }

              const isActive = action.uid === activeUid
              const activeClassName = isActive ? 'lists-action-button--active' : ''

              return (
                <li key={action.uid}>
                  <button
                    className={`button-link lists-action-button ${activeClassName}`}
                    onClick={() => this.handleClick(action, data.viewType)}
                    aria-pressed={isActive}
                  >
                    <span style={{ opacity: '0.75' }}>
                      {action.icon_d ?
                        <Icon size={20} d={action.icon_d} /> :
                        <Icon size={20} icon={action.icon} />
                      }
                    </span>{action.name}
                  </button>
                </li>
              )
            })}
          </ul>
          {this.renderActionDetails()}
          {this.state.alert && (
            <Alert intent={this.state.alert.intent}>{this.state.alert.text}</Alert>
          )}
        </div>
      )}>
      </ContextProvider>
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
