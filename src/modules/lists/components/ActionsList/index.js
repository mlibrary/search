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
        name: 'Email',
        icon: 'email'
      },
      {
        uid: 'text',
        name: 'Text',
        icon: 'message'
      },
      {
        uid: 'file',
        name: 'Export RIS',
        icon: 'file'
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

  render() {
    const {
      active
    } = this.props

    return (
      <React.Fragment>
        <ul className="lists-actions-list">
          {this.state.actions.map(action => {
            const isActive = action.uid === active
            const activeClassName = isActive ? 'lists-action-button--active' : ''
            return (
              <li key={action.uid}>
                <button className={`button-link lists-action-button ${activeClassName}`} onClick={() => this.handleClick(action.uid)} aria-pressed={isActive}><Icon name={action.icon} />{action.name}</button>
              </li>
            )
          })}
        </ul>
        {active === 'email' && (<EmailAction {...this.props} />)}
        {active === 'text' && (<TextAction {...this.props} />)}
        {active === 'file' && (<FileAction {...this.props} />)}
      </React.Fragment>
    )
  }
}

export default ActionsList
