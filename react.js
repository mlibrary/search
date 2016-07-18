/*
*  REACT
*/

class SearchApp extends React.Component {
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

const render = () => {
  ReactDOM.render(
    <SearchApp
      datastores = {store.getState().datastores}
    />,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
