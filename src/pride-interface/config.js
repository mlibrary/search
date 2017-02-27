const config = {
  spectrum: {
    production: 'https://earleyj-drupal8.www.lib.umich.edu/testapp/spectrum/',
    development: 'http://earleyj.www.lib.umich.edu/testapp/spectrum/',
  },
  datastores: {
    list: [
      {
        uid: 'mirlyn',
        name: 'Catalog',
        slug: 'catalog',
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
        name: 'Online Journals',
        slug: 'onlinejournals',
      },
      {
        uid: 'website',
        name: 'Library Website',
        slug: 'librarywebsite',
      },
      {
        uid: 'everything',
        name: 'Everything',
        datastores: [
          'mirlyn',
          'articlesplus',
          'journals',
          'databases',
          'website',
        ],
      }
    ],
    ordering: [
      'everything',
      'mirlyn',
      'articlesplus',
      'journals',
      'databases',
      'website',
    ],
    default: 'everything',
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
        textDefault: 'Go To Online Journal',
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
