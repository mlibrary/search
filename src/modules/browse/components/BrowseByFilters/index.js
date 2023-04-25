import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';

class NestedList extends React.Component {
  render () {
    const {
      browserFilterTo,
      items
    } = this.props;
    /*
      loop through the items array and create a new component for each, passing
      the current person (id and name) and its children (items.children) as props
    */

    const nodes = items.map(function (item, key) {
      return (
        <Node key={key} node={item} browserFilterTo={browserFilterTo}>
          {item.children}
        </Node>
      );
    });

    return (
      <ul className='nested-list'>
        {nodes}
      </ul>
    );
  }
}

NestedList.propTypes = {
  browserFilterTo: PropTypes.func,
  items: PropTypes.array
};

class BrowseFilter extends React.Component {
  render () {
    const { name, value, count } = this.props.filter;
    const { browserFilterTo } = this.props;

    if (value) {
      return (
        <Link
          to={browserFilterTo(value)}
          className='browse-filter-link'
        >
          <span className='browse-filter-link__text'>{name}</span>
          <span className='browse-filter-link__count'>({count})</span>
        </Link>
      );
    }

    return (
      <h3 className='heading-medium' style={{ marginTop: '0' }}>{name}</h3>
    );
  }
}

BrowseFilter.propTypes = {
  filter: PropTypes.object,
  browserFilterTo: PropTypes.func
};

class Node extends React.Component {
  render () {
    const {
      children,
      browserFilterTo
    } = this.props;
    let childnodes = null;

    // the Node component calls itself if there are React children
    if (this.props.children) {
      childnodes = children.map(function (childnode, key) {
        return (
          <Node
            key={key}
            node={childnode}
            browserFilterTo={browserFilterTo}
          >
            {childnode.children}
          </Node>
        );
      });
    }

    // return our list element
    // display React children if there are any
    return (
      <li key={this.props.node.name}>
        <BrowseFilter
          filter={this.props.node}
          browserFilterTo={browserFilterTo}
        />
        {childnodes
          ? <ul>{childnodes}</ul>
          : null}
      </li>
    );
  }
}

Node.propTypes = {
  children: PropTypes.array,
  browserFilterTo: PropTypes.func,
  node: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

class BrowseByFilters extends React.Component {
  handleBrowserFilterTo (filterUid, value) {
    const {
      match
    } = this.props;

    const queryString = qs.stringify({
      filter: { [filterUid]: value },
      sort: 'title_asc'
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format: 'RFC1738'
    });

    return `/${match.params.datastoreSlug}?${queryString}`;
  }

  render () {
    const { filters } = this.props;

    return (
      <>
        {Object.keys(filters).map((uid) => {
          const name = filters[uid].name;

          return (
            <section key={uid} className='browse u-margin-top-1'>
              <h2 className='heading-large' style={{ marginTop: '0' }}>{name}</h2>

              <NestedList
                items={filters[uid].filters}
                browserFilterTo={(value) => {
                  return this.handleBrowserFilterTo(uid, value);
                }}
              />
            </section>
          );
        })}
      </>
    );
  }
}

BrowseByFilters.propTypes = {
  match: PropTypes.object,
  filters: PropTypes.object
};

export default withRouter(BrowseByFilters);
