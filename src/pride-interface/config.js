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
        name: 'Articles',
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
          'databases',
          'journals',
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
        'author',
        'publication_date',
        'place_of_publication',
        'edition',
        'publisher',
        'summary',
        'extended_summary',
      ],
      holdings: [
        {
          uid: 'online',
          link: 'href',
          defaultAccessText: 'Available online',
          heading: 'Online resources',
          label: 'Online',
          showAllName: 'online resources'
        },
        {
          uid: 'hathitrust',
          link: 'handle_url',
          defaultAccessText: 'Full text online',
          heading: 'HathiTrust Digital Library',
          label: 'HathiTrust',
          source: 'source',
          description: 'description',
          showAllName: 'HathiTrust sources'
        },
        {
          uid: 'circulating',
          link: 'get_this_url',
          status: 'status',
          location: 'location',
          callnumber: 'callnumber',
          defaultAccessText: 'Request this item',
          heading: 'Physical Holdings',
          map: 'info_link',
          coverage: 'enum',
          showAllName: 'physical holdings',
        },
        {
          uid: 'media',
          link: 'get_this_url',
          location: 'location',
          status: 'status',
          defaultAccessText: 'Request this media item',
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
          defaultAccessText: 'Request this special item',
          map: 'info_link',
          coverage: 'enum',
        },
        {
          uid: 'other',
          link: 'get_this_url',
          location: 'location',
          status: 'status',
          heading: 'Holdings (Other)',
          defaultAccessText: 'Request this item',
          map: 'info_link',
          showAllName: 'holdings'
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
        defaultAccessText: 'Go to item',
        link: 'access_url'
      },
    },
    {
      datastore: 'databases',
      defaultFields: [
        {
          uid: 'format',
          name: 'Format',
          value: ['Database'],
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
        defaultAccessText: 'Go to database',
      }
    },
    {
      datastore: 'journals',
      defaultFields: [
        {
          uid: 'format',
          name: 'Format',
          value: ['Online Journal']
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
            label: 'Go to online journal',
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
          value: ['Library Website']
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
        defaultAccessText: 'Go to webpage',
        link: 'access_url'
      }
    },
  ],
  filters: {
    'mirlyn': [
      {
        uid: 'search_only',
        type: 'checkbox',
        name: 'Remove search only HathiTrust materials',
        checkedCondition: 'true',
        defaultValueOnSpectrum: 'true',
        onClickValue: 'false',
      },
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
    ],
    'articlesplus': [
      {
        uid: 'is_scholarly',
        type: 'checkbox',
        name: 'Articles from scholarly journals only',
        checkedCondition: 'true',
        onClickValue: 'true',
      },
      {
        uid: 'available_online',
        type: 'checkbox',
        name: 'Available Online',
        checkedCondition: 'true',
        onClickValue: 'true',
      },
      {
        uid: 'holdings_only',
        type: 'checkbox',
        name: 'U-M library materials only',
        checkedCondition: 'true',
        defaultValueOnSpectrum: 'true',
        onClickValue: 'false',
      },
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
          value: 'Search keyword frequency'
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
