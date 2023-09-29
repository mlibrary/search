import React from 'react';
import { Anchor } from '../../../reusable';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';

function BrowseFilter (props) {
  const { browserFilterTo, filter } = props;

  if (filter.value) {
    return (
      <Anchor
        to={browserFilterTo(filter.value)}
        className='browse-filter-link'
      >
        <span className='browse-filter-link__text'>{filter.name}</span>
        <span className='browse-filter-link__count'>({filter.count})</span>
      </Anchor>
    );
  }

  return (
    <h3 className='heading-medium' style={{ marginTop: '0' }}>{filter.name}</h3>
  );
}

BrowseFilter.propTypes = {
  filter: PropTypes.object,
  browserFilterTo: PropTypes.func
};

function Node (props) {
  return (
    <li key={props.node.name}>
      <BrowseFilter
        filter={props.node}
        browserFilterTo={props.browserFilterTo}
      />
      {props.children &&
        <ul>
          {props.children.map((childnode, key) => {
            return (
              <Node
                key={key}
                node={childnode}
                browserFilterTo={props.browserFilterTo}
              >
                {childnode.children}
              </Node>
            );
          })}
        </ul>}
    </li>
  );
}

Node.propTypes = {
  children: PropTypes.array,
  browserFilterTo: PropTypes.func,
  node: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

function NestedList (props) {
  /*
    loop through the items array and create a new component for each, passing
    the current person (id and name) and its children (items.children) as props
  */
  return (
    <ul className='nested-list'>
      {props.items.map((item, key) => {
        return (
          <Node key={key} node={item} browserFilterTo={props.browserFilterTo}>
            {item.children}
          </Node>
        );
      })}
    </ul>
  );
}

NestedList.propTypes = {
  browserFilterTo: PropTypes.func,
  items: PropTypes.array
};

function BrowseByFilters (props) {
  return (
    <>
      {Object.keys(props.filters).map((uid) => {
        const name = props.filters[uid].name;

        return (
          <section key={uid} className='browse u-margin-top-1'>
            <h2 className='heading-large' style={{ marginTop: '0' }}>{name}</h2>
            <NestedList
              items={props.filters[uid].filters}
              browserFilterTo={(value) => {
                const queryString = qs.stringify({
                  filter: { [uid]: value },
                  sort: 'title_asc'
                }, {
                  arrayFormat: 'repeat',
                  encodeValuesOnly: true,
                  allowDots: true,
                  format: 'RFC1738'
                });
                return `/${props.match.params.datastoreSlug}?${queryString}`;
              }}
            />
          </section>
        );
      })}
    </>
  );
}

BrowseByFilters.propTypes = {
  match: PropTypes.object,
  filters: PropTypes.object
};

export default withRouter(BrowseByFilters);
