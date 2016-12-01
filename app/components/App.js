import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/actions.js'
import { Main } from './'

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
    active_datastore: state.active_datastore,
    records: state.records
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export const App = connect(mapStateToProps, mapDispatchToProps)(Main)
