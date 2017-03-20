import Filters from './components/Filters';
import filtersReducer from './reducer';

import {
  addFilter,
  clearFilters,
  setActiveFilters,
  clearActiveFilters,
} from './actions';

export {
  Filters,
  filtersReducer,
  clearFilters,
  clearActiveFilters,
  addFilter,
  setActiveFilters
}
