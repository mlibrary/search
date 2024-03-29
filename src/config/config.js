const config = {
  spectrum: process.env.REACT_APP_SPECTRUM_BASE_URL || window.location.origin,
  datastores: {
    list: [
      {
        uid: 'mirlyn',
        name: 'Catalog',
        slug: 'catalog'
      },
      {
        uid: 'primo',
        name: 'Articles',
        slug: 'articles'
      },
      {
        uid: 'databases',
        name: 'Databases'
      },
      {
        uid: 'onlinejournals',
        name: 'Online Journals',
        slug: 'onlinejournals'
      },
      {
        uid: 'website',
        name: 'Guides and More',
        slug: 'guidesandmore'
      },
      {
        uid: 'everything',
        name: 'Everything',
        datastores: [
          'mirlyn',
          'primo',
          'databases',
          'onlinejournals',
          'website'
        ]
      }
    ],
    ordering: [
      'everything',
      'mirlyn',
      'primo',
      'onlinejournals',
      'databases',
      'website'
    ],
    default: 'everything'
  },
  sorts: {
    mirlyn: {
      sorts: [
        'relevance',
        'date_asc',
        'date_desc',
        'author_asc',
        'author_desc',
        'date_added',
        'title_asc',
        'title_desc'
      ]
    },
    primo: {
      sorts: [
        'relevance',
        'date_asc',
        'date_desc',
        'author',
        'title'
      ]
    },
    databases: {
      sorts: [
        'relevance',
        'title_asc',
        'title_desc'
      ]
    },
    onlinejournals: {
      sorts: [
        'relevance',
        'date_asc',
        'date_desc',
        'date_added',
        'title_asc',
        'title_desc'
      ]
    },
    website: {
      sorts: [
        'relevance',
        'title_asc',
        'title_desc',
        'date_asc',
        'date_desc'
      ]
    }
  },
  advancedBooleanTypes: ['AND', 'OR', 'NOT'],
  advanced: {
    everything: {
      forcedFields: [
        {
          uid: 'keyword',
          name: 'Keyword',
          force: true
        },
        {
          uid: 'title',
          name: 'Title',
          force: true
        },
        {
          uid: 'author',
          name: 'Author',
          force: true
        }
      ],
      fields: ['keyword', 'title', 'author'],
      defaultFields: ['keyword', 'title', 'author']
    },
    mirlyn: {
      fields: [
        'keyword',
        'title',
        'title_starts_with',
        'author',
        'journal_title',
        'subject',
        'lc_subject_starts_with',
        'academic_discipline',
        'call_number_starts_with',
        'publisher',
        'series',
        'publication_date',
        'isn'
      ],
      defaultFields: ['keyword', 'title', 'author'],
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
            default: 'checked'
          }
        },
        {
          uid: 'narrow_search',
          type: 'scope_down',
          name: 'Narrow Search To',
          defaults: [
            {
              uid: 'institution',
              value: 'All libraries'
            },
            {
              uid: 'location',
              value: 'All locations'
            },
            {
              uid: 'collection',
              value: 'All collections'
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
          type: 'multiple_select'
        },
        {
          uid: 'format',
          type: 'multiple_select'
        },
        {
          uid: 'place_of_publication_filter',
          type: 'multiple_select'
        }
      ]
    },
    primo: {
      fields: [
        'keyword',
        'contains',
        'exact',
        'title',
        'author',
        'publication_title',
        'subject',
        'publication_date',
        'issn',
        'isbn'
      ],
      defaultFields: ['keyword', 'title', 'author'],
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
          type: 'multiple_select'
        },
        {
          uid: 'format',
          type: 'multiple_select'
        }
      ]
    },
    databases: {
      fields: [
        'keyword',
        'title',
        'title_starts_with',
        'academic_discipline',
        'publisher'
      ],
      defaultFields: ['keyword', 'title_starts_with'],
      filters: [
        {
          uid: 'type',
          type: 'multiple_select'
        },
        {
          uid: 'academic_discipline',
          type: 'multiple_select'
        },
        {
          uid: 'access_type',
          type: 'multiple_select'
        }
      ]
    },
    onlinejournals: {
      fields: [
        'keyword',
        'title',
        'title_starts_with',
        'subject',
        'lc_subject_starts_with',
        'academic_discipline',
        'call_number_starts_with',
        'isn'
      ],
      filters: [
        {
          uid: 'subject',
          type: 'multiple_select'
        },
        {
          uid: 'language',
          type: 'multiple_select'
        },
        {
          uid: 'place_of_publication_filter',
          type: 'multiple_select'
        },
        {
          uid: 'academic_discipline',
          type: 'multiple_select'
        }
      ],
      defaultFields: ['keyword', 'title', 'subject']
    },
    website: {
      fields: ['keyword', 'title'],
      defaultFields: ['keyword']
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
  ]
};

export default config;
