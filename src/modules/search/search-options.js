const searchOptions = [
  {
    "label": "Keyword",
    "value": "keyword",
    "tip": "Enter one or more keywords. Use quotes to search for a phrase (e.g. solar power; polar bears; “systems of oppression”). See tips about <a href=\"https://guides.lib.umich.edu/c.php?g=914690&p=6590011\">Basic Keyword Searching</a>."
  },
  {
    "label": "Title",
    "value": "title",
    "tip": "Enter the first words in a title. Use quotes to search a phrase (e.g. One Hundred Years of Solitude; “The Fourth World”; Disability Visibility)."
  },
  {
    "label": "Title starts with",
    "value": "title_starts_with",
    "tip": "Search for titles that begin with a word or phrase (e.g., introduction to chemistry; history of Mexico; Asian art)."
  },
  {
    "label": "Author",
    "value": "author",
    "tip": "Search for items by author or contributor. Also search organizations or corporate authors (e.g. Kimmerer, Robin Wall; American Medical Association; 小川 洋子)."
  },
  {
    "label": "Journal/Serial Title",
    "value": "journal_title",
    "tip": "Search the title of a journal or serial publication (e.g. Detroit Free Press; “journal of the american medical association”; African-American newspapers)."
  },
  {
    "label": "Subject",
    "value": "subject",
    "tip": "Use words or phrases to search subject headings (e.g., public health; radicalism--united states; Baldwin, James)."
  },
  {
    "label": "Academic Discipline",
    "value": "academic_discipline",
    "tip": "Search academic disciplines. <a href=\"https://search.lib.umich.edu/databases/browse?query=sculpture\">Browse all Databases</a> alphabetically or by academic discipline (e.g. International business; Latin american and caribbean studies)."
  },
  {
    "label": "Call Number starts with",
    "value": "call_number_starts_with",
    "tip": "Search the first few letters and numbers of a call number (e.g. RC662.4 .H38 2016; QH 105). <a href=\"https://www.loc.gov/catdir/cpso/lcco/\">Learn about the meaning of call numbers<span class=\"visually-hidden\"> (link points to external site)</span></a>."
  },
  {
    "label": "Series (transcribed)",
    "value": "series",
    "tip": "Search the series title of a group of thematically-related books. Use ‘title’ search to find unique titles within a series (e.g., Politics of Race and Ethnicity, Brill's Annotated Bibliographies, Oxford Choral Music)."
  },
  {
    "label": "Year of Publication",
    "value": "publication_date",
    "tip": "Search by year (YYYY) (e.g. 2021, 1942)"
  },
  {
    "label": "ISBN/ISSN/OCLC/etc",
    "value": "isn",
    "tip": "Search by ISSN (8-digit code), ISBN (13- or 10-digit code), or OCLC number (e.g.  0040-781X; 0747581088; 921446069)."
  },
  {
    "label": "Browse by call number (LC and Dewey) [BETA]",
    "value": "browse_by_callnumber",
    "tip": "Browse by Library of Congress (LC) and Dewey call numbers, sorted alphanumerically. Learn about the meaning of call numbers (e.g. RC662.4 .H38 2016; QH 105). <a href=\"https://www.loc.gov/catdir/cpso/lcco/\">Learn about the meaning of call numbers<span class=\"visually-hidden\"> (link points to external site)</span></a>.",
    "selected": "selected"
  },
  {
    "label": "Browse by author (coming soon)",
    "value": "browse_by_author",
    "tip": "Browse an alphabetical list of authors. Authors can be people (put last names first), organizations, or events (e.g. Kingston, Maxine Hong; United Nations Development Programme; Pong, Chun-ho).",
    "disabled": "disabled"
  },
  {
    "label": "Browse by subject (coming soon)",
    "value": "browse_by_subject",
    "tip": "Browse an A-Z list of subjects (e.g. motion pictures; history--United States; Eliot, George).",
    "disabled": "disabled"
  },
  {
    "label": "Browse by title (coming soon)",
    "value": "browse_by_title",
    "tip": "Browse an alphabetical list of titles for books, online journals, serials, media, etc (e.g. Nine stories; Tom Swift).",
    "disabled": "disabled"
  }
];

export default searchOptions;
