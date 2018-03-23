import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Icon } from '../../../core'
import {
  addToList,
  removeFromList
} from '../../actions'
import {
  isInList
} from '../../../lists'
import {
  setA11yMessage
} from '../../../a11y'

class AddToListButton extends Component {
  handleClick = (inList, item) => {
    const payload = {
      datastoreUid: this.props.datastoreUid,
      item
    }

    if (inList) {
      this.props.removeFromList(payload)
      this.props.setA11yMessage('Record removed.')
    } else {
      this.props.addToList(payload)
      this.props.setA11yMessage('Record added.')
    }
  }

  renderButtonContent = (inList) => {
    if (inList) {
      return (
        <React.Fragment>
          <Icon name="window-close" /><span>Remove from list</span>
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
    return null // temp to disable
    
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToList,
    removeFromList,
    setA11yMessage,
  }, dispatch)
}

function mapStateToProps(state) {
  return {
    datastoreUid: state.datastores.active,
    list: state.lists[state.datastores.active],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToListButton)