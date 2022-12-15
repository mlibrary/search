/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../reusable';
import { COLORS } from '../../../reusable/umich-lib-core-temp';

class KeywordSwitch extends React.Component {
  render () {
    const { datastore, query } = this.props;
    const containsKeyword = query.startsWith('contains');

    if (datastore.uid !== 'primo' || (query.search(/:\(/) !== -1 && !containsKeyword)) return null;

    const querySearch = containsKeyword ? query.slice(10, -1) : `contains:(${query})`;
    const linkURL = `${datastore.slug}?query=${querySearch}`;
    const briefView = window.location.pathname.split('/').pop() === 'everything';
    const descriptionText = !briefView && containsKeyword ? 'Seeing less precise results than you expected?' : 'Not seeing the results you expected?';
    const linkText = () => {
      if (containsKeyword) {
        return briefView ? 'Try an exact phrase Articles search.' : 'Try your search as an exact phrase search.';
      }
      return briefView ? 'Try an Articles search that contains these terms.' : 'Broaden your search to include items that contain these terms and related words.';
    };

    return (
      <div
        className={`keyword-switch ${briefView ? 'record-preview' : 'record'}`}
        css={{
          borderLeft: `4px solid ${COLORS.maize[400]}`
        }}
      >
        <div
          className={`keyword-switch ${!briefView && 'record-container'}`}
          css={{
            position: 'relative'
          }}
        >
          <Icon
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
            size={24}
            css={{
              color: `${COLORS.maize[500]}`,
              position: 'absolute'
            }}
          />
          <p
            className='no-margin'
            css={{
              paddingLeft: '36px'
            }}
          >
            {descriptionText}
          </p>
          <p
            className='no-margin'
            css={{
              paddingLeft: '36px'
            }}
          >
            <a
              href={linkURL}
              css={{
                textDecoration: 'underline'
              }}
            >
              {linkText()}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

KeywordSwitch.propTypes = {
  datastore: PropTypes.object,
  query: PropTypes.string
};

export default KeywordSwitch;
