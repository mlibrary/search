class DatastoreNavigationItem extends React.Component {
  render() {
    return (
      <li
        className={ isActive ? 'active' : '' }>
        {name}
      </li>
    )
  }
}
