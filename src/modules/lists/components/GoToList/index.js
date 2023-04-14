import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class GoToList extends Component {
  render () {
    const {
      location,
      list,
      datastore
    } = this.props;
    const hasItems = !!(list && list.length > 0);
    const listLength = list ? list.length : 0;
    const cn = hasItems ? 'lists-link-container' : 'lists-link-container offpage';

    return (
      <>
        <section className={cn}>
          <Link
            to={`/${datastore.slug}/list${location.search}`}
            className='lists-link'
          >
            <div className='list-info'>
              <p className='lists-content'>Go to <span className='underline'>My Temporary {datastore.name} List</span> to email, text, and export citations.</p>
            </div>
            <p className='lists-count-tag'><b>{listLength}</b> in list</p>
          </Link>
        </section>
      </>
    );
  }
}

export default GoToList;
