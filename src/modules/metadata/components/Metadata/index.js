import './styles.css';
import {
  ContextProvider,
  Expandable,
  ExpandableButton,
  ExpandableChildren
} from '../../../reusable';
import Description from '../Description';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const Metadata = ({ metadata = {} }) => {
  const { active: activeInstitution, defaultInstitution } = useSelector((state) => {
    return state.institution;
  });
  const { active: activeDatastore, datastores } = useSelector((state) => {
    return state.datastores;
  });

  const institution = activeInstitution || defaultInstitution;

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
                            <Description activeDatastore={activeDatastore} data={descriptor} datastores={datastores} institution={institution} viewType={viewType} />
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
