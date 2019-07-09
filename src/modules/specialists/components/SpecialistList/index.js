import React from 'react'
import { connect } from 'react-redux';
import { ShowAllChildren } from '../../../core'
import Specialist from '../Specialist'

import {
  Heading
} from '@umich-lib/core'

const SpecialistList = ({
  loadingUserData,
  show,
  specialists
}) => {
  if (loadingUserData || !specialists || specialists.length === 0) {
    return null
  }

  return (
    <li>
      <Heading level={2} size="L">Talk to a Library Specialist</Heading>

      <ShowAllChildren
        length={specialists.length}
        show={show}
        name={'specialists'}>
        {specialists.map((person, index) => (
          <Specialist key={index} person={person} />
        ))}
      </ShowAllChildren>
    </li>
  )
}

function mapStateToProps(state) {
  return {
    specialists: state.specialists
  };
}

export default connect(mapStateToProps)(SpecialistList)
