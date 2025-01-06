import './styles.css';
import {
  ContextProvider,
  Expandable,
  ExpandableButton,
  ExpandableChildren
} from '../../../reusable';
import Description from '../Description';
import React from 'react';
import { useSelector } from 'react-redux';

const Metadata = ({ metadata = {} }) => {
  const { active: activeInstitution, defaultInstitution } = useSelector((state) => {
    return state.institution;
  });
  const { active: activeDatastore, datastores } = useSelector((state) => {
    return state.datastores;
  });

  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }

  const institution = activeInstitution || defaultInstitution;

  const metadataView = {
    Full: metadata.full,
    Medium: metadata.medium,
    Preview: metadata.preview
  };

  return (
    <ContextProvider
      render={({ viewType }) => {
        return (
          <dl className='flex__responsive metadata-list'>
            {(metadataView[viewType] || metadata.full).map(({ description, term, termPlural }, index) => {
              if (!description) {
                return null;
              }

              return (
                <div className={viewType === 'Preview' ? '' : 'metadata-list-item'} key={index}>
                  <Expandable>
                    <dt className={viewType === 'Preview' ? 'visually-hidden' : ''}>
                      {term}
                    </dt>
                    <ExpandableChildren>
                      {description.map((data, dataIndex) => {
                        return (
                          <dd key={dataIndex}>
                            <Description {...{ activeDatastore, data, datastores, institution, viewType }} />
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

export default Metadata;
