import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import { Icon } from '../../../reusable';
import Holder from '../Holder';
import PropTypes from 'prop-types';

export default function Holders ({ record, context }) {
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

        if (!rows.length) return null;

        return (
          <details
            key={record.datastore + record.uid + '-' + i}
            className='holders-details'
            open={record.resourceAccess.length === 1}
          >
            <summary>
              <Icon
                icon={type === 'electronic' ? 'link' : 'insert_drive_file'}
                size={19}
              />
              <span>
                <span className='holders-details-summary-title'>
                  {caption || 'Availability'}
                </span>
                <span className='text-grey__light'>
                  &nbsp;&nbsp;&middot;&nbsp;&nbsp;{rows.length} item{rows.length > 1 ? 's' : null}
                </span>
              </span>
              <Icon size={24} icon='expand_less' className='expand-less' />
              <Icon size={24} icon='expand_more' className='expand-more' />
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
