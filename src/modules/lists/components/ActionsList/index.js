import React, { Component } from 'react';
import {
  Icon
} from '../../../core'
import prejudice from '../../prejudice'


class ActionsList extends Component {
  handleEmailClick = () => {
    const callback = (data) => {
      console.log('handleEmailClick callback', data)
    }

    console.log('prejudice', prejudice)

    prejudice.act('email', 'earleyj@umich.edu', callback)
  }

  render() {
    const {
      list,
      datastore,
      listLength
    } = this.props
    const plural = list && listLength === 1 ? '' : 's'

    return (
      <ul className="lists-actions-list">
        <li><button className="button-link underline lists-action-button" onClick={this.handleEmailClick}>Email</button></li>
        <li><button className="button-link underline lists-action-button">Text</button></li>
        <li><button className="button-link underline lists-action-button">Export RIS</button></li>
      </ul>
    )
  }
}

export default ActionsList
