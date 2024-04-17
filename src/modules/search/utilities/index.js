import qs from 'qs';

const searchOptions = () => {
  return [
    {
      name: 'Keyword',
      uid: 'keyword',
      datastore: ['everything', 'mirlyn', 'databases', 'onlinejournals', 'website']
    },
    {
      name: 'Keyword (contains)',
      uid: 'keyword',
      datastore: ['primo']
    },
    {
      name: 'Keyword (is exact)',
      uid: 'exact',
      datastore: ['primo']
    },
    {
      name: 'Title',
      uid: 'title',
      datastore: ['everything', 'mirlyn', 'primo', 'databases', 'onlinejournals', 'website']
    },
    {
      name: 'Title starts with',
      uid: 'title_starts_with',
      datastore: ['mirlyn', 'databases', 'onlinejournals']
    },
    {
      name: 'Author',
      uid: 'author',
      datastore: ['everything', 'mirlyn', 'primo']
    },
    {
      name: 'Journal/Serial Title',
      uid: 'journal_title',
      datastore: ['mirlyn']
    },
    {
      name: 'Subject',
      uid: 'subject',
      datastore: ['mirlyn', 'primo', 'onlinejournals']
    },
    {
      name: 'LC Subject starts with',
      uid: 'lc_subject_starts_with',
      datastore: ['mirlyn', 'onlinejournals']
    },
    {
      name: 'Academic Discipline',
      uid: 'academic_discipline',
      datastore: ['databases', 'onlinejournals']
    },
    {
      name: 'Publisher',
      uid: 'publisher',
      datastore: ['databases']
    },
    {
      name: 'Call Number starts with',
      uid: 'call_number_starts_with',
      datastore: ['mirlyn', 'onlinejournals']
    },
    {
      name: 'Series (transcribed)',
      uid: 'series',
      datastore: ['mirlyn']
    },
    {
      name: 'Date',
      uid: 'publication_date',
      datastore: ['primo']
    },
    {
      name: 'ISBN/ISSN/OCLC/etc',
      uid: 'isn',
      datastore: ['mirlyn', 'onlinejournals']
    },
    {
      name: 'ISSN',
      uid: 'issn',
      datastore: ['primo']
    },
    {
      name: 'ISBN',
      uid: 'isbn',
      datastore: ['primo']
    },
    {
      name: 'Browse by call number (LC and Dewey)',
      uid: 'browse_by_callnumber',
      selected: 'selected',
      datastore: ['mirlyn']
    },
    {
      name: 'Browse by author',
      uid: 'browse_by_author',
      datastore: ['mirlyn']
    },
    {
      name: 'Browse by subject',
      uid: 'browse_by_subject',
      datastore: ['mirlyn']
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

const stringifySearch = ({ query, page, ...rest }) => {
  return qs.stringify({
    query: query || undefined,
    page: page > 1 ? page : undefined,
    ...rest
  }, {
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    allowDots: true,
    format: 'RFC1738'
  });
};

export {
  searchOptions,
  searchOptionsDatastores,
  filterOptions,
  getSearchStateFromURL,
  stringifySearch
};
