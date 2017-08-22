const advancedSearchConfig = {
  /*
  // Example config
  mirlyn: { // datastore uid
    fields: [ // fielded searching options
      {
        uid: 'all_fields', // unique for Spectrum and URL state
        name: 'All Field' // displayed name
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
        name: 'All Field',
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
        name: 'All Field'
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
    /*
    filters: [
      {
        uid: 'institution',
        name: 'Institution',
        type: 'select',
        values: [
          'All',
          'UM Ann Arbor Libraries',
          'Bentley Historical Library',
          'William L. Clements Library',
          'Flint Thompson Library',
          'University Library'
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
    ]
    */
  },
  articlesplus: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Field'
      },
      {
        uid: 'title',
        name: 'Title'
      },
    ]
  },
  journals: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Field'
      },
      {
        uid: 'title',
        name: 'Title'
      },
    ]
  },
  databases: {
    fields: [
      {
        uid: 'all_fields',
        name: 'All Field'
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
        name: 'All Field'
      },
      {
        uid: 'title',
        name: 'Title'
      },
    ]
  },
}

export default advancedSearchConfig
