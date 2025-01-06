import { Anchor, Icon } from '../../../reusable';
import { BrowseLink } from '../../../browse';
import React from 'react';
import { stringifySearch } from '../../../search';
import { TrimString } from '../../../core';

const Description = ({ activeDatastore, data, datastores, institution, viewType }) => {
  if (Array.isArray(data)) {
    return (
      <ol className='list__unstyled'>
        {data.map((datum, index) => {
          return (
            <li key={index}>
              {index > 0 && <Icon icon='navigate_next' className='text-grey__light' />}
              <Description {...{ activeDatastore, data: datum, datastores, institution, viewType }} />
            </li>
          );
        })}
      </ol>
    );
  }

  const { browse, href, icon, search, text } = data;
  const searchScope = search?.scope || {};
  const anchorAttributes = search
    ? (
        () => {
          const { slug, uid } = datastores.find((datastore) => {
            return datastore.uid === activeDatastore;
          });
          const { scope, type, value } = search;
          return {
            to: `/${slug}?${stringifySearch({
              filter: type === 'filtered' ? { [scope]: value } : {},
              library: uid === 'mirlyn' ? institution : '',
              query: type === 'fielded' ? `${scope}:${value}` : value
            })}`
          };
        }
      )()
    : { href };

  const { text: browseText, type, value } = browse || {};

  const child = (
    <>
      {icon && <Icon icon={icon} size={19} className='margin-right__2xs text-grey__light' />}
      { ['Preview', 'Medium'].includes(viewType) ? <TrimString {...{ string: text, trimLength: searchScope === 'author' ? 64 : 240 }} /> : text }
    </>
  );

  return (
    <>
      {(href || search) ? <Anchor {...anchorAttributes}>{child}</Anchor> : child}
      {browseText && (
        <>
          <span className='text-grey font-small margin-x__2xs'>|</span>
          <BrowseLink
            className='text-grey font-small underline underline__hover-thick'
            {...{ type, value }}
          >
            {browseText}
          </BrowseLink>
        </>
      )}
    </>
  );
};

export default Description;
