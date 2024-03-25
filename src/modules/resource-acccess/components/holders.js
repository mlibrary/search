/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../reusable/components/Icon';
import Holder from './holder';
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
    record = {
      ...record,
      resourceAccess: record.resourceAccess.map((resource) => {
        return {
          ...resource,
          rows: resource.rows.filter((row) => {
            return row[0].text !== 'Search only (no full text)';
          })
        };
      })
    };
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
                borderTop: 'solid 1px var(--ds-color-neutral-100)',
                color: 'var(--ds-color-neutral-300)',
                cursor: 'pointer',
                display: 'flex',
                gap: '0.75rem',
                listStyle: 'none',
                '&::-webkit-details-marker': {
                  display: 'none'
                },
                'details[open] > &': {
                  background: 'var(--ds-color-blue-100)'
                },
                '& > *': {
                  flexShrink: '0'
                }
              }}
            >
              <Icon
                icon={type === 'electronic' ? 'link' : 'insert_drive_file'}
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
                    color: 'var(--ds-color-neutral-400)',
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
                  display: 'none!important'
                }
              }}
              >
                <Icon size={24} icon='expand_less' />
                <Icon size={24} icon='expand_more' />
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
