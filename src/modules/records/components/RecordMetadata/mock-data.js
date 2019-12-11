const data1 = [
  {
    term: "Format",
    descriptions: [
      { text: "Article", icon: "document" },
      { text: "Book", icon: "book" }
    ]
  },
  {
    term: "Main Author",
    descriptions: [
      {
        text: "Aristophanes.",
        search: {
          type: "facet",
          scope: "author",
          value: "Aristophanes"
        }
      }
    ]
  },
  {
    term: "Published/Created",
    descriptions: [
      {
        text: "2000 - Universal City, CA : Universal Studios Home Video,"
      }
    ]
  },
  {
    term: "Subjects",
    descriptions: [
      {
        text: "Birds -- Periodicals.",
        search: {
          type: "facet",
          scope: "subject",
          value: "Birds Periodicals"
        }
      }
    ]
  },
  {
    term: "New Title",
    descriptions: [
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
    descriptions: [
      [
        {
          text: "Science",
          href: "/catalog?filter.academic_discipline=Science"
        },
        {
          text: "Biology",
          href: "/catalog?filter.academic_discipline=Biology"
        },
        {
          text: "Zoology",
          href: "/catalog?filter.academic_discipline=Zoology"
        }
      ]
    ]
  }
];

const data2 = [
  {
    term: "Format",
    descriptions: [{ text: "Book", icon: "book" }]
  },
  {
    term: "Main Author",
    descriptions: [
      {
        text: "Aristophanes.",
        search: {
          type: "facet",
          scope: "author",
          value: "Aristophanes"
        }
      }
    ]
  },
  {
    term: "Published/Created",
    descriptions: [
      {
        text: "2000 - Universal City, CA : Universal Studios Home Video,"
      }
    ]
  }
];

export default data2;
