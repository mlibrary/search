import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { stringifySearchQueryForURL } from '../../../pride';
import PropTypes from 'prop-types';

const InstitutionWrapper = ({ children }) => {
  const history = useHistory();
  const params = useParams();
  const {
    activeFilters,
    datastore,
    institution,
    search
  } = useSelector((state) => {
    return {
      activeFilters: state.filters.active,
      datastore: state.datastores.active,
      institution: state.institution,
      search: state.search
    };
  });

  useEffect(() => {
    if (datastore === 'mirlyn' && !institution.active) {
      const queryString = stringifySearchQueryForURL({
        query: search.query,
        filter: activeFilters[datastore.uid],
        page: search.page[datastore.uid] === 1 ? undefined : search.page[datastore.uid],
        sort: search.sort[datastore.uid],
        library: datastore.uid === 'mirlyn' ? institution.active : institution.defaultInstitution
      });

      history.push(`/${params.datastoreSlug}?${queryString}`);
    }
  }, [history, params.datastoreSlug, datastore, institution, search, activeFilters]);

  return children;
};

InstitutionWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default InstitutionWrapper;
