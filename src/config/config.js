const spectrum = process.env.REACT_APP_SPECTRUM_BASE_URL
  ? process.env.REACT_APP_SPECTRUM_BASE_URL
  : window.location.origin

const loginUrl = process.env.REACT_APP_LOGIN_BASE_URL
  ? process.env.REACT_APP_LOGIN_BASE_URL + '/login'
  : window.location.origin + '/login'

const config = {
  spectrum,
  loginUrl,
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
        slug: 'articles'
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
        'edition'
      ],
      medium: [
        'format',
        'main_author',
        'published_brief',
        //'place_of_publication',
        'edition',
        //'publisher'
      ],
      full: {
        standard: [
          'preferred_title',
          'uniform_title',
          'other_titles',
          'full_new_title',
          'full_previous_title',
          'main_author',
          'published_brief',
          'contributors',
          'created',
          'distributed',
          'manufactured',
          'edition',
          'series',
          'series_statement',
          'summary',
          'in_collection',
          'access',
          'language',
          'language_note',
          'performers',
          'date_place_of_event',
          'related_items',
          'numbering',
          'source_of_description_note',
          'copy_specific_note',
          'biography_history',
          'references',
          'copyright_status_information',
          'note',
          'arrangement',
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
          'academic_discipline',
          'table_of_contents',
          'bookplate'
        ],
      },
      searches: [
        /*
        {
          uid: 'field_uid',
          search: 'search_uid', // what fielded or filter uid do you want to search one
          type: 'fielded' // or filter
        }
        */
        {
          uid: 'main_author',
          search: 'author',
          type: 'filter' // or 'fielded'
        },
        {
          uid: 'contributors',
          search: 'author',
          type: 'filter' // or 'fielded'
        },
        {
          uid: 'academic_discipline',
          search: 'academic_discipline',
          type: 'filter'
        },
        {
          uid: 'other_subjects',
          search: 'subject',
          type: 'filter'
        },
        {
          uid: 'lcsh_subjects',
          search: 'subject',
          type: 'filter'
        },
        {
          uid: 'full_previous_title',
          search: 'title',
          type: 'fielded'
        },
        {
          uid: 'other_titles',
          search: 'title',
          type: 'fielded'
        },
        {
          uid: 'new_title',
          search: 'title',
          type: 'fielded'
        },
        {
          uid: 'full_new_title',
          search: 'title',
          type: 'fielded'
        }
      ]
    },
    {
      datastore: 'articlesplus',
      medium: [
        'format',
        'author',
        'publication_date',
        'published_brief',
        'page_range',
        'snippet',
        'times_cited',
      ],
      full: {
        standard: [
          'author',
          'publication_date',
          'published_brief',
          'page_range',
          'genre',
          'issn',
          'eissn',
          'isbn',
          'eisbn',
          'doi',
          'language',
          'subject',
          'times_cited'
        ],
        description: 'abstract'
      },
      searches: [
        {
          uid: 'author',
          search: 'author',
          type: 'fielded'
        },
        {
          uid: 'subject',
          search: 'subject',
          type: 'filter'
        },
      ]
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
      medium: [
        'format',
        'type',
        'brief_description',
        'permalink',
        'new',
        'trial',
        'outage',
        'coverage'
      ],
      full: {
        standard: [
          'type',
          'access_type',
          'new',
          'trial',
          'permalink',
          'outage',
          'alt_title',
          'coverage',
          'mobile_available',
          'mobile_url',
          'subject',
          'more_information',
          'platform',
          'academic_discipline'
        ],
        description: 'description',
      },
      searches: [
        {
          uid: 'academic_discipline',
          search: 'academic_discipline',
          type: 'filter'
        }
      ],
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
      medium: [
        'format',
        'issn',
        'academic_discipline',
        'holdings',
      ],
      full: {
        standard: [
          'issn',
          'academic_discipline',
          'holdings',
          'alt_title',
        ]
      },
      searches: [
        {
          uid: 'academic_discipline',
          search: 'academic_discipline',
          type: 'filter'
        }
      ],
    },
    {
      datastore: 'website',
      medium: [
        'page_type',
        'brief_description',
        'section_title',
        'section_description',
        'author',
        'academic_discipline',
        'name',
        'email',
        'picture',
        'department',
        'phone',
        'office'
      ]
    },
  ],
  filters: {
    'mirlyn': [
      {
        uid: 'available_online',
        type: 'checkbox',
        name: 'Available online',
        checkedCondition: 'true',
        onClickValue: 'true',
      },
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
        uid: 'availability',
      },
      {
        uid: 'date_of_publication'
      },
      {
        uid: 'place_of_publication_filter'
      },
      {
        uid: 'region'
      },
      {
        uid: 'building'
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
        uid: 'exclude_newspapers',
        type: 'checkbox',
        name: 'Exclude newspaper articles',
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
        uid: 'publication_date',
        open: true,
      },
      {
        uid: 'format',
        open: true,
      },
      {
        uid: 'subject',
        open: true,
      },
      {
        uid: 'language',
      },
      {
        uid: 'fulltext'
      }
    ],
    'databases': [
      {
        uid: 'academic_discipline',
        open: true,
      },
      {
        uid: 'access_type',
        open: true,
      },
      {
        uid: 'type',
        open: true,
      },
    ],
    'journals': [
      {
        uid: 'academic_discipline',
        open: true,
      }
    ],
    'website': [
      {
        uid: 'page_type',
        open: true,
      },
    ]
  },
  sorts: {
    'mirlyn': {
      default: 'relevance',
      sorts: [
        'relevance',
        'date_asc',
        'date_desc',
        'author_asc',
        'author_desc',
        'date_added'
      ]
    },
    'articlesplus': {
      default: 'relevance',
      sorts: [
        'relevance',
        'date_asc',
        'date_desc'
      ]
    },
    'databases': {
      default: 'relevance',
      sorts: [
        'relevance',
        'title_asc',
        'title_desc',
      ]
    },
    'journals': {
      default: 'relevance',
      sorts: [
        'relevance',
        'title_asc',
        'title_desc',
      ]
    },
    'website': {
      default: 'relevance',
      sorts: [
        'relevance',
        'title_asc',
        'title_desc',
        'date_asc',
        'date_desc'
      ]
    }
  },
  advancedBooleanTypes: [
    'AND',
    'OR',
    'NOT'
  ],
  advanced: {
    'everything': {
      forcedFields: [
        {
          uid: 'all_fields',
          name: 'All Fields',
          force: true,
        },
        {
          uid: 'title',
          name: 'Title',
          force: true,
        },
        {
          uid: 'author',
          name: 'Author',
          force: true,
        }
      ],
      fields: [
        'all_fields',
        'title',
        'author'
      ],
      defaultFields: [
        'all_fields',
        'title',
        'author'
      ]
    },
    'mirlyn': {
      fields: [
        'all_fields',
        'title',
        'title_starts_with',
        'author',
        'journal_title',
        'subject',
        'academic_discipline',
        'call_number_starts_with',
        'publisher',
        'series',
        'publication_date',
        'isn',
        'toc'
      ],
      defaultFields: [
        'all_fields',
        'title',
        'author'
      ],
      filters: [
        {
          uid: 'available_online',
          type: 'checkbox',
          groupBy: 'Access Options',
          conditions: {
            checked: true,
            unchecked: undefined
          }
        },
        {
          uid: 'search_only',
          name: 'Remove Search Only HathiTrust Materials',
          groupBy: 'Access Options',
          type: 'checkbox',
          conditions: {
            checked: undefined,
            unchecked: false,
            default: 'checked',
          }
        },
        {
          uid: 'narrow_search',
          type: 'scope_down',
          name: 'Narrow Search To',
          defaults: [
            {
              uid: 'institution',
              value: 'All libraries',
            },
            {
              uid: 'location',
              value: 'All locations',
            },
            {
              uid: 'collection',
              value: 'All collections',
            }
          ]
        },
        {
          uid: 'date_of_publication',
          type: 'date_range_input'
        },
        {
          uid: 'academic_discipline',
          type: 'multiple_select'
        },
        {
          uid: 'language',
          type: 'multiple_select',
        },
        {
          uid: 'format',
          type: 'multiple_select',
        },
        {
          uid: 'place_of_publication_filter',
          type: 'multiple_select',
        }
      ]
    },
    'articlesplus': {
      fields: [
        'all_fields',
        'title',
        'author',
        'publication_title',
        'subject',
        'series',
        'publication_date',
        'isn'
      ],
      defaultFields: [
        'all_fields',
        'title',
        'author'
      ],
      filters: [
        {
          uid: 'available_online',
          name: 'Limit to articles available online',
          type: 'checkbox',
          groupBy: 'Access Options',
          conditions: {
            checked: true,
            unchecked: undefined
          }
        },
        {
          uid: 'is_scholarly',
          name: 'Limit to articles from scholarly journals',
          groupBy: 'Access Options',
          type: 'checkbox',
          conditions: {
            checked: true,
            unchecked: undefined
          }
        },
        {
          uid: 'holdings_only',
          name: "Add results beyond the library's holdings",
          groupBy: 'Access Options',
          type: 'checkbox',
          conditions: {
            checked: false,
            unchecked: undefined
          }
        },
        {
          uid: 'exclude_newspapers',
          name: 'Exclude newspaper holdings',
          groupBy: 'Access Options',
          type: 'checkbox',
          conditions: {
            checked: true,
            unchecked: undefined
          }
        },
        {
          uid: 'publication_date',
          type: 'date_range_input'
        },
        {
          uid: 'language',
          type: 'multiple_select',
        },
        {
          uid: 'format',
          type: 'multiple_select',
        }
      ]
    },
    'databases': {
      fields: [
        'all_fields',
        'title',
        'title_starts_with',
        'academic_discipline',
        'publisher',
      ],
      defaultFields: [
        'all_fields',
        'title_starts_with'
      ],
      filters: [
        {
          uid: 'type',
          type: 'multiple_select',
        },
        {
          uid: 'academic_discipline',
          type: 'multiple_select',
        },
        {
          uid: 'access_type',
          type: 'multiple_select',
        }
      ]
    },
    'journals': {
      fields: [
        'all_fields',
        'title',
        'title_starts_with',
        'subject',
        'academic_discipline',
        'call_number_starts_with',
        'isn'
      ],
      filters: [
        {
          uid: 'academic_discipline',
          type: 'multiple_select',
        }
      ],
      defaultFields: [
        'all_fields',
        'title',
        'isn'
      ]
    },
    'website': {
      fields: [
        'all_fields',
        'title',
      ],
      defaultFields: [
        'all_fields'
      ],
    }
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
    {
      icon: 'book-variant', // book
      formats: ["Biography", "Book", "eBook", "Book Chapter", "Conference", "Dictionaries", "Directories", "Encyclopedias"]
    },
    {
      icon: 'book-multiple-variant', // collections-bookmark
      formats: ['Magazine', 'Journal', 'eJournal', 'Online Journal', 'Publication', 'Research Guide', 'Research Guides', 'Research Publication', 'Serial']
    },
    {
      icon: 'calendar-multiple-check',
      formats: ['Exhibits and Events']
    },
    {
      icon: 'document', // file-document-box
      formats: ["Album", "Article", "Book Review", "Blog Post", "Case", "Catalog", "Conference Proceeding", "Course Reading", "Dissertation", "Exam", "Journal Article", "Magazine Article", "Manuscript", "Market Research", "Newspaper Article", "Pamphlet", "Paper", "Patent", "Personal Article", "Personal Narrative", "Poem", "Publication Article", "Reference", "Report", "Standard", "Student Thesis", "Technical Report", "Tool", "Trade Publication Article", "Transcript", "Blogs and Blog Posts"]
    },
    {
      icon: 'newspaper',
      formats: ['Newsletter', 'Newspaper'],
    },
    {
      icon: 'volume', // column-high
      formats: ["Audio", "Audio CD", "Audio LP", "Audio (music)", "Audio (spoken word)", "Audio Recording", "Music Recording", "Sound Recording", "Spoken Word Recording", "Streaming Audio"]
    },
    {
      icon: 'disc',
      formats: ['CDROM', 'Compact Disk', 'DVD']
    },
    {
      icon: 'arrow-right-drop-circle', // play-circle
      formats: ["Streaming Video", "Video (Blu-ray)", "Video (DVD)", "Video (VHS)", "Video Recording"],
    },
    {
      icon: 'motion-picture',
      formats: ["Motion Picture"]
    },
    {
      icon: 'image', //photo
      formats: ["Art", "Drawing", "Graphic Arts", "Image", "Mixed", "Painting", "Photograph", "Postcard", "Poster", "Presentation", "Slide"]
    },
    {
      icon: 'image-multiple', // photo-library
      formats: ["Photographs & Pictorial Works"],
    },
    {
      icon: 'eye', // remove red eye
      formats: ['Visual Material']
    },
    {
      icon: 'music-note',
      formats: ["Music", "Music Manuscript", "Music Score", "Musical Score", "Play", "Sheet Music"]
    },
    {
      icon: 'gamepad',
      formats: ['Video Games']
    },
    {
      formats: ['Software'],
      icon: 'xml'
    },
    {
      icon: 'gesture-double-tap',
      formats: ["Interactive Media", "Learning Object"]
    },
    {
      icon: 'website',
      formats: ["Web Resource", "Electronic Resource", "Website"]
    },
    {
      icon: 'database',
      formats: ["Database", "Data Set"]
    },
    {
      icon: 'content-save', // save
      formats: ['Data File']
    },
    {
      icon: 'chart-line',
      formats: ['Statistics']
    },
    {
      icon: 'archive',
      formats: ["Archive", "Archival Material", "Artifact", "Clothing", "Finding Aid", "Furnishing", "Model", "Special Collection", "Realia"]
    },
    {
      icon: 'shape-plus',
      formats: ['Mixed Material']
    },
    {
      icon: 'filmstrip',
      formats: ['Microform']
    },
    {
      icon: 'script',
      formats: ['Manuscript']
    },

    // Special
    {
      formats: ['Manuscript'],
      icon: 'script'
    },
    {
      formats: ['Microform'],
      icon: 'filmstrip'
    },
    {
      icon: 'map',
      formats: ['Map', 'Maps-Atlas']
    },
    {
      icon: 'account', // person
      formats: ['People', 'Staff Directory / People']
    },
    {
      formats: ['Unknown'],
      icon: 'unknown'
    },
  ]
};

export default config;