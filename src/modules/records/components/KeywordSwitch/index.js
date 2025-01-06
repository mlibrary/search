import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import React from 'react';

const KeywordSwitch = ({ datastore, query }) => {
  const exactQuery = 'exact:(';
  const isExactSearch = query.startsWith(exactQuery);
  const isContainsSearch = query.startsWith('contains:(') || query.startsWith('keyword:(') || !query.includes(':(');

  if (datastore.uid !== 'primo' || (!isExactSearch && !isContainsSearch)) {
    return null;
  }

  const strippedQuery = query.includes(':(') ? query.slice((query.indexOf('(') + 1), -1) : query;
  const querySearch = isExactSearch ? strippedQuery : `${exactQuery}${strippedQuery})`;
  const briefView = window.location.pathname.split('/').pop() === 'everything';
  const linkText = () => {
    if (isContainsSearch) {
      return briefView ? 'Try an exact phrase Articles search.' : 'Try your search as an exact phrase search.';
    }
    return briefView ? 'Try an Articles search that contains these terms.' : 'Broaden your search to include items that contain these terms and related words.';
  };

  return (
    <div className={`flex padding__m padding-left__s ${briefView ? 'record-preview' : 'container__rounded record'} keyword-switch`}>
      <Icon
        d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
        size={24}
      />
      <div>
        <p className='no-margin'>
          {!briefView && isContainsSearch ? 'Seeing less precise results than you expected?' : 'Not seeing the results you expected?'}
        </p>
        <p className='no-margin'>
          <Anchor to={`?query=${querySearch}`}>
            {linkText()}
          </Anchor>
        </p>
      </div>
    </div>
  );
};

export default KeywordSwitch;
