import Icon from '../../../reusable/components/Icon';
import React from 'react';
import { useSelector } from 'react-redux';

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
      <span className='flex parser-message font-small intent__warning'>
        <div><Icon icon='warning' size={15} /></div>
        <p
          className='details-message'
          dangerouslySetInnerHTML={{ __html: details }}
        />
      </span>
    </section>
  );
}
