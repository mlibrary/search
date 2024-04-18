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

export default function Metadata ({ data, kind }) {
  return (
    <dl className='flex__responsive metadata-list'>
      {data.map((datum, datumIndex) => {
        const isExpandable = datum.description.length > 5;
        return (
          <div className='flex__responsive metadata-list-item' key={'expandable-metadata-dt-dd-' + datumIndex}>
            <Expandable>
              <dt className={kind === 'condensed' ? 'visually-hidden' : ''}>
                <span>{datum.term}</span>
              </dt>
              <div className='metadata-details'>
                <ExpandableChildren show={isExpandable ? 4 : datum.description.length}>
                  {datum.description.map((d, i) => {
                    return (
                      <dd key={'metadata-dd-' + i}>
                        <Description data={d} />
                      </dd>
                    );
                  })}
                </ExpandableChildren>

                {isExpandable && (
                  <dd>
                    <ExpandableButton
                      name={datum.termPlural ? datum.termPlural : datum.term}
                      count={datum.description.length}
                    />
                  </dd>
                )}
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

function Description ({ data }) {
  if (Array.isArray(data)) {
    return (
      <ol className='list__unstyled'>
        {data.map((d, i) => {
          return (
            <li
              key={'description-li-' + i}
              style={{ display: 'inline-block' }}
            >
              {i > 0 && <Icon icon='navigate_next' className='text-grey__light' />}
              <Description data={d} />
            </li>
          );
        })}
      </ol>
    );
  }

  const { icon, text, image } = data;

  return (
    <DescriptionItem {...data}>
      {icon &&
        <Icon
          icon={icon}
          size={19}
          className='margin-right__2xs text-grey__light'
        />}

      {image
        ? (
          <div>
            <p className='margin__none'>
              {text}
            </p>
            <img
              src={image}
              alt=''
              className='padding-top__xs'
              style={{
                maxWidth: '16rem'
              }}
            />
          </div>
          )
        : text}
    </DescriptionItem>
  );
}

Description.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};

function DescriptionItem ({ href, search, browse, children }) {
  if (href || search || browse) {
    return (
      <DescriptionItemLink href={href} search={search} browse={browse}>
        {children}
      </DescriptionItemLink>
    );
  }

  return children;
}

DescriptionItem.propTypes = {
  href: PropTypes.string,
  search: PropTypes.object,
  browse: PropTypes.object,
  children: PropTypes.array
};

function DescriptionItemLink ({ href, search, browse, children }) {
  if (href) {
    return (
      <Anchor href={href}>
        {children}
      </Anchor>
    );
  }

  return (
    <>
      <SearchLink search={search}>{children}</SearchLink>
      {browse &&
        <>
          <span className='text-grey font-small margin-x__2xs'>|</span>
          <BrowseLink
            className='text-grey font-small underline underline__hover-thick'
            type={browse.type}
            value={browse.value}
          >
            {browse.text}
          </BrowseLink>
        </>}
    </>
  );
}

DescriptionItemLink.propTypes = {
  href: PropTypes.string,
  search: PropTypes.object,
  browse: PropTypes.object,
  children: PropTypes.array
};

function SearchLink ({ children, search }) {
  const { active: activeInstitution, defaultInstitution } = useSelector((state) => {
    return state.institution;
  });
  const { datastores, active: activeDatastore } = useSelector((state) => {
    return state.datastores;
  });

  if (!search) return children;

  const { type, scope, value = children } = search;
  const query =
    type === 'fielded'
      ? `${scope}:${value}`
      : type === 'specified'
        ? value
        : {};
  const filter = type === 'filtered' ? { [scope]: value } : {};
  const { uid, slug } = datastores.find((datastore) => {
    return datastore.uid === activeDatastore;
  });
  const library = uid === 'mirlyn' ? (activeInstitution || defaultInstitution) : {};

  return (
    <Anchor to={`/${slug}?${stringifySearch({ query, filter, library })}`}>
      {children}
    </Anchor>
  );
}

SearchLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  search: PropTypes.object
};
