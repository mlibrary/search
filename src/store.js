import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { SET_A11Y_MESSAGE } from './modules/a11y/actions';
import { advancedReducer } from './modules/advanced';
import { affiliationReducer } from './modules/affiliation';
import { browseReducer } from './modules/browse';
import { datastoresReducer } from './modules/datastores';
import { filtersReducer } from './modules/filters';
import { institutionReducer } from './modules/institution';
import { profileReducer } from './modules/profile';
import { recordsReducer } from './modules/records';
import { listsReducer } from './modules/lists'; // Cannot list higher than recordsReducer. `TypeError: Cannot read properties of undefined (reading 'default')`
import history from './history';
import { searchReducer } from './modules/search';
import { ADD_SPECIALISTS } from './modules/specialists/actions';

const simpleReducer = (initialState, actionType) => {
  return (state = initialState, action) => {
    return action.type === actionType ? action.payload : state;
  };
};

const store = configureStore({
  reducer: {
    a11y: simpleReducer({ message: '' }, SET_A11Y_MESSAGE),
    affiliation: affiliationReducer,
    advanced: advancedReducer,
    browse: browseReducer,
    datastores: datastoresReducer,
    filters: filtersReducer,
    institution: institutionReducer,
    lists: listsReducer,
    profile: profileReducer,
    records: recordsReducer,
    router: connectRouter(history),
    search: searchReducer,
    specialists: simpleReducer([], ADD_SPECIALISTS)
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(routerMiddleware(history));
  }
});

export default store;
