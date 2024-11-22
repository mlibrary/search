import { Anchor, Icon } from '../../../reusable';
import { BrowseLink } from '../../../browse';
import PropTypes from 'prop-types';
import React from 'react';
import { stringifySearch } from '../../../search';
import { TrimString } from '../../../core';
import { useSelector } from 'react-redux';

const Description = ({ data, viewType }) => {
  const { active: activeInstitution, defaultInstitution } = useSelector((state) => {
    return state.institution;
  });
  const { active: activeDatastore, datastores } = useSelector((state) => {
    return state.datastores;
  });

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
      library: uid === 'mirlyn' ? (activeInstitution || defaultInstitution) : {},
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
  data: PropTypes.object,
  viewType: PropTypes.string
};

export default Description;
