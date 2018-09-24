import React from 'react'
import Button from '../Button'
import numeral from 'numeral'
import './Pagination.css'
import { Link } from 'react-router-dom'

class Pagination extends React.Component {
  state = {
    page: this.props.page
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const page = parseInt(this.state.page)
    const {
      total,
      onPageChange
    } = this.props

    if (Number.isInteger(page) && page > 0 && page <= total) {
      onPageChange(page)
    }
  }

  handleInputChange = (e) => {
    this.setState({ page: e.target.value })
  }

  render() {
    const {
      page
    } = this.state
    const {
      toPreviousPage,
      toNextPage,
      total
    } = this.props

    return (
      <div className="pagination-container x-spacing">
        {toPreviousPage && (<Link to={toPreviousPage} className="underline">Previous page</Link>)}
        <form className="pagination-input-container" onSubmit={this.handleSubmit}>
          <span>Page</span>
          <input
            className="pagination-input"
            value={page}
            type="number"
            // reset the value if the user leaves focus
            onBlur={() => this.setState({ page: this.props.page })}
            onChange={this.handleInputChange}
          />
          <span>of {numeral(total).format(0,0)} pages</span>
        </form>
        {toNextPage && (<Link to={toNextPage} className="underline">Next page</Link>)}
      </div>
    )
  }
}

export default Pagination