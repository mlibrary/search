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
        'publish_date'
      ],
      medium: [
        'format',
        'author',
        'publish_date',
        'place_of_publication',
        'edition',
        'publisher'
      ],
      full: [
        'format',
        'author',
        'publish_date',
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
          source: 'source'
        },
        {
          uid: 'circulating',
          link: 'get_this_url',
          status: 'status',
          location: 'location',
          callnumber: 'callnumber',
          defaultAccessText: 'Request This Item',
          heading: 'Physical Holdings',
        },
        {
          uid: 'online',
          link: 'href',
          defaultAccessText: 'Available Online',
          heading: 'Electronic Resources',
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
        },
        {
          uid: 'special',
          link: 'get_this_url',
          location: 'location',
          status: 'status',
          callnumber: 'callnumber',
          heading: 'Special Holdings',
          defaultAccessText: 'Request This Special Item',
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
        'format',
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
        'access_icon',
      ],
      medium: [
        'format',
        'brief_description',
        'database_type',
        'access_icon',
        'new',
        'trial',
        'outage'
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
        'access_coverage',
        'issn',
        'coverage',
        'academic_disciplines',
        'holdings',
      ],
      full: [
        'format',
        'access_coverage',
        'issn',
        'access',
        'coverage',
        'academic_disciplines',
        'holdings',
        'alt_title',
      ],
      access: {
        defaultAccessText: 'Go To Online Journal',
        link: 'access_url',
        status: 'coverage',
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
  ]
};

export default config;
