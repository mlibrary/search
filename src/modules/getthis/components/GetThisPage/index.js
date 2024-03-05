import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestRecord, requestGetThis } from '../../../pride';
import { GetThisOptionList, GetThisRecord } from '../../../getthis';
import { Breadcrumb } from '../../../reusable';
import PropTypes from 'prop-types';

class GetThisPage extends React.Component {
  componentDidMount () {
    const { recordUid, barcode } = this.props.match.params;
    const { datastoreUid } = this.props;

    requestRecord({
      recordUid,
      datastoreUid
    });

    requestGetThis({
      datastoreUid,
      recordUid,
      barcode
    });
  }

  render () {
    const { record } = this.props;
    const { barcode, recordUid } = this.props.match.params;

    return (
      <article className='container container-narrow'>
        <div className='u-margin-top-1'>
          <Breadcrumb
            items={[
              { text: 'Catalog', to: `/catalog${document.location.search}` },
              { text: 'Record', to: `/catalog/record/${recordUid}${document.location.search}` },
              { text: 'Get This' }
            ]}
          />
        </div>
        <section>
          <h1 className='heading-xlarge' id='maincontent' tabIndex='-1'>Get This</h1>
        </section>
        {(() => {
          if (record?.fields?.length === 0 && record?.names?.length === 0) {
            return (
              <div className='alert'>
                <p><span className='strong'>Error:</span> Unable to find this record.</p>
              </div>
            );
          }

          return (
            <>
              <GetThisRecord barcode={barcode} />
              <GetThisOptionList record={record} />
            </>
          );
        })()}
      </article>
    );
  }
}

GetThisPage.propTypes = {
  match: PropTypes.object,
  datastoreUid: PropTypes.string,
  record: PropTypes.object
};

function mapStateToProps (state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active
  };
}

export default withRouter(connect(mapStateToProps)(GetThisPage));
