/** @jsxImportSource @emotion/react */
import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Anchor,
  Icon,
  Expandable,
  ExpandableChildren,
  ExpandableButton
} from '../../../reusable';
import { stringifySearch } from '../../../search';

const visuallyHiddenCSS = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px'
};

export default function Metadata ({ data, kind }) {
  const isCondensed = kind === 'condensed';
  const metadataCSS = !isCondensed
    ? {
        '@media only screen and (min-width: 641px)': {
          display: 'grid',
          gridTemplateColumns: '10rem 1fr',
          gridColumnGap: 'var(--search-spacing-s)',
          'dt:not(:first-of-type) + dd': {
            paddingTop: 'var(--search-spacing-xs)'
          }
        }
      }
    : {
        dt: {
          ...visuallyHiddenCSS
        },
        'dt:not(:first-of-type) + dd': {
          paddingTop: 'var(--search-spacing-xs)'
        }
      };

  // Only show expandable if more than 5.
  function expandable (desc) {
    if (desc.length <= 5) {
      return {
        show: desc.length,
        expandable: false
      };
    }

    return {
      show: 4,
      expandable: true
    };
  }

  return (
    <dl
      css={{
        ...metadataCSS,
        'dt:not(:first-of-type)': {
          paddingTop: 'var(--search-spacing-xs)'
        }
      }}
    >
      {data.map((d, i) => {
        return (
          <Expandable key={'expandable-metadata-dt-dd-' + i}>
            <dt
              css={{
                gridColumnStart: '1'
              }}
            >
              {d.term}
            </dt>
            <ExpandableChildren show={expandable(d.description).show}>
              {d.description.map((d, i) => {
                return (
                  <dd
                    css={{
                      gridColumnStart: '2',
                      display: 'flex',
                      alignItems: 'top'
                    }}
                    key={'metadata-dd-' + i}
                  >
                    <Description data={d} />
                  </dd>
                );
              })}
            </ExpandableChildren>

            {expandable(d.description).expandable && (
              <dd
                css={{
                  gridColumnStart: '2',
                  display: 'flex',
                  alignItems: 'top'
                }}
              >
                <ExpandableButton
                  name={d.termPlural ? d.termPlural : d.term}
                  count={d.description.length}
                  css={{
                    marginTop: 'var(--search-spacing-xs)'
                  }}
                />
              </dd>
            )}
          </Expandable>
        );
      })}
    </dl>
  );
}

Metadata.propTypes = {
  data: PropTypes.array,
  kind: PropTypes.string
};

function Description ({ data }) {
  if (Array.isArray(data)) {
    return (
      <ol
        css={{
          margin: '0',
          padding: '0'
        }}
      >
        {data.map((d, i) => {
          return (
            <li
              css={{
                display: 'inline-block'
              }}
              key={'description-li-' + i}
            >
              {i > 0 && (
                <span
                  css={{
                    color: 'var(--ds-color-neutral-300)'
                  }}
                >
                  <Icon icon='navigate_next' />
                </span>
              )}
              <Description data={d} />
            </li>
          );
        })}
      </ol>
    );
  }

  const { icon, text, image } = data;

  return (
    <DescriptionItem {...data}>
      {icon && (
        <span
          css={{
            marginRight: 'var(--search-spacing-2xs)',
            color: 'var(--ds-color-neutral-300)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon icon={icon} size={19} />
        </span>
      )}

      {image
        ? (
          <div>
            <span
              css={{
                display: 'block'
              }}
            >
              {text}
            </span>
            <img
              src={image}
              alt=''
              css={{
                maxWidth: '16rem',
                width: '100%',
                paddingTop: 'var(--search-spacing-xs)'
              }}
            />
          </div>
          )
        : (
          <>{text}</>
          )}
    </DescriptionItem>
  );
}

Description.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

function DescriptionItem ({ href, search, browse, children }) {
  if (href || search || browse) {
    return (
      <DescriptionItemLink href={href} search={search} browse={browse}>
        {children}
      </DescriptionItemLink>
    );
  }

  return children;
}

DescriptionItem.propTypes = {
  href: PropTypes.string,
  search: PropTypes.object,
  browse: PropTypes.object,
  children: PropTypes.array
};

function browseLinkByEnvironment (type, value) {
  let browseLink = 'https://search.lib.umich.edu/catalog/browse';
  if (process.env.NODE_ENV === 'development') {
    browseLink = 'https://browse.workshop.search.lib.umich.edu';
  }
  return `${browseLink}/${type}?query=${value}`;
}

function DescriptionItemLink ({ href, search, browse, children }) {
  if (href) {
    return (
      <Anchor href={href}>
        {children}
      </Anchor>
    );
  }

  if (browse) {
    return (
      <span>
        <SearchLink search={search}>{children}</SearchLink>
        <Anchor
          css={{
            color: 'var(--ds-color-neutral-300)',
            fontSize: '0.875rem',
            textDecoration: 'underline',
            ':hover': {
              textDecorationThickness: '2px'
            },
            ':before': {
              background: 'var(--ds-color-neutral-400)',
              content: '""',
              display: 'inline-block',
              height: '1em',
              margin: '0 0.5rem',
              verticalAlign: 'middle',
              width: '1px'
            }
          }}
          href={browseLinkByEnvironment(browse.type, browse.value)}
        >
          {browse.text}
        </Anchor>
      </span>
    );
  }

  return <SearchLink search={search}>{children}</SearchLink>;
}

DescriptionItemLink.propTypes = {
  href: PropTypes.string,
  search: PropTypes.object,
  browse: PropTypes.object,
  children: PropTypes.array
};

function SearchLink ({ children, search }) {
  const { datastores, institution } = useSelector(createSelector(
    (state) => {
      return state.datastores;
    },
    (state) => {
      return state.institution;
    },
    (datastores, institution) => {
      return { datastores, institution };
    }
  ));
  const activeDatastore = datastores.datastores.find((ds) => {
    return ds.uid === datastores.active;
  });
  const to = `/${activeDatastore.slug}?${createSearchURL({
    ...search,
    institution,
    datastoreUid: activeDatastore.uid
  })}`;

  return (
    <Anchor to={to}>
      {children}
    </Anchor>
  );
}

SearchLink.propTypes = {
  children: PropTypes.array,
  search: PropTypes.object
};

function createSearchURL ({ type, scope, value, institution, datastoreUid }) {
  const query =
    type === 'fielded'
      ? `${scope}:${value}`
      : type === 'specified'
        ? value
        : {};
  const filter = type === 'filtered' ? { [scope]: value } : {};
  let library = {};

  if (datastoreUid === 'mirlyn') {
    library = institution.active
      ? institution.active
      : institution.defaultInstitution;
  }

  return stringifySearch({
    query,
    filter,
    library
  });
}
