import React from 'react'
import { setDatastore } from '../store/actions.js'
import { store } from '../store/index.js'

export class Datastores extends React.Component {
  render() {
    return (
      <div>
        <h2>Datastore List</h2>
          <ul>
          {this.props.datastores.map(ds =>
            <li key={ds.uid}
              onClick={()=> {
                store.dispatch(setDatastore(ds.uid))
              }}
              className={ ds.active ? 'active' : '' }>
              {ds.name}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
