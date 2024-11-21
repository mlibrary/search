import { Anchor } from '../../../reusable';
import { BrowseLink } from '../../../browse';
import PropTypes from 'prop-types';
import React from 'react';
import { stringifySearch } from '../../../search';
import { useSelector } from 'react-redux';

const DescriptionItem = ({ browse, children, href, search }) => {
  const { active: activeInstitution, defaultInstitution } = useSelector((state) => {
    return state.institution;
  });
  const { active: activeDatastore, datastores } = useSelector((state) => {
    return state.datastores;
  });

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

  const { text, type, value } = browse || {};

  return (
    <>
      {(href || search) ? <Anchor {...anchorAttributes}>{children}</Anchor> : children}
      {browse?.text && (
        <>
          <span className='text-grey font-small margin-x__2xs'>|</span>
          <BrowseLink
            className='text-grey font-small underline underline__hover-thick'
            type={type}
            value={value}
          >
            {text}
          </BrowseLink>
        </>
      )}
    </>
  );
};

DescriptionItem.propTypes = {
  browse: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  href: PropTypes.string,
  search: PropTypes.object
};

export default DescriptionItem;
