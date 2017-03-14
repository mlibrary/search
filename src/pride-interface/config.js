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
      preview: [
        'author',
        'format',
        'publish_date'
      ],
      medium: [
        'author',
        'format',
        'publish_date',
        'place_of_publication',
        'edition',
        'publisher'
      ],
      full: [
        'author',
        'format',
        'publish_date',
        'place_of_publication',
        'edition',
        'publisher'
      ],
      access: {
        fromHoldings: true,
        displayLoadingFeedback: true,
        type: [
          {
            uid: 'hathitrust',

          },
          {
            uid: 'physical',
            link: 'get_this_url',
            text: 'callnumber',
            source: 'location',
            status: 'status',
          },
          {
            uid: 'electronic',
            link: 'href',
            defaultAccessText: 'Go To Item'
          }
        ]
      },
    },
    {
      datastore: 'articlesplus',
      preview: [
        'publication_date',
        'publication_title',
        'author'
      ],
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
      full: [
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
        defaultAccessText: 'Go To Article',
        link: 'link'
      }
    },
    {
      datastore: 'databases',
      preview: [
        'brief_description',
        'access_icon',
      ],
      medium: [
        'brief_description',
        'database_type',
        'access_icon',
      ],
      full: [
        'brief_description',
        'database_type',
        'access_icon',
      ],
      access: {
        link: 'permalink',
        defaultAccessText: 'Go To Database',
      }
    },
    {
      datastore: 'journals',
      preview: [
        'holdings',
      ],
      medium: [
        'access_coverage',
        'issn',
        'access',
        'coverage',
        'academic_disciplines',
        'holdings',
      ],
      full: [
        'access_coverage',
        'issn',
        'access',
        'coverage',
        'academic_disciplines',
        'holdings',
      ],
      access: {
        defaultAccessText: 'Go To Online Journal',
        link: 'access_url'
      },
    },
    {
      datastore: 'website',
      preview: [
        'brief_description',
      ],
      medium: [
        'brief_description',
      ],
      full: [
        'brief_description',
      ],
      access: {
        defaultAccessText: 'Go To Webpage',
        link: 'access_url'
      }
    },
  ],
};

export default config;
