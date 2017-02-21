const config = {
  spectrum: {
    production: 'https://earleyj-drupal8.www.lib.umich.edu/testapp/spectrum/',
    development: 'http://earleyj.www.lib.umich.edu/testapp/spectrum/',
  },
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
      datastore: 'articlesplus',
      medium: ['volume', 'issue', 'doi'],
      access: {
        textDefault: 'Available Online',
        link: 'link'
      }
    },

    {
      datastore: 'journals',
      medium: ['access_coverage', 'issn', 'academic_discipline', 'holdings'],
      access: {
        textDefault: 'Go To Journal',
        link: 'access_url'
      },
    },
    {
      datastore: 'website'
    },
    {
      datastore: 'databases',
      medium: ['brief_description', 'academic_discipline', 'database_type'],
    },
  ],
};

export default config;
