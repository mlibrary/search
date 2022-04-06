/** @jsxImportSource @emotion/react */
import { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'underscore';
import {
  Checkbox
} from '../../../core'
import {
  isInList
} from '../../../lists'
import {
  setA11yMessage
} from '../../../a11y'

import {
  COLORS
} from '../../../reusable/umich-lib-core-temp'
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

  render() {
    const {
      list,
      item,
      datastore
    } = this.props
    const inList = isInList(list, item.uid)

    /*
      Re: SEARCH-881
      Do not render checkbox while holdings are loading.
      This is a workaround for a race condition when
      adding records to a list before holdings have loaded.
    */
    if (item.loadingHoldings) {
      return null
    }

    return (
      <div className="add-to-list-checkbox-container" css={{
        color: COLORS.neutral['300']
      }}>
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
