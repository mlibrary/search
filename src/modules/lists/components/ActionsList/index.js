import React, { Component } from 'react';
import {
  Icon
} from '../../../core'
import EmailAction from '../EmailAction'
import TextAction from '../TextAction'
import FileAction from '../FileAction'


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
        uid: 'file',
        action: 'file',
        name: 'Export RIS',
        icon: 'export-ris'
      },
      {
        uid: 'endnote',
        action: 'file',
        name: 'Endnote',
        icon: 'endnote'
      },
      {
        uid: 'procite',
        action: 'file',
        name: 'Procite',
        icon: 'procite'
      },
      {
        uid: 'zotero',
        action: 'file',
        name: 'Zotero',
        icon: 'zotero'
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

  renderActionDetails = () => {
    const {
      active
    } = this.props

    if (!active) {
      return null
    }

    return (
      <React.Fragment>
        {active.action === 'email' && (<EmailAction {...this.props} />)}
        {active.action === 'text' && (<TextAction {...this.props} />)}
        {active.action === 'file' && (<FileAction {...this.props} />)}
      </React.Fragment>
    )
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
        {this.renderActionDetails()}
      </React.Fragment>
    )
  }
}

export default ActionsList
