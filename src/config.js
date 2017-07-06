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
        'main_author',
        'publication_date'
      ],
      medium: [
        'format',
        'main_author',
        'publication_date',
        //'place_of_publication',
        //'edition',
        //'publisher'
      ],
      full: {
        standard: [
          'preferred_title',
          'new_title',
          'previous_title',
          'main_author',
          'contributors',
          'marc_published',
          'created',
          'distributed',
          'manufactured',
          'edition',
          'series',
          'series_statement',
          'summary'
        ],
        additional: [
          'uniform_title',
          'other_titles',
          'in_collection',
          'access',
          'performers',
          'date_place_of_event',
          'related_items',
          'full_previous_title',
          'full_new_title',
          'numbering',
          'source_of_description_note',
          'copy_specific_note',
          'biography_history',
          'references',
          'language_note',
          'copyright_status_information',
          'note',
          'copyright',
          'physical_description',
          'playing_time',
          'media_format',
          'audience',
          'awards',
          'production_credits',
          'bibliography',
          'isbn',
          'issn',
          'publisher_number',
          'report_number',
          'chronology',
          'place',
          'printer',
          'association',
          'marc_bookplate',
          'terms_of_use',
          'lcsh_subjects',
          'other_subjects',
          'table_of_contents'
        ]
      },
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
      full: {
        standard: [
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
          'academic_discipline',
          'language',
        ]
      },
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
      full: {
        standard: [
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
      },
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
      full: {
        standard: [
          'issn',
          'access',
          'academic_disciplines',
          'holdings',
          'alt_title',
        ]
      },
      access: {
        uid: 'links',
        fields: [
          {
            uid: 'href',
            label: 'Go to online journal',
            isLink: true,
          },
          {
            uid: 'text',
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
      full: {
        standard: [
          'format',
          'brief_description',
        ],
      },
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
  advanced: {
    datastores: [
      'everything',
      'mirlyn',
      'articlesplus',
      'databases',
      'journals',
      'website',
    ],
    defaultFields: [
      {
        uid: 'all_fields',
        name: 'All Fields'
      },
      {
        uid: 'title',
        name: 'Title'
      }
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
  ],
  formatIcons: [
    // Core
    {
      formats: ['Journal', 'Serial'],
      icon: 'book-multiple-variant'
    },
    {
      formats: ['Journal Article'],
      icon: 'file-document-box'
    },
    {
      formats: ['Book', 'Conference', 'Dictionaries', 'Directories', 'Encyclopedias', 'Biography'],
      icon: 'book-variant'
    },
    {
      formats: ['Newspaper'],
      icon: 'newspaper'
    },

    // Media
    {
      formats: ['Audio', 'Audio (music)', 'Audio CD', 'Audio LP', 'Audio (spoken word)'],
      icon: 'volume'
    },
    {
      formats: ['CDROM'],
      icon: 'disc'
    },
    {
      formats: ['Video (Blu-ray)', 'Video (DVD)', 'Video (VHS)'],
      icon: 'arrow-right-drop-circle'
    },
    {
      formats: ['Motion Picture'],
      icon: 'motion-picture'
    },
    {
      formats: ['Video Games'],
      icon: 'gamepad'
    },
    {
      formats: ['Software'],
      icon: 'xml'
    },
    {
      formats: ['Photographs & Pictorial Works'],
      icon: 'image-multiple'
    },

    // Data
    {
      formats: ['Database'],
      icon: 'database'
    },
    {
      formats: ['Data File'],
      icon: 'content-save'
    },
    {
      formats: ['Statistics'],
      icon: 'chart-line'
    },

    // Special
    {
      formats: ['Visual Material'],
      icon: 'eye'
    },
    {
      formats: ['Manuscript'],
      icon: 'script'
    },
    {
      formats: ['Music', 'Musical Score'],
      icon: 'music-note'
    },
    {
      formats: ['Microform'],
      icon: 'filmstrip'
    },
    {
      formats: ['Map', 'Maps-Atlas'],
      icon: 'map'
    },
    {
      formats: ['Archive'],
      icon: 'archive'
    },
    {
      formats: ['Mixed Material'],
      icon: 'shape-plus'
    },
    {
      formats: ['Library Website'],
      icon: 'website'
    },
    {
      formats: ['Unknown'],
      icon: 'unknown'
    },
  ]
};

export default config;
