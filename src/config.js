const config = {
  advanced: {
    databases: {
      defaultFields: ['keyword', 'title_starts_with'],
      fields: [
        'keyword',
        'title',
        'title_starts_with',
        'academic_discipline',
        'publisher'
      ],
      filters: [
        {
          type: 'multiple_select',
          uid: 'type'
        },
        {
          type: 'multiple_select',
          uid: 'academic_discipline'
        },
        {
          type: 'multiple_select',
          uid: 'access_type'
        }
      ]
    },
    everything: {
      defaultFields: ['keyword', 'title', 'author'],
      fields: ['keyword', 'title', 'author'],
      forcedFields: [
        {
          force: true,
          name: 'Keyword',
          uid: 'keyword'
        },
        {
          force: true,
          name: 'Title',
          uid: 'title'
        },
        {
          force: true,
          name: 'Author',
          uid: 'author'
        }
      ]
    },
    mirlyn: {
      defaultFields: ['keyword', 'title', 'author'],
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
      filters: [
        {
          conditions: {
            checked: true,
            unchecked: undefined
          },
          groupBy: 'Access Options',
          name: 'View HathiTrust search-only materials',
          type: 'checkbox',
          uid: 'search_only'
        },
        {
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
          ],
          name: 'Narrow Search To',
          type: 'scope_down',
          uid: 'narrow_search'
        },
        {
          type: 'date_range_input',
          uid: 'date_of_publication'
        },
        {
          type: 'multiple_select',
          uid: 'academic_discipline'
        },
        {
          type: 'multiple_select',
          uid: 'language'
        },
        {
          type: 'multiple_select',
          uid: 'format'
        },
        {
          type: 'multiple_select',
          uid: 'place_of_publication_filter'
        }
      ]
    },
    onlinejournals: {
      defaultFields: ['keyword', 'title', 'subject'],
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
          type: 'multiple_select',
          uid: 'subject'
        },
        {
          type: 'multiple_select',
          uid: 'language'
        },
        {
          type: 'multiple_select',
          uid: 'place_of_publication_filter'
        },
        {
          type: 'multiple_select',
          uid: 'academic_discipline'
        }
      ]
    },
    primo: {
      defaultFields: ['keyword', 'title', 'author'],
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
      filters: [
        {
          conditions: {
            checked: true
          },
          groupBy: 'Access Options',
          name: 'Limit to articles available online',
          type: 'checkbox',
          uid: 'available_online'
        },
        {
          conditions: {
            checked: true
          },
          groupBy: 'Access Options',
          name: 'Limit to articles from scholarly journals',
          type: 'checkbox',
          uid: 'is_scholarly'
        },
        {
          conditions: {
            checked: false
          },
          groupBy: 'Access Options',
          name: 'Add results beyond the library\'s holdings',
          type: 'checkbox',
          uid: 'holdings_only'
        },
        {
          conditions: {
            checked: true
          },
          groupBy: 'Access Options',
          name: 'Exclude newspaper holdings',
          type: 'checkbox',
          uid: 'exclude_newspapers'
        },
        {
          type: 'date_range_input',
          uid: 'publication_date'
        },
        {
          type: 'multiple_select',
          uid: 'language'
        },
        {
          type: 'multiple_select',
          uid: 'format'
        }
      ]
    },
    website: {
      defaultFields: ['keyword'],
      fields: ['keyword', 'title']
    }
  },
  advancedBooleanTypes: ['AND', 'OR', 'NOT'],
  datastores: {
    default: 'everything',
    list: [
      {
        datastores: [
          'mirlyn',
          'primo',
          'databases',
          'onlinejournals',
          'website'
        ],
        name: 'Everything',
        slug: 'everything',
        uid: 'everything'
      },
      {
        name: 'Catalog',
        slug: 'catalog',
        uid: 'mirlyn'
      },
      {
        name: 'Articles',
        slug: 'articles',
        uid: 'primo'
      },
      {
        name: 'Online Journals',
        slug: 'onlinejournals',
        uid: 'onlinejournals'
      },
      {
        name: 'Databases',
        slug: 'databases',
        uid: 'databases'
      },
      {
        name: 'Guides and More',
        slug: 'guidesandmore',
        uid: 'website'
      }
    ],
    ordering: [
      'everything',
      'mirlyn',
      'primo',
      'onlinejournals',
      'databases',
      'website'
    ]
  },
  sorts: {
    databases: {
      sorts: [
        'relevance',
        'title_asc',
        'title_desc'
      ]
    },
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
    primo: {
      sorts: [
        'relevance',
        'date_asc',
        'date_desc',
        'author',
        'title'
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
  spectrum: process.env.REACT_APP_SPECTRUM_BASE_URL || window.location.origin
};

export default config;
