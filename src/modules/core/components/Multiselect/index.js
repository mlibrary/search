import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { Checkbox } from '../../../core';

class Multiselect extends React.Component {
  constructor (props) {
    super(props);
    this.handleOptionSelection = this.handleOptionSelection.bind(this);
    this.handleFilterQueryChange = this.handleFilterQueryChange.bind(this);
    this.isOptionFiltered = this.isOptionFiltered.bind(this);
    this.handleShowOnlySelectedOptionsClick = this.handleShowOnlySelectedOptionsClick.bind(this);

    this.state = {
      filterQuery: '',
      showOnlySelectedOptions: false
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { showOnlySelectedOptions } = this.state;

    // Reset show only selected toggle when unchecking the last checked option
    if (showOnlySelectedOptions) {
      const selectedOptions = _.filter(nextProps.options, (option) => {
        return option.checked;
      });

      if (selectedOptions.length === 0) {
        this.setState({
          showOnlySelectedOptions: false
        });
      }
    }
  }

  handleOptionSelection (option, index) {
    this.props.handleSelection(index, option);
  }

  handleFilterQueryChange (value) {
    this.setState({
      filterQuery: value
    });
  }

  handleShowOnlySelectedOptionsClick () {
    this.setState({
      showOnlySelectedOptions: !this.state.showOnlySelectedOptions
    });
  }

  isOptionFiltered (option) {
    const { filterQuery } = this.state;

    if (filterQuery.length === 0) {
      return false;
    }

    const isFiltered = !(option.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1);

    return isFiltered;
  }

  render () {
    const {
      options,
      filterGroupUid,
      descriptionText
    } = this.props;
    const { filterQuery, showOnlySelectedOptions } = this.state;

    if (!options || options.length === 0) {
      return null;
    }

    const selectedOptions = _.filter(options, (option) => {
      return option.checked;
    });

    return (
      <div className='multiselect'>
        {descriptionText && (
          <p className='font-small'>{descriptionText}</p>
        )}
        <label htmlFor={`filter-options-${filterGroupUid.replaceAll('_', '-')}`}>Filter<span className='visually-hidden'> {filterGroupUid.replaceAll('_', ' ')} options</span></label>
        <input
          type='text'
          className='multiselect-search'
          id={`filter-options-${filterGroupUid.replaceAll('_', '-')}`}
          aria-describedby={filterGroupUid}
          value={filterQuery}
          onChange={(event) => {
            return this.handleFilterQueryChange(event.target.value);
          }}
          autoComplete='on'
        />
        <p id={filterGroupUid} className='offscreen'>Below this edit box is a list of checkboxes that allow you to filter down your options. As you type in this edit box, the list of check boxes is updated to reflect only those that match the query typed in this box.</p>
        <fieldset className='multiselect-options'>
          <legend className='visually-hidden'>Select {descriptionText}</legend>
          <ul className='multiselect-options-list'>
            {options.map((option, index) => {
              if (this.isOptionFiltered(option) && !showOnlySelectedOptions) {
                return null;
              }

              if (!showOnlySelectedOptions || (showOnlySelectedOptions && option.checked)) {
                return (
                  <li className='multiselect-options-list-item' key={index}>
                    <MultiselectOption
                      handleClick={() => {
                        return this.handleOptionSelection(option, index);
                      }}
                      option={option}
                    />
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </fieldset>
        {selectedOptions.length > 0
          ? (
            <button
              type='button'
              className='button-link-light multiselect-show-checked-toggle' onClick={this.handleShowOnlySelectedOptionsClick}
            >
              {showOnlySelectedOptions
                ? (
                  <span>Show all options</span>
                  )
                : (
                  <span>{`Show only selected options (${selectedOptions.length})`}</span>
                  )}
            </button>
            )
          : null}
      </div>
    );
  }
}

Multiselect.propTypes = {
  handleSelection: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    value: PropTypes.string,
    name: PropTypes.string
  })),
  filterGroupUid: PropTypes.string,
  descriptionText: PropTypes.string
};

const MultiselectOption = ({ option, handleClick }) => {
  return (
    <Checkbox
      isChecked={option.checked}
      label={option.name}
      handleClick={handleClick}
    />
  );
};

MultiselectOption.propTypes = {
  option: PropTypes.object,
  handleClick: PropTypes.func
};

export default Multiselect;
