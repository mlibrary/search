import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Icon } from '../../../core'
import {
  isInList
} from '../../../lists'
import {
  setA11yMessage
} from '../../../a11y'

import prejudice from '../../prejudice'

class AddToListButton extends Component {
  state = {
    waitingToBeAddedToList: false
  }

  componentDidUpdate() {
    const { list, item } = this.props
    const inList = isInList(list, item.uid)

    if (inList && this.state.waitingToBeAddedToList) {
      this.setState({ waitingToBeAddedToList: false })
    }
  }

  handleClick = (inList, item) => {
    if (!this.state.waitingToBeAddedToList) {
      if (inList) {
        prejudice.removeRecord(item)
      } else {
        this.setState({ waitingToBeAddedToList: true })
        prejudice.addRecord(item)
      }
    }
  }

  renderButtonContent = (inList) => {
    if (inList) {
      return (
        <React.Fragment>
          <Icon name="window-close" /><span>Remove from list</span>
        </React.Fragment>
      )
    } else if (this.state.waitingToBeAddedToList) {
      return (
        <React.Fragment>
          <span>Adding...</span>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Icon name="plus" /><span>Add to list</span>
        </React.Fragment>
      )
    }
  }

  render() {
    const { list, item } = this.props
    const inList = isInList(list, item.uid)

    return (
      <button
        className="button-link"
        onClick={() => this.handleClick(inList, item)}
      >{this.renderButtonContent(inList)}</button>
    )
  }
}

function mapStateToProps(state) {
  return {
    datastoreUid: state.datastores.active,
    list: state.lists[state.datastores.active],
  };
}

export default connect(mapStateToProps, { setA11yMessage })(AddToListButton)
