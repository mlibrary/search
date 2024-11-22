import { Anchor, Icon } from '../../../reusable';
import { BrowseLink } from '../../../browse';
import PropTypes from 'prop-types';
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
              <Description activeDatastore={activeDatastore} data={datum} datastores={datastores} institution={institution} viewType={viewType} />
            </li>
          );
        })}
      </ol>
    );
  }

  const { browse, href, icon, search, text } = data;
  const searchScope = search?.scope || {};

  const anchorAttributes = { href };

  if (search) {
    const { slug, uid } = datastores.find((datastore) => {
      return datastore.uid === activeDatastore;
    });
    const { scope, type, value } = search;
    anchorAttributes.to = `/${slug}?${stringifySearch({
      filter: type === 'filtered' ? { [scope]: value } : {},
      library: uid === 'mirlyn' ? institution : '',
      query: type === 'fielded' ? `${scope}:${value}` : value
    })}`;
  }

  const { text: browseText, type, value } = browse || {};

  const child = (
    <>
      {icon && <Icon icon={icon} size={19} className='margin-right__2xs text-grey__light' />}
      { viewType !== 'Full' && !data.search ? <TrimString {...{ string: text, trimLength: searchScope === 'author' ? 64 : 240 }} /> : text }
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
            type={type}
            value={value}
          >
            {browseText}
          </BrowseLink>
        </>
      )}
    </>
  );
};

Description.propTypes = {
  activeDatastore: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  datastores: PropTypes.array,
  institution: PropTypes.string,
  viewType: PropTypes.string
};

export default Description;
