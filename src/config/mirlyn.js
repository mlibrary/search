const config = {
  advanced_search: {
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
        type: 'select' | 'multiselect'
      },
      */
      {
        uid: 'academic_discipline',
        type: 'multiselect'
      },
      {
        uid: 'academic_discipline',
        type: 'multiselect'
      },
      {
        uid: 'language',
        type: 'multiselect'
      },
      {
        uid: 'language',
        type: 'multiselect'
      },
      {
        uid: 'format',
        type: 'multiselect'
      },
      {
        uid: 'place_of_publication',
        type: 'multiselect'
      }
    ]
  }
}

export default config
