import { rootReducer } from './reducers/reducers.js'
import { createStore } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

export const store = createStore(rootReducer)
export const history = syncHistoryWithStore(browserHistory, store)

store.subscribe(() => {
  console.log('%c store updated ', 'background: #126DC1; color: white;', store.getState())
})
