import React, { Component } from 'react';
import { connect } from 'react-redux'
import { _ } from 'underscore';
import ReactGA from 'react-ga'
import {
  Checkbox
} from '../../../core'
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
        ReactGA.event({
          action: 'Click',
          category: 'Select',
          label: 'List Remove'
        })
        prejudice.removeRecord(item)
      } else {
        this.setState({ waitingToBeAddedToList: true })
        ReactGA.event({
          action: 'Click',
          category: 'Select',
          label: 'List Add'
        })
        prejudice.addRecord(item)
      }
    }
  }

  render() {
    const {
      list,
      item,
      datastore
    } = this.props
    const inList = isInList(list, item.uid)

    return (
      <div className="add-to-list-checkbox-container">
        <Checkbox
          handleClick={() => this.handleClick(inList, item)}
          isChecked={inList}
          label={`Add to my temporary ${datastore.name} list`}
          hideLabel
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    list: state.lists[state.datastores.active],
  };
}

export default connect(mapStateToProps, { setA11yMessage })(AddToListButton)
