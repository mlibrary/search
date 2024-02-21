/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../reusable/components/Icon';
import Holder from './holder';
import { COLORS } from '../../reusable/umich-lib-core-temp/index';
import PropTypes from 'prop-types';

export default function Holders ({
  record,
  context
}) {
  const { mirlyn } = useSelector((state) => {
    return state.filters.active;
  });
  /*
    - Check if the record is under 'Catalog', and the 'Remove search-only HathiTrust materials' is checked
    - If true, remove all 'Search only (no full text)' holdings
  */
  if (
    record.datastore === 'mirlyn' &&
    (
      !mirlyn ||
      (Object.keys(mirlyn).includes('search_only') && mirlyn.search_only.includes('true'))
    )
  ) {
    // UNCOMMENT THE BLOCK BELOW WHEN READY TO LAUNCH
    /*
    record.resourceAccess.forEach((resource) => {
      resource.rows = resource.rows.filter((row) => {
        return row[0].text !== 'Search only (no full text)';
      });
    });
    */
  }
  return (
    <>
      {record.resourceAccess.map((data, i) => {
        const { rows, caption, type } = data;
        if (!rows.length) {
          return null;
        }
        return (
          <details
            key={record.datastore + record.uid + '-' + i}
            css={{
              '& > *': {
                padding: '0.75rem 1rem',
                paddingLeft: '3rem'
              }
            }}
            open={record.resourceAccess.length === 1}
          >
            <summary
              css={{
                alignItems: 'center',
                borderTop: `solid 1px ${COLORS.neutral['100']}`,
                color: COLORS.neutral['300'],
                cursor: 'pointer',
                display: 'flex',
                gap: '0.75rem',
                listStyle: 'none',
                '&::-webkit-details-marker': {
                  display: 'none'
                },
                'details[open] > &': {
                  background: COLORS.blue['100']
                },
                '& > *': {
                  flexShrink: '0'
                }
              }}
            >
              <Icon
                d={
                  type === 'electronic'
                    ? 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'
                    : 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'
                }
                size={19}
              />
              <span css={{
                flexGrow: '1',
                flexShrink: '1'
              }}
              >
                <span
                  css={{
                    fontWeight: '600',
                    color: COLORS.neutral['400'],
                    'summary:hover &': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {caption || 'Availability'}
                </span>
                &nbsp;&nbsp;&middot;&nbsp;&nbsp;{rows.length} item{rows.length > 1 ? 's' : null}
              </span>
              <span css={{
                'details:not([open]) > summary > & > svg:first-of-type, details[open] > summary > & > svg:last-of-type': {
                  display: 'none'
                }
              }}
              >
                <Icon size={24} d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
                <Icon size={24} d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
              </span>
            </summary>
            <Holder context={context} {...data} />
          </details>
        );
      })}
    </>
  );
}

Holders.propTypes = {
  record: PropTypes.object,
  context: PropTypes.object
};
