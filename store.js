/*
 *  Action Types
 */

const ADD_DATASTORE = 'ADD_DATASTORE'
const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE'
const CHANGE_ACTIVE_DATASTORE = 'CHANGE_ACTIVE_DATASTORE'

function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload}
}

function fetchDatastores() {
  return []
}

/*
 *  Reducers
 */

const datastore = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return {
          uid: action.payload.uid,
          name: action.payload.name,
          short_desc: action.payload.short_desc,
          active: false
        }
    case CHANGE_ACTIVE_DATASTORE:
      return Object.assign({}, state, {
        active: true
      })
    default:
      return state
  }
}

const datastores = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return [
        ...state,
        datastore(undefined, action)
      ]
    case CHANGE_ACTIVE_DATASTORE:
      return state.map(ds => {
        if (ds.uid !== action.uid) {
          return ds
        }

        return datastore(ds, action)
      })
    default:
      return state
  }
}

const datastoreReducers = Redux.combineReducers({
  datastores
})

/*
 *  Tests
 */

const testAddDatastore = () => {
  const stateBefore = []
  const action = {
    type: ADD_DATASTORE,
    payload: {
      uid: 'test-datastore',
      name: 'Test Datastore',
      short_desc: 'This is a test'
    }
  }
  const stateAfter = [
    {
      uid: 'test-datastore',
      name: 'Test Datastore',
      short_desc: 'This is a test',
      active: false
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    datastores(stateBefore, action)
  ).toEqual(stateAfter)
}

const testChangeActiveDatastore = () => {
  const stateBefore = [
    {
      uid: 'datastore-foo',
      name: 'Datastore Foo',
      short_desc: 'Foo and pilots found here',
      active: false
    },
    {
      uid: 'another',
      name: 'Another',
      short_desc: 'This is another test',
      active: false
    }
  ]
  const stateAfter = [
    {
      uid: 'datastore-foo',
      name: 'Datastore Foo',
      short_desc: 'Foo and pilots found here',
      active: false
    },
    {
      uid: 'another',
      name: 'Another',
      short_desc: 'This is another test',
      active: true
    }
  ]

  const action = {
    type: CHANGE_ACTIVE_DATASTORE,
    uid: 'another'
  }

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    datastores(stateBefore, action)
  ).toEqual(stateAfter)
}


testAddDatastore();
testChangeActiveDatastore();
console.log('All tests passed.')

window.store = Redux.createStore(datastoreReducers)

store.subscribe(function() {
  console.log('State changed!', store.getState())
})

console.log('store', store.getState())
