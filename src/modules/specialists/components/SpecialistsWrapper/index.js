import React from 'react'
import { connect } from 'react-redux'

import SpecialistList from '../SpecialistList'

// TODO:
// 1. Create high order with specialists component
// 2. Takes children
// 3. Pulls specialists from redux
// 4. Render first X records, inject specialists, render rest of children.
// 5. Account for less than X results.

class SpecialistsWrapper extends React.Component {
  render() {
    const children = this.props.children
    const position = this.props.position || 2
    const show = this.props.show || 3

    return (
      <React.Fragment>
        {React.Children.map(children, (child, i) => (
          <React.Fragment>
            {i === position ? (
              <SpecialistList />
            ) : null}
            {child}
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }
}

export default SpecialistsWrapper
