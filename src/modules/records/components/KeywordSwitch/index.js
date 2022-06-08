/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Icon } from '../../../reusable';

class KeywordSwitch extends React.Component {
  render() {
    const { datastore, query } = this.props;
    const containsKeyword = query.startsWith('contains');

    if (datastore.uid !== 'primo' || (query.search(/:\(/) !== -1 && !containsKeyword)) return null;

    const querySearch = containsKeyword? query.slice(10, -1) : `contains:(${query})`;
    const linkURL = `${datastore.slug}?query=${querySearch}`;
    const linkText = containsKeyword ? 'Try an exact phrase Articles search.' : 'Try an Articles search that contains these terms.';

    return (
      <div className='keyword-switch'>
        <Icon
          d='M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z'
          size={24}
        />
        <p>Not seeing the results you expected?</p>
        <p>
          <a
            href={linkURL}
            css={{
              textDecoration: 'underline'
            }}
          >
            {linkText}
          </a>
        </p>
      </div>
    );
  }
}

export default KeywordSwitch;
