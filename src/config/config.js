const spectrum = process.env.REACT_APP_SPECTRUM_BASE_URL
  ? process.env.REACT_APP_SPECTRUM_BASE_URL
  : window.location.origin;

const loginUrl = process.env.REACT_APP_LOGIN_BASE_URL
  ? process.env.REACT_APP_LOGIN_BASE_URL + "/login"
  : window.location.origin + "/login";

const config = {
  spectrum,
  loginUrl,
  datastores: {
    list: [
      {
        uid: "mirlyn",
        name: "Catalog",
        slug: "catalog",
      },
      {
        uid: "articlesplus",
        name: "Articles",
        slug: "articles",
      },
      {
        uid: "databases",
        name: "Databases",
      },
      {
        uid: "journals",
        name: "Journals",
        slug: "journals",
      },
      {
        uid: "onlinejournals",
        name: "Online Journals",
        slug: "onlinejournals",
      },
      {
        uid: "website",
        name: "Guides and More",
        slug: "guidesandmore",
      },
      {
        uid: "everything",
        name: "Everything",
        datastores: [
          "mirlyn",
          "articlesplus",
          "databases",
          "journals",
          "onlinejournals",
          "website",
        ],
      },
    ],
    ordering: [
      "everything",
      "mirlyn",
      "articlesplus",
      "journals",
      "onlinejournals",
      "databases",
      "website",
    ],
    default: "everything",
  },
  sorts: {
    mirlyn: {
      default: "relevance",
      sorts: [
        "relevance",
        "date_asc",
        "date_desc",
        "author_asc",
        "author_desc",
        "date_added",
        "title_asc",
        "title_desc",
      ],
    },
    articlesplus: {
      default: "relevance",
      sorts: ["relevance", "date_asc", "date_desc"],
    },
    databases: {
      default: "relevance",
      sorts: ["relevance", "title_asc", "title_desc"],
    },
    journals: {
      default: "relevance",
      sorts: ["relevance", "title_asc", "title_desc"],
    },
    onlinejournals: {
      default: "relevance",
      sorts: [
        "relevance",
        "date_asc",
        "date_desc",
        "author_asc",
        "author_desc",
        "date_added",
        "title_asc",
        "title_desc",
      ],
    },
    website: {
      default: "relevance",
      sorts: ["relevance", "title_asc", "title_desc", "date_asc", "date_desc"],
    },
  },
  advancedBooleanTypes: ["AND", "OR", "NOT"],
  advanced: {
    everything: {
      forcedFields: [
        {
          uid: "all_fields",
          name: "All Fields",
          force: true,
        },
        {
          uid: "title",
          name: "Title",
          force: true,
        },
        {
          uid: "author",
          name: "Author",
          force: true,
        },
      ],
      fields: ["all_fields", "title", "author"],
      defaultFields: ["all_fields", "title", "author"],
    },
    mirlyn: {
      fields: [
        "all_fields",
        "title",
        "title_starts_with",
        "author",
        "journal_title",
        "subject",
        "academic_discipline",
        "call_number_starts_with",
        "publisher",
        "series",
        "publication_date",
        "isn",
      ],
      defaultFields: ["all_fields", "title", "author"],
      filters: [
        {
          uid: "available_online",
          type: "checkbox",
          groupBy: "Access Options",
          conditions: {
            checked: true,
            unchecked: undefined,
          },
        },
        {
          uid: "search_only",
          name: "Remove Search Only HathiTrust Materials",
          groupBy: "Access Options",
          type: "checkbox",
          conditions: {
            checked: undefined,
            unchecked: false,
            default: "checked",
          },
        },
        {
          uid: "narrow_search",
          type: "scope_down",
          name: "Narrow Search To",
          defaults: [
            {
              uid: "institution",
              value: "All libraries",
            },
            {
              uid: "location",
              value: "All locations",
            },
            {
              uid: "collection",
              value: "All collections",
            },
          ],
        },
        {
          uid: "date_of_publication",
          type: "date_range_input",
        },
        {
          uid: "academic_discipline",
          type: "multiple_select",
        },
        {
          uid: "language",
          type: "multiple_select",
        },
        {
          uid: "format",
          type: "multiple_select",
        },
        {
          uid: "place_of_publication_filter",
          type: "multiple_select",
        },
      ],
    },
    articlesplus: {
      fields: [
        "all_fields",
        "title",
        "author",
        "publication_title",
        "subject",
        "series",
        "publication_date",
        "isn",
      ],
      defaultFields: ["all_fields", "title", "author"],
      filters: [
        {
          uid: "available_online",
          name: "Limit to articles available online",
          type: "checkbox",
          groupBy: "Access Options",
          conditions: {
            checked: true,
            unchecked: undefined,
          },
        },
        {
          uid: "is_scholarly",
          name: "Limit to articles from scholarly journals",
          groupBy: "Access Options",
          type: "checkbox",
          conditions: {
            checked: true,
            unchecked: undefined,
          },
        },
        {
          uid: "holdings_only",
          name: "Add results beyond the library's holdings",
          groupBy: "Access Options",
          type: "checkbox",
          conditions: {
            checked: false,
            unchecked: undefined,
          },
        },
        {
          uid: "exclude_newspapers",
          name: "Exclude newspaper holdings",
          groupBy: "Access Options",
          type: "checkbox",
          conditions: {
            checked: true,
            unchecked: undefined,
          },
        },
        {
          uid: "publication_date",
          type: "date_range_input",
        },
        {
          uid: "language",
          type: "multiple_select",
        },
        {
          uid: "format",
          type: "multiple_select",
        },
      ],
    },
    databases: {
      fields: [
        "all_fields",
        "title",
        "title_starts_with",
        "academic_discipline",
        "publisher",
      ],
      defaultFields: ["all_fields", "title_starts_with"],
      filters: [
        {
          uid: "type",
          type: "multiple_select",
        },
        {
          uid: "academic_discipline",
          type: "multiple_select",
        },
        {
          uid: "access_type",
          type: "multiple_select",
        },
      ],
    },
    journals: {
      fields: [
        "all_fields",
        "title",
        "title_starts_with",
        "subject",
        "academic_discipline",
        "call_number_starts_with",
        "isn",
      ],
      filters: [
        {
          uid: "academic_discipline",
          type: "multiple_select",
        },
      ],
      defaultFields: ["all_fields", "title", "isn"],
    },
    onlinejournals: {
      fields: [
        "all_fields",
        "title",
        "title_starts_with",
        "author",
        "journal_title",
        "subject",
        "academic_discipline",
        "call_number_starts_with",
        "publisher",
        "series",
        "publication_date",
        "isn",
      ],
      defaultFields: ["all_fields", "title", "author"],
      filters: [
        {
          uid: "available_online",
          type: "checkbox",
          groupBy: "Access Options",
          conditions: {
            checked: true,
            unchecked: undefined,
          },
        },
        {
          uid: "search_only",
          name: "Remove Search Only HathiTrust Materials",
          groupBy: "Access Options",
          type: "checkbox",
          conditions: {
            checked: undefined,
            unchecked: false,
            default: "checked",
          },
        },
        {
          uid: "narrow_search",
          type: "scope_down",
          name: "Narrow Search To",
          defaults: [
            {
              uid: "institution",
              value: "All libraries",
            },
            {
              uid: "location",
              value: "All locations",
            },
            {
              uid: "collection",
              value: "All collections",
            },
          ],
        },
        {
          uid: "date_of_publication",
          type: "date_range_input",
        },
        {
          uid: "academic_discipline",
          type: "multiple_select",
        },
        {
          uid: "language",
          type: "multiple_select",
        },
        {
          uid: "format",
          type: "multiple_select",
        },
        {
          uid: "place_of_publication_filter",
          type: "multiple_select",
        },
      ],
    },
    website: {
      fields: ["all_fields", "title"],
      defaultFields: ["all_fields"],
    },
  },
  holdingRewrites: [
    {
      match: {
        uid: "status",
        value: "Search only (no full text)",
      },
      replace: [
        {
          uid: "linkText",
          value: "Search keyword frequency",
        },
        {
          uid: "linkStyle",
          value: "link",
        },
      ],
    },
  ],
};

export default config;
