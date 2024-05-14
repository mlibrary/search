import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import {
  Anchor,
  Icon,
  Expandable,
  ExpandableChildren,
  ExpandableButton
} from '../../../reusable';
import { BrowseLink } from '../../../browse';
import { stringifySearch } from '../../../search';
import PropTypes from 'prop-types';

function DescriptionItem ({ href, search, browse, children }) {
  const { active: activeInstitution, defaultInstitution } = useSelector((state) => {
    return state.institution;
  });
  const { slug, uid } = useSelector((state) => {
    const { active, datastores } = state.datastores;
    return datastores.find((datastore) => {
      return datastore.uid === active;
    });
  });

  let to;

  if (search) {
    const { scope, type, value } = search;
    to = `/${slug}?${stringifySearch({
      query: type === 'fielded' ? `${scope}:${value}` : value,
      filter: type === 'filtered' ? { [scope]: value } : {},
      library: uid === 'mirlyn' ? (activeInstitution || defaultInstitution) : {}
    })}`;
  }

  return (
    <>
      {(href || search) ? <Anchor {...{ href, to }}>{children}</Anchor> : children}
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
}

DescriptionItem.propTypes = {
  href: PropTypes.string,
  search: PropTypes.object,
  browse: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

function Description ({ data }) {
  if (Array.isArray(data)) {
    return (
      <ol className='list__unstyled'>
        {data.map((datum, index) => {
          return (
            <li key={index} style={{ display: 'inline-block' }}>
              {index > 0 && <Icon icon='navigate_next' className='text-grey__light' />}
              <Description data={datum} />
            </li>
          );
        })}
      </ol>
    );
  }

  const { icon, text, image } = data;

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
        {text}
      </span>
      {image && (
        <img
          src={image}
          alt=''
          className='padding-top__xs'
          style={{ maxWidth: '16rem' }}
        />
      )}
    </DescriptionItem>
  );
}

Description.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

export default function Metadata ({ data, kind }) {
  return (
    <dl className='flex__responsive metadata-list'>
      {data.map((datum, datumIndex) => {
        const { description, term, termPlural } = datum;
        const isExpandable = description.length > 5;
        return (
          <div className='flex__responsive metadata-list-item' key={datumIndex}>
            <Expandable>
              <dt className={kind === 'condensed' ? 'visually-hidden' : ''}>
                {term}
              </dt>
              <div className='metadata-details'>
                <ExpandableChildren show={isExpandable ? 4 : description.length}>
                  {description.map((d, i) => {
                    return (
                      <dd key={i}>
                        <Description data={d} />
                      </dd>
                    );
                  })}
                </ExpandableChildren>
                {isExpandable && <ExpandableButton name={termPlural || term} count={description.length} />}
              </div>
            </Expandable>
          </div>
        );
      })}
    </dl>
  );
}

Metadata.propTypes = {
  data: PropTypes.array,
  kind: PropTypes.string
};
