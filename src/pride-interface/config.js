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
      preview: ['author', 'format', 'publish_date'],
      medium: ['author', 'format', 'publish_date', 'place_of_publication', 'edition', 'publisher'],
      access: {
        from_holdings: true,
        loading_feedback: true,
        text: 'callnumber',
        source: 'location',
        status: 'status',
        link: 'get_this_url'
      },
    },
    {
      datastore: 'articlesplus',
      preview: ['publication_date', 'publication_title', 'author'],
      medium: [
        'publication_date',
        'abstract',
        'volume',
        'issue',
        'publication_title',
        'author',
        'start_page',
        'end_page',
        'format',
        'genre',
        'snippet',
        'isi_cited',
        'scopus_cited'
      ],
      access: {
        text_default: 'Available Online',
        link: 'link'
      }
    },

    {
      datastore: 'journals',
      medium: ['access_coverage', 'issn', 'academic_discipline', 'holdings'],
      access: {
        text_default: 'Go To Online Journal',
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
