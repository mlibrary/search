import React from 'react';
import './Pagination.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  state = {
    page: this.props.page
  };

  componentDidUpdate (prevProps) {
    if (prevProps.toNextPage !== this.props.toNextPage) {
      this.setState({ page: this.props.page });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(this.state.page, 10);
    const {
      total,
      watchPageChange
    } = this.props;

    if (Number.isInteger(page) && page > 0 && page <= total) {
      watchPageChange(page);
    }
  };

  handleInputChange = (e) => {
    this.setState({ page: e.target.value });
  };

  render () {
    const { page } = this.state;
    const {
      toPreviousPage,
      toNextPage,
      total,
      ariaLabel
    } = this.props;

    const totalConverted = total?.toLocaleString();

    return (
      <nav className='pagination-container x-spacing' aria-label={ariaLabel}>
        <div className='pagination-previous-container'>
          {toPreviousPage && (
            <Link to={toPreviousPage}>
              Previous page
            </Link>
          )}
        </div>
        <form className='pagination-input-container' onSubmit={this.handleSubmit}>
          <span>Page</span>
          <input
            className='pagination-input'
            value={page}
            type='number'
            aria-label={`Page ${page} of ${totalConverted} pages`}
            // reset the value if the user leaves focus
            onBlur={() => {
              return this.setState({ page: this.props.page });
            }}
            onChange={this.handleInputChange}
          />
          <span>of {totalConverted}</span>
        </form>
        <div className='pagination-next-container'>
          {toNextPage && (
            <Link to={toNextPage}>
              Next page
            </Link>
          )}
        </div>
      </nav>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  total: PropTypes.number,
  watchPageChange: PropTypes.func,
  toPreviousPage: PropTypes.string,
  toNextPage: PropTypes.string,
  ariaLabel: PropTypes.string
};

export default Pagination;
