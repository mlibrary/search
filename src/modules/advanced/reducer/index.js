import * as actions from '../actions/';

const initialState = {
  booleanTypes: []
};

/*
 *Example State
 *
 *{
 *  mirlyn: {
 *    fields: [
 *      {
 *        uid: 'title'
 *      },
 *      {
 *        uid: 'author',
 *        name: 'a custom name overriding the given name'
 *      }
 *      // ...
 *    ],
 *    filters: [
 *      //... to be figured out..
 *    ]
 *  }
 *}
 */

const advancedFieldReducer = (state, action) => {
  const dsUid = action.payload.datastoreUid;
  const fields = state[dsUid]?.fields || [];

  switch (action.type) {
    case actions.ADD_ADVANCED_FIELD:
      return {
        ...state,
        [dsUid]: {
          ...state[dsUid],
          fields: fields.concat(action.payload.field)
        }
      };
    default:
      return state;
  }
};

const advancedFieldedSearchingReducer = (state, action) => {
  const dsUid = action.payload.datastoreUid;

  if (action.type === actions.ADD_ADVANCED_BOOLEAN_TYPES) {
    return {
      ...state,
      booleanTypes: action.payload
    };
  }

  if (action.type === actions.ADD_FIELDED_SEARCH) {
    const newFieldedSearch = {
      booleanType: 0,
      field: action.payload.field,
      query: ''
    };

    return {
      ...state,
      [dsUid]: {
        ...state[dsUid],
        fieldedSearches: state[dsUid].fieldedSearches ? state[dsUid].fieldedSearches.concat(newFieldedSearch) : [].concat(newFieldedSearch)
      }
    };
  }

  if (action.type === actions.SET_FIELDED_SEARCH) {
    return {
      ...state,
      [dsUid]: {
        ...state[dsUid],
        fieldedSearches: state[dsUid].fieldedSearches.map((item, index) => {
          if (index !== action.payload.fieldedSearchIndex) {
            return item;
          }

          const { selectedFieldUid, query, booleanType } = action.payload;

          let newQuery = state[dsUid].fieldedSearches[index].query;
          if (typeof query === 'string') {
            newQuery = query;
          }

          return {
            booleanType: typeof booleanType === 'number' && booleanType < state.booleanTypes.length ? booleanType : state[dsUid].fieldedSearches[index].booleanType,
            field: selectedFieldUid || state[dsUid].fieldedSearches[index].field,
            query: newQuery
          };
        })
      }
    };
  }

  if (action.type === actions.REMOVE_FIELDED_SEARCH) {
    return {
      ...state,
      [dsUid]: {
        ...state[dsUid],
        fieldedSearches: state[dsUid].fieldedSearches.filter((item, index) => {
          return index !== action.payload.removeIndex;
        })
      }
    };
  }

  return state;
};

const filterGroupReducer = ({ filterGroup, filterValue, onlyOneFilterValue }) => {
  if (!filterValue) {
    return null;
  }

  // Add filter group if no active filters
  if (!filterGroup || onlyOneFilterValue) {
    return [filterValue];
  }

  if (filterGroup.includes(filterValue)) {
    // Remove filter value
    const newFilters = filterGroup.filter((item) => {
      return item !== filterValue;
    });

    return newFilters.length === 0 ? null : newFilters;
  }

  // Add filter value to existing filter group list
  return [...filterGroup, filterValue];
};

const advancedFilterReducer = (state, action) => {
  const dsUid = action.payload.datastoreUid;
  const { filterGroupUid, filterValue } = action.payload;

  switch (action.type) {
    case actions.ADD_ADVANCED_FILTER_GROUPS:
      return {
        ...state,
        [dsUid]: {
          ...state[dsUid],
          filters: action.payload.filterGroups
        }
      };
    case actions.SET_ADVANCED_FILTER:
      return {
        ...state,
        [dsUid]: {
          ...state[dsUid],
          activeFilters: {
            ...state[dsUid].activeFilters,
            [filterGroupUid]: filterGroupReducer({
              filterGroup: state[dsUid].activeFilters?.[filterGroupUid],
              filterValue,
              onlyOneFilterValue: action.payload.onlyOneFilterValue
            })
          }
        }
      };
    default:
      return state;
  }
};

const advancedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ADVANCED_FIELD:
      return advancedFieldReducer(state, action);
    case actions.ADD_ADVANCED_BOOLEAN_TYPES:
    case actions.ADD_FIELDED_SEARCH:
    case actions.REMOVE_FIELDED_SEARCH:
    case actions.SET_FIELDED_SEARCH:
      return advancedFieldedSearchingReducer(state, action);
    case actions.ADD_ADVANCED_FILTER_GROUPS:
    case actions.SET_ADVANCED_FILTER:
      return advancedFilterReducer(state, action);
    default:
      return state;
  }
};

export default advancedReducer;
