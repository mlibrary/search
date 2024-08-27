import './styles.css';
import Holder from '../Holder';
import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const Holders = ({ context, record }) => {
  const { mirlyn } = useSelector((state) => {
    return state.filters.active;
  });
  /*
   * - Check if the record is under 'Catalog', and the 'View search-only HathiTrust materials' is unchecked
   * - If true, remove all 'Search only (no full text)' holdings
   */
  if (
    record.datastore === 'mirlyn'
    && (!mirlyn || !mirlyn.search_only || mirlyn.search_only.includes('false'))
  ) {
    record.resourceAccess.forEach((resource) => {
      resource.rows = resource.rows.filter((row) => {
        return row[0].text !== 'Search only (no full text)';
      });
    });
  }
  return (
    <>
      {record.resourceAccess.map((data, index) => {
        const { rows, caption, type } = data;

        if (!rows?.length) {
          return null;
        }

        return (
          <details
            key={`${record.datastore + record.uid}-${index}`}
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
};

Holders.propTypes = {
  context: PropTypes.object,
  record: PropTypes.object
};

export default Holders;
