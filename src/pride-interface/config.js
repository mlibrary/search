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
        'format',
        'author',
        'publication_date'
      ],
      medium: [
        'format',
        'author',
        'publication_date',
        'place_of_publication',
        'edition',
        'publisher'
      ],
      full: [
        'format',
        'author',
        'publication_date',
        'place_of_publication',
        'edition',
        'publisher',
        'summary',
        'extended_summary'
      ],
      holdings: [
        {
          uid: 'hathitrust',
          link: 'handle_url',
          status: 'status',
          defaultAccessText: 'Full Text Online',
          heading: 'HathiTrust Digital Library',
          label: 'HathiTrust',
          source: 'source',
          description: 'description',
        },
        {
          uid: 'circulating',
          link: 'get_this_url',
          status: 'status',
          location: 'location',
          callnumber: 'callnumber',
          defaultAccessText: 'Request This Item',
          heading: 'Physical Holdings',
          map: 'info_link',
          coverage: 'enum',
        },
        {
          uid: 'online',
          link: 'href',
          defaultAccessText: 'Available Online',
          heading: 'Online Holdings',
          label: 'Online'
        },
        {
          uid: 'media',
          link: 'get_this_url',
          location: 'location',
          status: 'status',
          defaultAccessText: 'Request This Media Item',
          callnumber: 'callnumber',
          heading: 'Media Holdings',
          map: 'info_link',
          coverage: 'enum',
        },
        {
          uid: 'special',
          link: 'get_this_url',
          location: 'location',
          status: 'status',
          callnumber: 'callnumber',
          heading: 'Special Holdings',
          defaultAccessText: 'Request This Special Item',
          map: 'info_link',
          coverage: 'enum',
        }
      ]
    },
    {
      datastore: 'articlesplus',
      preview: [
        'format',
        'publication_date',
        'publication_title',
        'author',
      ],
      medium: [
        'format',
        'publication_date',
        'abstract',
        'volume',
        'issue',
        'publication_title',
        'author',
        'start_page',
        'end_page',
        'genre',
        'snippet',
        'isi_cited',
        'scopus_cited'
      ],
      full: [
        'format',
        'publication_date',
        'abstract',
        'volume',
        'issue',
        'publication_title',
        'author',
        'start_page',
        'end_page',
        'genre',
        'snippet',
        'isi_cited',
        'scopus_cited',
        'publisher',
        'issn',
        'eissn',
        'isbn',
        'eisbn',
        'doi',
        'subject',
        'language',
      ],
      access: {
        defaultAccessText: 'Go To Article',
        link: 'access_url'
      },
    },
    {
      datastore: 'databases',
      defaultFields: [
        {
          uid: 'format',
          name: 'Format',
          value: 'Database',
        }
      ],
      preview: [
        'format',
        'brief_description',
        'coverage',
      ],
      medium: [
        'format',
        'brief_description',
        'database_type',
        'new',
        'trial',
        'outage',
        'coverage'
      ],
      full: [
        'format',
        'full_description',
        'brief_description',
        'database_type',
        'access_icon',
        'new',
        'trial',
        'outage',
        'alt_title',
        'type',
        'coverage',
        'mobile_available',
        'subject',
        'mobile_url',
        'help',
        'platform'
      ],
      access: {
        link: 'permalink',
        defaultAccessText: 'Go To Database',
      }
    },
    {
      datastore: 'journals',
      defaultFields: [
        {
          uid: 'format',
          name: 'Format',
          value: 'Online Journal'
        }
      ],
      preview: [
        'format',
        'holdings',
      ],
      medium: [
        'format',
        'issn',
        'academic_disciplines',
        'holdings',
      ],
      full: [
        'format',
        'issn',
        'access',
        'academic_disciplines',
        'holdings',
        'alt_title',
      ],
      access: {
        uid: 'links',
        fields: [
          {
            uid: '856u',
            label: 'Go To Online Journal',
            isLink: true,
          },
          {
            uid: '856z',
            label: 'Coverage',
          }
        ]
      },
    },
    {
      datastore: 'website',
      defaultFields: [
        {
          uid: 'format',
          name: 'Format',
          value: 'Library Website'
        }
      ],
      preview: [
        'format',
        'brief_description',
      ],
      medium: [
        'format',
        'brief_description',
      ],
      full: [
        'format',
        'brief_description',
      ],
      access: {
        defaultAccessText: 'Go To Webpage',
        link: 'access_url'
      }
    },
  ],
  filters: {
    'mirlyn': [
      {
        uid: 'subject',
        open: true,
      },
      {
        uid: 'academic_discipline',
        open: true,
      },
      {
        uid: 'format',
        open: true,
      },
      {
        uid: 'language',
        open: true,
      },
      {
        uid: 'available_online',
      },
      {
        uid: 'date_of_publication'
      },
      {
        uid: 'place_of_publication'
      },
      {
        uid: 'region'
      },
      {
        uid: 'location'
      },
      {
        uid: 'author'
      },
      {
        uid: 'search_only',
        type: 'checkbox',
        defaults: [
          {
            group: 'search_only',
            value: 'false'
          }
        ]
      }
    ],
    'articlesplus': [
      {
        uid: 'subject',
        open: true,
      },
      {
        uid: 'format',
        open: true,
      },
      {
        uid: 'language',
        open: true,
      },
      {
        uid: 'fulltext'
      },
      {
        uid: 'holdings_only',
        defaults: [
          {
            group: 'holdings_only',
            value: 'true'
          }
        ]
      }
    ],
    'databases': [
      {
        uid: 'database_type',
        open: true,
      },
      {
        uid: 'academic_discipline',
        open: true,
      },
      {
        uid: 'new',
        open: true,
      },
    ],
    'website': [
      {
        uid: 'author',
        open: true,
      },
      {
        uid: 'academic_discipline',
        open: true,
      },
    ]
  },
  holdingRewrites: [
    {
      match: {
        uid: 'status',
        value: 'Search only (no full text)'
      },
      replace: [
        {
          uid: 'linkText',
          value: 'Search for keyword frequency'
        },
        {
          uid: 'linkStyle',
          value: 'link'
        }
      ]
    }
  ]
};

export default config;
