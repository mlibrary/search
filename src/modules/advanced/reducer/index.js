import * as actions from '../actions/';

const initialState = {
  booleanTypes: [],
}

/*
  Example State

  {
    mirlyn: {
      fields: [
        {
          uid: 'title'
        },
        {
          uid: 'author',
          name: 'a custom name overriding the given name'
        }
        // ...
      ],
      filters: [
        //... to be figured out..
      ]
    }
  }
*/

const advancedFieldReducer = (state, action) => {
  const dsUid = action.payload.datastoreUid
  let fields = []

  if (state[dsUid] && state[dsUid].fields) {
    fields = state[dsUid].fields
  }

  switch (action.type) {
    case actions.ADD_ADVANCED_FIELD:
      return {
        ...state,
        [dsUid]: {
          ...state[dsUid],
          fields: fields.concat(action.payload.field)
        }
      }
    default:
      return state
  }
}

const advancedFieldedSearchingReducer = (state, action) => {
  const dsUid = action.payload.datastoreUid

  switch (action.type) {
    case actions.ADD_ADVANCED_BOOLEAN_TYPES:
      return {
        ...state,
        booleanTypes: action.payload
      }
    case actions.ADD_FIELDED_SEARCH:
      const defaultFieldedSearch = {
        field: state[dsUid].fields[0].uid,
        query: '',
        booleanType: 0
      }

      if (state[dsUid].fieldedSearches) {
        return {
          ...state,
          [dsUid]: {
            ...state[dsUid],
            fieldedSearches: state[dsUid].fieldedSearches.concat(defaultFieldedSearch)
          }
        }
      } else {
        return {
          ...state,
          [dsUid]: {
            ...state[dsUid],
            fieldedSearches: [].concat(defaultFieldedSearch)
          }
        }
      }
    case actions.SET_FIELDED_SEARCH:
      return {
        ...state,
        [dsUid]: {
          ...state[dsUid],
          fieldedSearches: state[dsUid].fieldedSearches.map((item, index) => {
            if (index !== action.payload.fieldedSearchIndex) {
              return item
            }

            const { selectedFieldUid, query, booleanType } = action.payload

            let newQuery = state[dsUid].fieldedSearches[index].query
            if (typeof query === 'string') {
              newQuery = query
            }

            return {
              field: selectedFieldUid ? selectedFieldUid : state[dsUid].fieldedSearches[index].field,
              query: newQuery,
              booleanType: booleanType === undefined ? state[dsUid].fieldedSearches[index].booleanType : booleanType
            }
          })
        }
      }
    case actions.REMOVE_FIELDED_SEARCH:
      return {
        ...state,
        [dsUid]: {
          ...state[dsUid],
          fieldedSearches: state[dsUid].fieldedSearches.filter((item, index) => index !== action.payload.removeIndex)
        }
      }
    default:
      return state
  }
}

const advancedFilterReducer = (state, action) => {
  const dsUid = action.payload.datastoreUid

  switch (action.type) {
    case actions.ADD_ADVANCED_FILTER_GROUPS:
      return {
        ...state,
        [dsUid]: {
          ...state[dsUid],
          filters: action.payload.filterGroups
        }
      }
    default:
      return state
  }
}

const advancedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ADVANCED_FIELD:
      return advancedFieldReducer(state, action)
    case actions.ADD_ADVANCED_BOOLEAN_TYPES:
    case actions.ADD_FIELDED_SEARCH:
    case actions.REMOVE_FIELDED_SEARCH:
    case actions.SET_FIELDED_SEARCH:
      return advancedFieldedSearchingReducer(state, action)
    case actions.ADD_ADVANCED_FILTER_GROUPS:
    case actions.SET_ADVANCED_FILTER:
      return advancedFilterReducer(state, action)
    default:
      return state
  }
}

export default advancedReducer
