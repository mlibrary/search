const advancedSearchConfig = {
  /*
  // Example config
  mirlyn: { // datastore uid
    fields: [ // fielded searching options
      {
        uid: 'all_fields', // unique for Spectrum and URL state
        name: 'All Fields' // displayed name
      },
      {
        uid: 'title',
        name: 'Title'
      },
      // ...
      filters: [
        {
          uid: 'language',
          type: 'multiselect'
        },
        {
          uid: 'format',
          type: 'multiselect'
        },
      ]
    ]
  },
  // End of example config
  */
  everything: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Fields',
      },
      {
        uid: 'title',
        name: 'Title'
      },
    ]
  },
  mirlyn: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Fields'
      },
      {
        uid: 'title',
        name: 'Title'
      },
      {
        uid: 'author',
        name: 'Author'
      },
      {
        uid: 'academic_discipline',
        name: 'Academic Discipline'
      },
      {
        uid: 'publisher',
        name: 'Publisher'
      }
    ],
    filters: [
      {
        uid: 'academic_discipline',
        name: 'Academic Discipline',
        type: 'multiselect',
        values: [
          'Academic and Specialized News',
          'Aerospace Engineering',
          'African American Studies',
          'African Studies',
          'Allergy and Clinical Immunology',
          'American Culture',
          'Analytical Chemistry',
          'Anesthesiology',
          'Anthropology',
          'Arab-American Studies',
          'Archaeology',
          'Architecture',
          'Archives & Record Management',
          'Armenian Studies',
          'Art History',
          'Art and Design',
          'Arts',
          'Asian Languages and Cultures',
          'Asian Studies',
          'Asian/Pacific Islander American Studies'
        ]
      },
      /*
      {
        uid: 'institution',
        name: 'Institution',
        type: 'select',
        values: [
          'UM Ann Arbor Libraries',
          'Flint Thompson Library',
          'Bentley Historical Library',
          'William L. Clements Library',
        ]
      },
      {
        uid: 'location',
        name: 'Location',
        type: 'select',
        values: [
          'All',
          'Hatcher Graduate',
          'Buhr Shelving Facility',
          'Flint Thompson Library',
          'Special Collections'
        ]
      },
      {
        uid: 'academic_discipline',
        name: 'Academic Discipline',
        type: 'multiselect',
        values: [
          'All',
          'Aerospace Engineering',
          'African American Studies'
        ]
      },
      {
        uid: 'language',
        name: 'Language',
        type: 'multiselect',
        values: [
          'All',
          'Abkhaz',
          'Archinese'
        ]
      },
      {
        uid: 'format',
        name: 'Format',
        type: 'multiselect',
        values: [
          'All',
          'Archive',
          'Audio'
        ]
      },
      {
        uid: 'place_of_publication',
        name: 'Place of Publication',
        type: 'select'
      },
      {
        uid: 'date_of_publication',
        name: 'Date of Publication',
        type: 'year_input'
      },
      {
        uid: 'academic_discipline',
        name: 'Academic Discipline',
        type: 'multiselect'
      },
      {
        uid: 'language',
        name: 'Language',
        type: 'multiselect'
      },
      {
        uid: 'format',
        name: 'Format',
        type: 'multiselect'
      },
      */
    ]

  },
  articlesplus: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Fields'
      },
      {
        uid: 'title',
        name: 'Title'
      },
      {
        uid: 'author',
        name: 'Author'
      },,
      {
        uid: 'publication_date',
        name: 'Publication Date'
      },
    ]
  },
  journals: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Fields'
      },
      {
        uid: 'title',
        name: 'Title'
      },
      {
        uid: 'academic_discipline',
        name: 'Academic Discipline'
      }
    ]
  },
  databases: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Fields'
      },
      {
        uid: 'title',
        name: 'Title'
      },
    ]
  },
  website: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Fields'
      },
      {
        uid: 'title',
        name: 'Title'
      },
    ]
  },
}

export default advancedSearchConfig
