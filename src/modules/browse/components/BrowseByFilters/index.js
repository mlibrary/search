import React from 'react'
import { withRouter } from 'react-router-dom'
import history from '../../../../history'
import qs from 'qs'

class NestedList extends React.Component {
  render() {
    const {
      handleClick,
      items
    } = this.props
    /*
      loop through the items array and create a new component for each, passing
      the current person (id and name) and it's children (items.children) as props
    */

    let nodes = items.map(function(item, key) {
      return (
        <Node key={key} node={item} children={item.children} handleClick={handleClick} />
      );
    });

    return (
      <ul className="nested-list">
       {nodes}
      </ul>
    );
  }
}

class BrowseFilter extends React.Component {
  render() {
    const { name, value, count } = this.props.filter
    const { handleClick } = this.props

    if (value) {
      return (
        <button
          onClick={() => handleClick(value)}
          className="button-link">
            <span className="browse-button-text">{name}</span>
            <span className="browse-button-count">({count})</span>
        </button>
      )
    }

    return (
      <h3>{name}</h3>
    )
  }
}

class Node extends React.Component {
  render() {
    const {
      children,
      handleClick
    } = this.props
    let childnodes = null;

    // the Node component calls itself if there are React children
    if (this.props.children) {
      childnodes = children.map(function(childnode, key) {

        return (
          <Node
            key={key}
            node={childnode}
            children={childnode.children}
            handleClick={handleClick}
          />
        );
      });
    }

    // return our list element
    // display React children if there are any
    return (
      <li key={this.props.node.name}>
        <BrowseFilter
          filter={this.props.node}
          handleClick={handleClick}
        />
        { childnodes ?
          <ul>{childnodes}</ul>
        : null }
      </li>
    );
  }
}

class BrowseByFilters extends React.Component {
  handleFilterClick(filterUid, value) {
    const {
      match
    } = this.props

    const queryString = qs.stringify({
      filter: { [filterUid]: value },
      sort: 'title_asc'
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format : 'RFC1738'
    })

    const url = `/${match.params.datastoreSlug}?${queryString}`
    history.push(url)
  }

  render() {
    const { filters } = this.props

    return (
      <React.Fragment>
      {Object.keys(filters).map(uid => {
        const name = filters[uid].name

        return (
          <section key={uid} className="browse u-margin-top-1">
            <h2 className="browse-heading">{name}</h2>

            <NestedList items={filters[uid].filters} handleClick={(value) => this.handleFilterClick(uid, value)} />
          </section>
        )
      })}
      </React.Fragment>
    )
  }
}

export default withRouter(BrowseByFilters)
