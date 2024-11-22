import DescriptionItem from '../DescriptionItem';
import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { TrimString } from '../../../core';

const Description = ({ data, viewType }) => {
  const { icon, image, search: { scope } = {}, text } = data;

  return (
    <DescriptionItem {...data}>
      <span style={{ display: image ? 'block' : 'initial' }}>
        {icon && <Icon icon={icon} size={19} className='margin-right__2xs text-grey__light' />}
        { viewType !== 'Full' && !data.search ? <TrimString {...{ string: text, trimLength: scope === 'author' ? 64 : 240 }} /> : text }
      </span>
      {image && <img src={image} alt='' className='padding-top__xs' />}
    </DescriptionItem>
  );
};

Description.propTypes = {
  data: PropTypes.object,
  viewType: PropTypes.string
};

export default Description;
