/** @jsxImportSource @emotion/react */
import React from 'react';
import { Icon } from '../../../reusable';

class KeywordSwitch extends React.Component {
  render() {
    const { datastore, query } = this.props;
    const containsKeyword = query.startsWith('contains');

    if (datastore.uid !== 'primo' || (query.search(/:\(/) !== -1 && !containsKeyword)) return null;

    const querySearch = containsKeyword? query.slice(10, -1) : `contains:(${query})`;
    const linkURL = `${datastore.slug}?query=${querySearch}`;
    const briefView = window.location.pathname.split('/').pop() === 'everything';
    const descriptionText = !briefView && containsKeyword ? 'Seeing less precise results than you expected?' : 'Not seeing the results you expected?';
    const linkText = () => {
      if (containsKeyword) {
        return briefView ? 'Try an exact phrase Articles search.' : 'Try your search as an exact phrase search.';
      }
      return briefView ? 'Try an Articles search that contains these terms.' : 'Broaden your search to include items that contain these terms and related words.';
    }

    return (
      <div className='keyword-switch'>
        <Icon
          d='M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z'
          size={24}
        />
        <p>{descriptionText}</p>
        <p>
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
    );
  }
}

export default KeywordSwitch;
