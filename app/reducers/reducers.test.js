import { addDatastore, changeActiveDatastore, submitSearch, addRecord } from './actions.js'
import { datastoresReducer, activeDatastoreReducer, searchReducer, recordsReducer } from './reducers.js'

describe('datastoresReducer', () => {
  it('should handle addDatastore ', () => {
    expect(
      datastoresReducer([], addDatastore({
        uid: 'some-datastore-uid',
        name: 'Some Datastore'
      }))
    ).toEqual([
      {
        uid: 'some-datastore-uid',
        name: 'Some Datastore'
      }
    ])
  })

  it('should handle submitSearch', () => {
    expect(
      activeDatastoreReducer('', changeActiveDatastore('some-datastore-uid'))
    ).toEqual('some-datastore-uid')
  })

  it('should handle changeActiveDatastore', () => {
    expect(
      searchReducer('', submitSearch('Some search'))
    ).toEqual('Some search')
  })

  it('should handle addRecord', () => {
    expect(
      recordsReducer(undefined, addRecord({ /* partial record view data */ }))
    ).toEqual([
      {"partial": { /* partial record view data */ }}
    ])
  })
})
