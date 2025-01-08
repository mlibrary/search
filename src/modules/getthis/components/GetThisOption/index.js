import React, { useRef } from 'react';
import GetThisFindIt from '../GetThisFindIt';
import { GetThisForm } from '../../../getthis';

const GetThisOption = ({ option }) => {
  const detailsRef = useRef(null);

  return (
    <details className='get-this-option' ref={detailsRef}>
      <summary className='get-this-option-summary'>
        <h3 className='get-this-option-heading'>
          <span className='get-this-option-heading-text'>{option.label}</span>
          <span className='get-this-option-subheading'>{option.summary}</span>
        </h3>
      </summary>

      <div className='get-this-option-details-container'>
        <div className='get-this-option-column'>
          {option.form
            ? (
                <>
                  {option.orientation && <div dangerouslySetInnerHTML={{ __html: option.orientation }} />}
                  <GetThisForm label={option.label} form={option.form} />
                </>
              )
            : option.label === 'Get it off the shelves' && <GetThisFindIt />}
        </div>

        {option.description && (
          <div className='get-this-option-column'>
            {option.description.heading && (
              <h4 className='get-this-policies-heading'>{option.description.heading}</h4>
            )}
            {option.description.content && (
              <ul className='get-this-policies-list'>
                {option.description.content.map((policy, key) => {
                  return (
                    <li key={key} dangerouslySetInnerHTML={{ __html: policy }} />
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </details>
  );
};

export default GetThisOption;
