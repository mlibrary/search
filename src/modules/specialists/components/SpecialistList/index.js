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
    <React.Fragment>
      <article className="specialists">
        <div className="specialists__inner-container">
          <header>
            <h2 className="specialists__heading">Talk to a Library Specialist</h2>
          </header>

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
      <h2 className="offpage">Results continued</h2>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    specialists: state.specialists
  };
}

export default connect(mapStateToProps)(SpecialistList)
