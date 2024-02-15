import React, { useRef } from 'react';
import GetThisFindIt from '../GetThisFindIt';
import { GetThisForm } from '../../../getthis';
import PropTypes from 'prop-types';

function GetThisOption ({ option }) {
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
        <div className='get-this-option-left-half'>
          {option.form
            ? <GetThisForm label={option.label} form={option.form} />
            : (
              <>
                {option.label === 'Find it in the library' && (
                  <GetThisFindIt />
                )}
              </>
              )}
        </div>

        {option.description && (
          <div className='get-this-option-right-half'>
            <div className='get-this-policies-container'>
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
          </div>
        )}
      </div>
    </details>
  );
}

GetThisOption.propTypes = {
  option: PropTypes.object
};

export default GetThisOption;
