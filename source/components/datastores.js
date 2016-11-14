import React from 'react'
import { changeActiveDatastore } from '../store/actions.js'
import { store } from '../store/index.js'

export class Datastores extends React.Component {
  render() {
    return (
      <div className="datastore-list-container">
        <div className="container-narrow container">
          <ul className="datastore-list">
            {this.props.state.datastores.map(ds =>
              <li key={ds.uid}
                onClick={() => {
                  store.dispatch(changeActiveDatastore(ds.uid))
                }}
                className={ this.props.state.active_datastore == ds.uid ? 'active' : '' }>
                {ds.name}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
