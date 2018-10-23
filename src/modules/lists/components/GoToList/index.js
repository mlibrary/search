import React, { Component } from 'react';
import {
  withRouter,
  Link
} from 'react-router-dom'
import ReactGA from 'react-ga'

class GoToList extends Component {
  render() {
    const {
      location,
      list,
      datastore
    } = this.props
    const hasItems = list && list.length > 0 ? true : false
    const listLength = list ? list.length : 0
    const cn = hasItems ? "lists-link-container" : "lists-link-container offpage"

    return (
      <React.Fragment>
        <section className={cn}>
          <Link
            to={`/${datastore.slug}/list${location.search}`}
            className="lists-link"
            onClick={() => {
              ReactGA.event({
                action: 'Click',
                category: 'My List',
                label: 'Access My List'
              })
            }}
          >
            <div className="list-info">
              <p className="lists-content">Go to <span className="underline">My Temporary {datastore.name} List</span> to email, text, and export citations.</p>
            </div>
            <p className="tag lists-count-tag"><b>{listLength}</b> in list</p>
          </Link>
        </section>
      </React.Fragment>
    )
  }
}

export default withRouter(GoToList);
