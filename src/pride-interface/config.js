const config = {
  datastores: {
    naming: [
      {
        uid: 'mirlyn',
        name: 'Catalog',
        slug: 'catalog', // optional url replacement instead of uid
      },
      {
        uid: 'articlesplus',
        name: 'Articles+',
      },
      {
        uid: 'databases',
        name: 'Databases',
      },
      {
        uid: 'journals',
        slug: 'onlinejournals',
        name: 'Online Journals',
      },
      {
        uid: 'website',
        name: 'Library Website',
        slug: 'librarywebsite'
      },
    ],
    multi_source: [
      {
        uid: 'quick-search',
        name: 'Quick Search',
        datastores: [
          'mirlyn',
          'articlesplus',
          'journals',
          'databases',
        ],
      },
    ],
    ordering: [
      'quick-search',
      'mirlyn',
      'articlesplus',
      'journals',
      'databases',
      'website',
    ],
    default: 'mirlyn',
  },
  fields: [
    {
      datastore: 'mirlyn',
      medium: ['author', 'format', 'publish_date'],
      access: {
        text: 'callnumber',
        source: 'location'
      }
    },
    {
      datastore: 'website'
    },
    {
      datastore: 'articlesplus',
      medium: ['holdings_url', 'volume', 'issue', 'link', 'doi'],
    },
    {
      datastore: 'databases',
      medium: ['holdings_url', 'brief_description', 'academic_discipline', 'database_type'],
    },
    {
      datastore: 'journals',
      medium: ['access_coverage', 'issn', 'academic_discipline', 'holdings'],
    },
  ],
};

export default config;
