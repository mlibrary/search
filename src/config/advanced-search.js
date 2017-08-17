const advancedSearchConfig = {
  /*
  // Example config
  mirlyn: { // datastore uid
    fields: [ // fielded searching options
      {
        uid: 'all_fields', // unique for Spectrum and URL state
        name: 'Any Field' // displayed name
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
  */
  mirlyn: {
    fields: [
      {
        uid: 'all_fields',
        name: 'Any Field'
      },
      {
        uid: 'title',
        name: 'Title'
      },
      {
        uid: 'author',
        name: 'Author'
      },
    ],
    filters: [
      /*
      {
        uid: // uid of filter from spectrum
        name: // display name
        type: 'select' | 'multiselect' | 'year_input'
      },
      */
      {
        uid: 'location',
        name: 'Location'
        type: 'select'
      },
      {
        uid: 'place_of_publication',
        name: 'Place of Publication',
        type: 'select'
      },
      {
        uid: 'date_of_publication',
        name: 'Date of Publication'
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
  }
}

export default advancedSearchConfig
