import * as actions from '../actions';
import { _ } from 'underscore';

const recordReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_RECORD:
      return action.payload.data;
    default:
      return state;
  }
};

const holdingsReducer = (state = undefined, action) => {
  switch (action.type) {
    case actions.ADD_HOLDINGS:
      return _.reduce(['electronic', 'physical'], (memo, holding_type) => {
        if (action.payload.holdings_data[holding_type]) {
          memo = {
            ...memo,
            [holding_type]: _.reduce(action.payload.holdings_data[holding_type], (holdings, holding) => {

              if (holding_type === 'physical') {
                holdings = [
                  ...holdings,
                  {
                    location: holding.location || undefined,
                    status: holding.status || undefined,
                    callnumber: holding.callnumber || undefined,
                    info_Link: holding.info_link || undefined,
                  }
                ]
              } else if (holding_type === 'electronic') {
                const text = _.findWhere(holding.value, { uid: '856z' })
                const href = _.findWhere(holding.value, { uid: '856u' })

                console.log('electronic holding', holding, text, href)

                if (text && href) {
                  holdings = [
                    ...holdings,
                    {
                      text: text.value[0],
                      href: href.value[0],
                    }
                  ]
                }
              }

              return holdings
            }, [])
          }
        }
        return memo;
      }, {});
    default:
      return state;
  }
};


const recordsInitialState = {
  loading: false,
  records: [],
  record: null,
  pagination: {},
};

const recordsReducer = (state = recordsInitialState, action) => {
  switch (action.type) {
    case actions.ADD_RECORD:

      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.datastore]: {
            ...state.records[action.payload.datastore],
            [action.payload.id]: recordReducer(undefined, action)
          }
        }
      }
    case actions.ADD_HOLDINGS:
      if (!state.records[action.payload.datastore_uid] || !state.records[action.payload.datastore_uid][action.payload.record_id]) {
        return state;
      }

      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.datastore_uid]: {
            ...state.records[action.payload.datastore_uid],
            [action.payload.record_id]: {
              ...state.records[action.payload.datastore_uid][action.payload.record_id],
              holdings: holdingsReducer(undefined, action)
            }
          }
        }
      }
    case actions.CLEAR_RECORDS:
      return {
        ...state,
        records: {
          ...state.records,
          [action.payload]: undefined,
        }
      }
    case actions.CLEAR_RECORD:
      return Object.assign({}, state, {
        record: null,
      });
    case actions.SET_RECORD:
      return Object.assign({}, state, {
        record: action.payload,
      });
    case actions.LOADING_RECORDS:
      return Object.assign({}, state, {
        loading: action.payload,
      });
    default:
      return state;
  }
};

export default recordsReducer;
