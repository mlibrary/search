import * as actions from '../actions/';

const initialState = {}

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
  switch (action.type) {
    case actions.ADD_ADVANCED_FIELD:
      return state.concat(action.payload.field)
    default:
      return state
  }
}

const advancedFilterReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_ADVANCED_FILTER:
      return state.concat(action.payload.filter)
    default:
      return state
  }
}

const advancedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ADVANCED_FIELD:
      const dsUid = action.payload.datastoreUid
      const fieldsState = state[dsUid] ? state[dsUid].fields : []
      const filtersState = state[dsUid] ? state[dsUid].filters : []

      return {
        ...state,
        [dsUid]: {
          fields: advancedFieldReducer(fieldsState, action),
          filters: advancedFilterReducer(filtersState, action),
        }
      }
    case actions.REMOVE_ADVANCED_FIELD:
      console.log('REMOVE_ADVANCED_FIELD')
      return state
    case actions.SET_ADVANCED_FIELD:
      console.log('SET_ADVANCED_FIELD')
      return state
    case actions.ADD_ADVANCED_FILTER:
      console.log('ADD_ADVANCED_FILTER')
      return state
    case actions.SET_ADVANCED_FILTER:
      console.log('SET_ADVANCED_FILTER')
      return state
    default:
      return state
  }
}

export default advancedReducer
