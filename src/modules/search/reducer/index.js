import * as actions from '../actions/';

const initialState = {
  searching: false,
  query: "",
  data: null,
  advanced: {
    booleanTypes: ['AND', 'OR', 'NOT']
  },
  page: {},
  sort: {}
}

const setAdvancedFields = ({ advanced, payload }) => {
  const {
    advancedFieldIndex,
    selectedFieldUid,
    query,
    booleanType
  } = payload
  
  if (typeof advancedFieldIndex === 'number') {
    const updatedAdvancedFields = advanced.advancedFields.map((item, i) => {
      if (i === advancedFieldIndex) {
        if (typeof query === 'string') {
          return {
            ...item,
            query,
          }
        }

        if (selectedFieldUid) {
          return {
            ...item,
            selectedFieldUid,
          }
        }

        if (typeof booleanType === 'number') {
          return {
            ...item,
            booleanType
          }
        }
      } else {
        return item
      }
    })

    return updatedAdvancedFields
  }

  // Default, no change.
  return advanced.advancedFields
}

const getInitialAdvancedFields = ({ advanced, fields }) => {
  if (advanced && advanced.advancedFields) {
    return advanced.advancedFields
  } else {
    return [
      {
        selectedFieldUid: fields[0].uid,
        query: ''
      },
      {
        selectedFieldUid: fields[0].uid,
        query: '',
        booleanType: 0
      }
    ]
  }
}

const searchReducer = function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SEARCH_QUERY:
      return Object.assign({}, state, {
        query: action.payload,
      });
    case actions.SEARCHING:
      return Object.assign({}, state, {
        searching: action.payload,
      });
    case actions.SET_SEARCH_DATA:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          [action.payload.datastoreUid]: action.payload.data
        },
      });
    case actions.SET_PAGE:
      return Object.assign({}, state, {
        page: {
          ...state.page,
          [action.payload.datastoreUid]: action.payload.page
        },
      });
    case actions.CLEAR_SEARCH:
      return initialState;
    case actions.SET_SORT:
      return {
        ...state,
        sort: {
          ...state.sort,
          [action.payload.datastoreUid]: action.payload.sort
        }
      }
    case actions.ADD_ADVANCED_DATASTORE:
      // A datastore can only be advanced if it has fields
      if (!action.payload.fields || action.payload.fields === 0 ) {
        return state
      }

      return Object.assign({}, state, {
        advanced: {
          ...state.advanced,
          [action.payload.datastoreUid]: {
            ...state.advanced[action.payload.datastoreUid],
            fields: action.payload.fields,
            filters: action.payload.filters,
            advancedFields: getInitialAdvancedFields({
              advanced: state.advanced[action.payload.datastoreUid],
              fields: action.payload.fields
            })
          }
        },
      })
    case actions.SET_ADVANCED_FIELD:
      return {
        ...state,
        advanced: {
          ...state.advanced,
          [action.payload.datastoreUid]: {
            ...state.advanced[action.payload.datastoreUid],
            advancedFields: setAdvancedFields({
              advanced: state.advanced[action.payload.datastoreUid],
              payload: action.payload
            })
          }
        }
      }
    case actions.REMOVE_ADVANCED_FIELD:
    default:
      return state;
  }
}

export default searchReducer
