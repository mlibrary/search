import React from 'react'

export class Datastores extends React.Component {
  render() {
    return (
      <div>
        <h2>Datastore List</h2>
          <ul>
          {this.props.datastores.map(ds =>
            <li key={ds.uid}>
              {ds.name}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
