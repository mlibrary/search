const searchOptions = () => {
  return [
    {
      name: 'Keyword',
      uid: 'keyword',
      tip: 'Enter one or more keywords. Use quotes to search for a phrase (e.g., solar power; polar bears; “systems of oppression”). See tips about <a href="https://guides.lib.umich.edu/c.php?g=914690&p=6590011">Basic Keyword Searching</a>.',
      datastore: ['everything', 'mirlyn', 'databases', 'onlinejournals', 'website']
    },
    {
      name: 'Keyword (contains)',
      uid: 'keyword',
      tip: 'Enter one or more keywords to search broadly (e.g., Black Women Scientists). Use quotes to search for a specific phrase (e.g., “systems of oppression”). See tips about <a href="https://guides.lib.umich.edu/c.php?g=914690&p=6590011">Basic Keyword Searching</a>.',
      datastore: ['primo']
    },
    {
      name: 'Keyword (is exact)',
      uid: 'exact',
      tip: 'Enter an exact phrase to search (e.g., solar power). Use AND to separate concepts or phrases (e.g., Black Women Scientists AND Chanda Prescod). See tips about <a href="https://guides.lib.umich.edu/c.php?g=914690&p=6590011">Basic Keyword Searching</a>.',
      datastore: ['primo']
    },
    {
      name: 'Title',
      uid: 'title',
      tip: 'Enter the first words in an article title. Use quotes to search for a phrase (e.g., Culture as disability).',
      datastore: ['everything', 'mirlyn', 'primo', 'databases', 'onlinejournals', 'website']
    },
    {
      name: 'Title starts with',
      uid: 'title_starts_with',
      tip: 'Search for titles that begin with a word or phrase (e.g., introduction to chemistry; history of Mexico; Asian art).',
      datastore: ['mirlyn', 'databases', 'onlinejournals']
    },
    {
      name: 'Author',
      uid: 'author',
      tip: 'Search for items by author or contributor (e.g., Kimmerer, Robin Wall). Also search organizations or corporate authors (e.g., American Medical Association). Search for items by author using original scripts (e.g., 小川 洋子)',
      datastore: ['everything', 'mirlyn', 'primo']
    },
    {
      name: 'Journal/Serial Title',
      uid: 'journal_title',
      tip: 'Search the title of a journal or serial publication (e.g., Detroit Free Press; “journal of the american medical association”; African-American newspapers).',
      datastore: ['mirlyn']
    },
    {
      name: 'Subject',
      uid: 'subject',
      tip: 'Use words or phrases to search subjects (e.g., plant physiology, Baldwin, James).',
      datastore: ['mirlyn', 'primo', 'onlinejournals']
    },
    {
      name: 'LC Subject starts with',
      uid: 'lc_subject_starts_with',
      tip: 'Enter words or phrases to see subjects that start with them (e.g., Baldwin, James; sociology dictionaries).',
      datastore: ['mirlyn', 'primo', 'onlinejournals']
    },
    {
      name: 'Academic Discipline',
      uid: 'academic_discipline',
      tip: 'Search academic disciplines (e.g., International business; Latin american and caribbean studies). <a href="https://search.lib.umich.edu/databases/browse">Browse all Databases</a> alphabetically or by academic discipline.',
      datastore: ['databases', 'onlinejournals']
    },
    {
      name: 'Publisher',
      uid: 'publisher',
      tip: 'Search names of publishers of databases.',
      datastore: ['databases']
    },
    {
      name: 'Call Number starts with',
      uid: 'call_number_starts_with',
      tip: 'Search the first few letters and numbers of a call number (e.g., RC662.4 .H38 2016; QH 105). <a href="https://www.loc.gov/catdir/cpso/lcco/">Learn about the meaning of call numbers<span class="visually-hidden"> (link points to external site)</span></a>.',
      datastore: ['mirlyn', 'onlinejournals']
    },
    {
      name: 'Series title',
      uid: 'series',
      tip: "Search the series title of a group of thematically-related books. Use ‘title’ search to find unique titles within a series (e.g., Politics of Race and Ethnicity, Brill's Annotated Bibliographies, Oxford Choral Music).",
      datastore: ['mirlyn']
    },
    {
      name: 'Date',
      uid: 'publication_date',
      tip: 'Search by year (YYYY) (e.g., 2021; 1942).',
      datastore: ['primo']
    },
    {
      name: 'ISBN/ISSN/OCLC/etc',
      uid: 'isn',
      tip: 'Search by ISSN (8-digit code), ISBN (13 or 10-digit code), or OCLC number (e.g.,  0040-781X; 0747581088; 921446069).',
      datastore: ['mirlyn', 'onlinejournals']
    },
    {
      name: 'ISSN',
      uid: 'issn',
      tip: 'Search by ISSN (8-digit code) (e.g., 0040-781X).',
      datastore: ['primo']
    },
    {
      name: 'ISBN',
      uid: 'isbn',
      tip: 'Search by ISBN (13 or 10-digit code) (e.g., 0747581088).',
      datastore: ['primo']
    },
    {
      name: 'Browse by call number (LC and Dewey)',
      uid: 'browse_by_callnumber',
      tip: 'Browse by Library of Congress (LC) or Dewey call number, sorted alphanumerically (e.g., RC662.4 .H38 2016; QH 105, 880 J375re). <a href="https://www.loc.gov/catdir/cpso/lcco/">Learn about the meaning of call numbers<span class="visually-hidden"> (link points to external site)</span></a>.',
      selected: 'selected',
      datastore: ['mirlyn']
    },
    {
      name: 'Browse by author',
      uid: 'browse_by_author',
      tip: 'Browse an alphabetical list of authors. Authors can be people (put last names first), organizations, or events (e.g., Kingston, Maxine Hong; United Nations Development Programme; Pong, Chun-ho).',
      datastore: ['mirlyn']
    },
    {
      name: 'Browse by subject (coming soon)',
      uid: 'browse_by_subject',
      tip: 'Browse an A-Z list of subjects (e.g., motion pictures; history--United States; Eliot, George).',
      disabled: 'disabled',
      datastore: ['mirlyn']
    }
  ];
};

const searchOptionsDatastores = () => {
  const getAllSearchOptionsDatastores = searchOptions().map((searchOption) => {
    return searchOption.datastore;
  }).flat();
  const availableSearchOptionsDatastores = [...new Set(getAllSearchOptionsDatastores)];
  return availableSearchOptionsDatastores;
};

const filterOptions = (fields, browse = false) => {
  if (browse) {
    return fields.filter((field) => {
      return field.uid.includes('browse_by');
    });
  }
  return fields.filter((field) => {
    return !field.uid.includes('browse_by');
  });
};

export {
  searchOptions,
  searchOptionsDatastores,
  filterOptions
};
