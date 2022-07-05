/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Icon } from '../../../reusable';
import { searchOptions, searchOptionsDatastores } from '../../utilities';

const SearchTip = ({activeDatastore, field}) => {
  // Check if current datastore is found in any of the search options
  if (!searchOptionsDatastores().includes(activeDatastore.uid)) return (null);
  const selectOption = searchOptions().find((searchOption) => searchOption.datastore.includes(activeDatastore.uid) && searchOption.value === field);
  // Check if option and tip exist
  if (selectOption === undefined || selectOption.tip === undefined) return (null);
  return (
    <div
      css={{
        alignItems: 'flex-start',
        display: 'flex',
        gap: '12px',
        marginTop: '0.75rem',
        width: '100%'
      }}
    >
      <Icon
        d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"
        css={{
          flexShrink: '0',
          paddingTop: '4px',
          height: 'auto'
        }}
      />
      <p
        css={{
          margin: '0'
        }}
      >
        <span css={{fontWeight: 'bold'}}>{field.includes('browse_by') ? 'Browse' : 'Search'} Tip: </span>
        <span dangerouslySetInnerHTML={{__html: selectOption.tip}} />
      </p>
    </div>
  );
}

export default SearchTip;
