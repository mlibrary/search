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
