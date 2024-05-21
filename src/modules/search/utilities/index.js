import qs from 'qs';

const searchOptions = () => {
  return [
    {
      datastore: ['everything', 'mirlyn', 'databases', 'onlinejournals', 'website'],
      name: 'Keyword',
      uid: 'keyword'
    },
    {
      datastore: ['primo'],
      name: 'Keyword (contains)',
      uid: 'keyword'
    },
    {
      datastore: ['primo'],
      name: 'Keyword (is exact)',
      uid: 'exact'
    },
    {
      datastore: ['everything', 'mirlyn', 'primo', 'databases', 'onlinejournals', 'website'],
      name: 'Title',
      uid: 'title'
    },
    {
      datastore: ['mirlyn', 'databases', 'onlinejournals'],
      name: 'Title starts with',
      uid: 'title_starts_with'
    },
    {
      datastore: ['everything', 'mirlyn', 'primo'],
      name: 'Author',
      uid: 'author'
    },
    {
      datastore: ['mirlyn'],
      name: 'Journal/Serial Title',
      uid: 'journal_title'
    },
    {
      datastore: ['mirlyn', 'primo', 'onlinejournals'],
      name: 'Subject',
      uid: 'subject'
    },
    {
      datastore: ['mirlyn', 'onlinejournals'],
      name: 'LC Subject starts with',
      uid: 'lc_subject_starts_with'
    },
    {
      datastore: ['databases', 'onlinejournals'],
      name: 'Academic Discipline',
      uid: 'academic_discipline'
    },
    {
      datastore: ['databases'],
      name: 'Publisher',
      uid: 'publisher'
    },
    {
      datastore: ['mirlyn', 'onlinejournals'],
      name: 'Call Number starts with',
      uid: 'call_number_starts_with'
    },
    {
      datastore: ['mirlyn'],
      name: 'Series (transcribed)',
      uid: 'series'
    },
    {
      datastore: ['primo'],
      name: 'Date',
      uid: 'publication_date'
    },
    {
      datastore: ['mirlyn', 'onlinejournals'],
      name: 'ISBN/ISSN/OCLC/etc',
      uid: 'isn'
    },
    {
      datastore: ['primo'],
      name: 'ISSN',
      uid: 'issn'
    },
    {
      datastore: ['primo'],
      name: 'ISBN',
      uid: 'isbn'
    },
    {
      datastore: ['mirlyn'],
      name: 'Browse by call number (LC and Dewey)',
      selected: 'selected',
      uid: 'browse_by_callnumber'
    },
    {
      datastore: ['mirlyn'],
      name: 'Browse by author',
      uid: 'browse_by_author'
    },
    {
      datastore: ['mirlyn'],
      name: 'Browse by subject',
      uid: 'browse_by_subject'
    }
  ];
};

const searchOptionsDatastores = () => {
  const getAllSearchOptionsDatastores = searchOptions().map((searchOption) => {
    return searchOption.datastore;
  }).flat();
  return [...new Set(getAllSearchOptionsDatastores)];
};

const filterOptions = (fields, browse = false) => {
  return fields.filter((field) => {
    return browse === field.uid.includes('browse_by');
  });
};

const getSearchStateFromURL = (location = document.location.search) => {
  return qs.parse(location?.substring(1), { allowDots: true });
};

const stringifySearch = ({ library, page, query, ...rest }) => {
  return qs.stringify({
    ...query && { query },
    ...library && { library },
    ...rest,
    ...page > 1 && { page }
  }, {
    allowDots: true,
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    format: 'RFC1738'
  });
};

export {
  filterOptions,
  getSearchStateFromURL,
  searchOptions,
  searchOptionsDatastores,
  stringifySearch
};
