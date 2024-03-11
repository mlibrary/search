import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ResourceAccess } from '../../../reusable';
import getHoldingByBarcode from '../../getHoldingByBarcode';
import { StyledGetThisResourceAccessContainer } from '../GetThisRecord';

const GetThisFindIt = () => {
  const { barcode } = useParams();
  const record = useSelector((state) => {
    return state.records.record;
  });

  if (!record.resourceAccess) return null;

  const holding = getHoldingByBarcode(record.resourceAccess, barcode);

  if (holding) {
    return (
      <>
        <p className='u-margin-top-none'>Use this information to find it:</p>

        <StyledGetThisResourceAccessContainer>
          <ResourceAccess
            {...holding[0]}
            renderAnchor={() => {
              return null;
            }}
          />
        </StyledGetThisResourceAccessContainer>
      </>
    );
  }
};

export default GetThisFindIt;
