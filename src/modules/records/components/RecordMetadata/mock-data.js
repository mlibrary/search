const data1 = [
  {
    term: "Format",
    description: [
      { text: "Article", icon: "document" },
      { text: "Book", icon: "book" }
    ]
  },
  {
    term: "Main Author",
    description: [
      {
        text: "Aristophanes.",
        search: {
          type: "filtered",
          scope: "author",
          value: "Aristophanes"
        }
      }
    ]
  },
  {
    term: "Published/Created",
    description: [
      {
        text: "2000 - Universal City, CA : Universal Studios Home Video,"
      }
    ]
  },
  {
    term: "Subjects",
    description: [
      {
        text: "Birds -- Periodicals.",
        search: {
          type: "filtered",
          scope: "subject",
          value: "Birds Periodicals"
        }
      }
    ]
  },
  {
    term: "New Title",
    description: [
      {
        text: "Nature's home",
        search: {
          type: "fielded",
          scope: "title",
          value: "Nature's home"
        }
      }
    ]
  },
  {
    term: "Academic Discipline",
    description: [
      [
        {
          text: "Science",
          search: {
            type: "filtered",
            scope: "academic_discipline",
            value: "Science"
          }
        },
        {
          text: "Biology",
          search: {
            type: "filtered",
            scope: "academic_discipline",
            value: "Biology"
          }
        },
        {
          text: "Zoology",
          search: {
            type: "filtered",
            scope: "academic_discipline",
            value: "Zoology"
          }
        }
      ]
    ]
  }
];

const data2 = [
  {
    term: "Format",
    description: [{ text: "Book", icon: "book" }]
  },
  {
    term: "Main Author",
    description: [
      {
        text: "Aristophanes.",
        search: {
          type: "fielded",
          scope: "author",
          value: "Aristophanes"
        }
      }
    ]
  },
  {
    term: "Published/Created",
    description: [
      {
        text: "2000 - Universal City, CA : Universal Studios Home Video,"
      }
    ]
  }
];

export default data2;
