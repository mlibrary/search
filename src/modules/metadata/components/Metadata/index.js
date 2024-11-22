import './styles.css';
import {
  ContextProvider,
  Expandable,
  ExpandableButton,
  ExpandableChildren,
  Icon
} from '../../../reusable';
import Description from '../Description';
import PropTypes from 'prop-types';
import React from 'react';

const Metadata = ({ metadata = {} }) => {
  return (
    <ContextProvider
      render={({ viewType }) => {
        if (!metadata || Object.keys(metadata).length === 0) {
          return null;
        }

        const metadataView = {
          Full: metadata.full,
          Medium: metadata.medium,
          Preview: metadata.preview
        };

        const data = metadataView[viewType] || metadata.full;

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
                            {Array.isArray(descriptor)
                              ? (
                                  <ol className='list__unstyled'>
                                    {descriptor.map((descript, number) => {
                                      return (
                                        <li key={number}>
                                          {number > 0 && <Icon icon='navigate_next' className='text-grey__light' />}
                                          <Description data={descript} />
                                        </li>
                                      );
                                    })}
                                  </ol>
                                )
                              : <Description data={descriptor} viewType={viewType} />}
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
      }}
    />
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object
};

export default Metadata;
