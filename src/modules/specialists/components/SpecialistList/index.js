import React from 'react'
import { connect } from 'react-redux';
import { ShowAllChildren } from '../../../core'
import Specialist from '../Specialist'


const SpecialistList = ({
  show,
  specialists
}) => {
  if (!specialists || specialists.length === 0) {
    return null
  }

  return (
    <article className="specialists">
      <div className="specialists__inner-container">
        <h1 className="specialists__heading">Talk to a Library Specialist</h1>

        <section className="specialists__content">
          <ShowAllChildren
            length={specialists.length}
            show={show}
            name={'specialists'}>
            {specialists.map((person, index) => (
              <Specialist key={index} person={person} />
            ))}
          </ShowAllChildren>
        </section>
      </div>
    </article>
  )
}

function mapStateToProps(state) {
  return {
    specialists: state.specialists
  };
}

export default connect(mapStateToProps)(SpecialistList)
