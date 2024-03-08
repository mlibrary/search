import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestRecord, requestGetThis } from '../../../pride';
import { GetThisOptionList, GetThisRecord } from '../../../getthis';
import { Alert, Breadcrumb, H1 } from '../../../reusable';
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
        <H1 className='heading-xlarge'>Get This</H1>
        {(() => {
          if (record?.fields?.length === 0 && record?.names?.length === 0) {
            return (
              <section className='container__rounded page'>
                <Alert type='error'>
                  <span className='strong'>Error:</span> Unable to find this record.
                </Alert>
              </section>
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
