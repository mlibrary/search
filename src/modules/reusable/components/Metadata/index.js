/** @jsxImportSource @emotion/react */
// eslint-disable-next-line
import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Icon,
  Expandable,
  ExpandableChildren,
  ExpandableButton
} from '../../../reusable';
import {
  SPACING,
  MEDIA_QUERIES,
  COLORS,
  LINK_STYLES
} from '../../umich-lib-core-temp';
import { stringifySearchQueryForURL } from '../../../pride';

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
        [MEDIA_QUERIES.LARGESCREEN]: {
          display: 'grid',
          gridTemplateColumns: '10rem 1fr',
          gridColumnGap: SPACING.S,
          'dt:not(:first-of-type) + dd': {
            paddingTop: SPACING.XS
          }
        }
      }
    : {
        dt: {
          ...visuallyHiddenCSS
        },
        'dt:not(:first-of-type) + dd': {
          paddingTop: SPACING.XS
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
          paddingTop: SPACING.XS
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
                  kind='secondary'
                  small
                  css={{
                    marginTop: SPACING.XS
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
                    color: COLORS.neutral['300']
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
            marginRight: SPACING['2XS'],
            color: COLORS.neutral['300'],
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
                paddingTop: SPACING.XS
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

function DescriptionItemLink ({ href, search, browse, children }) {
  if (href) {
    return (
      <a css={LINK_STYLES.default} href={href}>
        {children}
      </a>
    );
  }

  if (browse) {
    return (
      <span>
        {children}
        <a
          css={{
            color: COLORS.neutral['300'],
            fontSize: '0.875rem',
            textDecoration: 'underline',
            ':hover': {
              textDecorationThickness: '2px'
            },
            ':before': {
              background: COLORS.neutral['400'],
              content: '""',
              display: 'inline-block',
              height: '1em',
              margin: '0 0.5rem',
              verticalAlign: 'middle',
              width: '1px'
            }
          }}
          href={`/catalog/browse/${browse.type}?query=${browse.value}`}
        >
          Browse in {browse.type === 'callnumber' ? 'call number' : browse.type} list
        </a>
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
  const { datastores, institution } = useSelector((state) => {
    return state;
  });
  const activeDatastore = datastores.datastores.find(
    (ds) => {
      return ds.uid === datastores.active;
    }
  );
  const to =
    '/' +
    activeDatastore.slug +
    '?' +
    createSearchURL({
      ...search,
      institution,
      datastoreUid: activeDatastore.uid
    });

  return (
    <Link to={to}>
      {children}
    </Link>
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

  return stringifySearchQueryForURL({
    query,
    filter,
    library
  });
}
