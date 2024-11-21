import './styles.css';
import {
  Anchor,
  Expandable,
  ExpandableButton,
  ExpandableChildren,
  Icon
} from '../../../reusable';
import { BrowseLink } from '../../../browse';
import PropTypes from 'prop-types';
import React from 'react';
import { stringifySearch } from '../../../search';
import { TrimString } from '../../../core';
import { useSelector } from 'react-redux';

const DescriptionItem = ({ browse, children, href, search }) => {
  const { active: activeInstitution, defaultInstitution } = useSelector((state) => {
    return state.institution;
  });
  const { slug, uid } = useSelector((state) => {
    const { active, datastores } = state.datastores;
    return datastores.find((datastore) => {
      return datastore.uid === active;
    });
  });

  const anchorAttributes = { href };

  if (search) {
    const { scope, type, value } = search;
    anchorAttributes.to = `/${slug}?${stringifySearch({
      filter: type === 'filtered' ? { [scope]: value } : {},
      library: uid === 'mirlyn' ? (activeInstitution || defaultInstitution) : {},
      query: type === 'fielded' ? `${scope}:${value}` : value
    })}`;
  }

  return (
    <>
      {(href || search) ? <Anchor {...anchorAttributes}>{children}</Anchor> : children}
      {browse && (
        <>
          <span className='text-grey font-small margin-x__2xs'>|</span>
          <BrowseLink
            className='text-grey font-small underline underline__hover-thick'
            type={browse.type}
            value={browse.value}
          >
            {browse.text}
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

const Description = ({ data, viewType }) => {
  if (Array.isArray(data)) {
    return (
      <ol className='list__unstyled'>
        {data.map((datum, index) => {
          return (
            <li key={index}>
              {index > 0 && <Icon icon='navigate_next' className='text-grey__light' />}
              <Description data={datum} />
            </li>
          );
        })}
      </ol>
    );
  }

  const { icon, image, search: { scope } = {}, text } = data;

  return (
    <DescriptionItem {...data}>
      <span style={{ display: image ? 'block' : 'initial' }}>
        {icon && (
          <Icon
            icon={icon}
            size={19}
            className='margin-right__2xs text-grey__light'
          />
        )}
        { viewType !== 'Full' && !data.search ? <TrimString {...{ string: text, trimLength: scope === 'author' ? 64 : 240 }} /> : text }
      </span>
      {image && (
        <img
          src={image}
          alt=''
          className='padding-top__xs'
        />
      )}
    </DescriptionItem>
  );
};

Description.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  viewType: PropTypes.string
};

export default function Metadata ({ data, viewType }) {
  return (
    <dl className='flex__responsive metadata-list'>
      {data.map((datum, datumIndex) => {
        const { description, term, termPlural } = datum;
        return (
          <div className={viewType === 'Preview' ? '' : 'metadata-list-item'} key={datumIndex}>
            <Expandable>
              <dt className={viewType === 'Preview' ? 'visually-hidden' : ''}>
                {term}
              </dt>
              <ExpandableChildren>
                {description.map((descriptor, index) => {
                  return (
                    <dd key={index}>
                      <Description data={descriptor} viewType={viewType} />
                    </dd>
                  );
                })}
              </ExpandableChildren>
              {description.length > 3 && <dd className='margin-top__2xs'><ExpandableButton name={termPlural || term} count={description.length} /></dd>}
            </Expandable>
          </div>
        );
      })}
    </dl>
  );
}

Metadata.propTypes = {
  data: PropTypes.array,
  viewType: PropTypes.string
};
