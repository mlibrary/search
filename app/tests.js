/*
 *  Tests
 */

import { ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE, TOGGLE_DATASTORE, ACTIVATE, DEACTIVE } from './store/actions.js'
import { datastores } from './store/reducers.js'

import expect from 'expect'
import deepFreeze from 'deep-freeze'

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
      uid: 'another',
      name: 'Another',
      short_desc: 'This is another test',
      active: false
    }
  ]
  const stateAfter = [
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
