import React, { Component } from 'react';
import {
  Icon
} from '../../../core'
import prejudice from '../../prejudice'
import EmailAction from '../EmailAction'


class ActionsList extends Component {
  state = {
    actions: [
      {
        uid: 'email',
        name: 'Email'
      },
      {
        uid: 'text',
        name: 'Text'
      }
    ],
    active: ''
  }

  handleClick = (type) => {
    // Set the active Action to what was just clicked.
    // If it is already active, then deselect it making
    // no action active.
    if (this.state.active === type) {
      this.setState({ active: undefined })
    } else {
      this.setState({ active: type })
    }

    switch (type) {
      case 'email':
        console.log('email')
        break;
      default:
        break;
    }
  }

  render() {
    const {
      list,
      datastore,
      listLength
    } = this.props
    const active = this.state.active
    const plural = list && listLength === 1 ? '' : 's'

    return (
      <React.Fragment>
        <ul className="lists-actions-list">
          {this.state.actions.map(action => {
            const isActive = action.uid === this.state.active
            const activeClassName = isActive ? 'lists-action-button--active' : ''
            return (
              <li key={action.uid}>
                <button className={`button-link lists-action-button ${activeClassName}`} onClick={() => this.handleClick(action.uid)} aria-pressed={isActive}>{action.name}</button>
              </li>
            )
          })}
        </ul>
        {active === 'email' && (<EmailAction />)}
      </React.Fragment>
    )
  }
}

export default ActionsList
