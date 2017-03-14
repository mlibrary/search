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
      return _.reduce(['electronic', 'physical'], (memo, holdingType) => {
        if (action.payload.holdingsData[holdingType]) {
          memo = {
            ...memo,
            [holdingType]: _.reduce(action.payload.holdingsData[holdingType], (holdings, holding) => {

              if (holdingType === 'physical') {
                let link = undefined;

                if (holding.item_info && holding.item_info[0] && holding.item_info[0]['get_this_url'] ) {
                  link = holding.item_info[0]['get_this_url']
                }

                holdings = [
                  ...holdings,
                  {
                    location: holding.location || undefined,
                    status: holding.status || undefined,
                    callnumber: holding.callnumber || undefined,
                    infoLink: holding.info_link || undefined,
                    link: link
                  }
                ]
              } else if (holdingType === 'electronic') {
                const text = _.findWhere(holding.value, { uid: '856z' })
                const href = _.findWhere(holding.value, { uid: '856u' })

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
  pagination: {}
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
      if (!state.records[action.payload.datastoreUid] || !state.records[action.payload.datastoreUid][action.payload.recordId]) {
        return state;
      }

      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.datastoreUid]: {
            ...state.records[action.payload.datastoreUid],
            [action.payload.recordId]: {
              ...state.records[action.payload.datastoreUid][action.payload.recordId],
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
    case actions.LOADING_HOLDINGS:
      if (!state.records[action.payload.datastoreUid] || !state.records[action.payload.datastoreUid][action.payload.recordId]) {
        return state;
      }

      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.datastoreUid]: {
            ...state.records[action.payload.datastoreUid],
            [action.payload.recordId]: {
              ...state.records[action.payload.datastoreUid][action.payload.recordId],
              loadingHoldings: action.payload.loading
            }
          }
        }
      }
    default:
      return state;
  }
};

export default recordsReducer;
