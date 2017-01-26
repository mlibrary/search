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
        name: 'ArticlesPlus',
      },
      {
        uid: 'databases',
        name: 'Databases',
      },
      {
        uid: 'journals',
        name: 'Journals',
      },
      {
        uid: 'website',
        name: 'Website',
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
    },
    {
      datastore: 'website',
      medium: ['author', 'brief'],
    },
    {
      datastore: 'articlesplus',
      medium: ['type', 'publication', 'abstract'],
    },
    {
      datastore: 'databases',
      medium: ['brief_description', 'academic_discipline', 'database_type'],
    },
    {
      datastore: 'journals',
      medium: ['access_coverage', 'issn', 'academic_discipline', 'access_type', 'holdings'],
    },
  ],
};

export default config;
