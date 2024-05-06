import React from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../../reusable/components/Icon';

export default function SearchResultsMessage () {
  const { parserMessage, query } = useSelector((state) => {
    return state.search;
  });

  if (!parserMessage) {
    return (
      <p className='margin__none' aria-live='polite'>
        Showing results for: <span className='strong'>{query}</span>
      </p>
    );
  }

  const { actual, details, original } = parserMessage.data;

  return (
    <section>
      <p className='margin__none' aria-live='polite'>
        Showing results for: <span className='strong'>{actual}</span>
      </p>
      <p className='font-small margin__none'>
        You searched for: <span className='strong'>{original}</span>
      </p>
      <span
        className='flex parser-message font-small'
        style={{
          alignItems: 'baseline',
          color: '#AA5600',
          gap: '0.5rem'
        }}
      >
        <div><Icon icon='warning' size={15} /></div>
        <p
          className='details-message'
          dangerouslySetInnerHTML={{ __html: details }}
        />
      </span>
    </section>
  );
}
