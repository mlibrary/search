import React from 'react';
import { Anchor, Icon } from '../../../reusable';
import { searchOptions, searchOptionsDatastores } from '../../utilities';
import PropTypes from 'prop-types';

function SearchTip ({ activeDatastore, field }) {
  // Check if current datastore is found in any of the search options
  if (!searchOptionsDatastores().includes(activeDatastore)) return null;
  const selectOption = searchOptions().find((searchOption) => {
    return searchOption.datastore.includes(activeDatastore) && searchOption.uid === field;
  });
  // Check if option exists
  if (selectOption === undefined) return null;
  const tip = () => {
    if (selectOption.uid === 'keyword') {
      if (selectOption.name.includes('(contains)')) {
        return <>Enter one or more keywords to search broadly (e.g., Black Women Scientists). Use quotes to search for a specific phrase (e.g., “systems of oppression”). See tips about <Anchor href='https://guides.lib.umich.edu/c.php?g=914690&p=6590011'>Basic Keyword Searching</Anchor>.</>;
      }
      return <>Enter one or more keywords. Use quotes to search for a phrase (e.g., solar power; polar bears; “systems of oppression”). See tips about <Anchor href='https://guides.lib.umich.edu/c.php?g=914690&p=6590011'>Basic Keyword Searching</Anchor>.</>;
    }
    if (selectOption.uid === 'exact') return <>Enter an exact phrase to search (e.g., solar power). Use AND to separate concepts or phrases (e.g., Black Women Scientists AND Chanda Prescod). See tips about <Anchor href='https://guides.lib.umich.edu/c.php?g=914690&p=6590011&utm_source=library-search'>Basic Keyword Searching</Anchor>.</>;
    if (selectOption.uid === 'title') return <>Enter the first words in a title. Use quotes to search for a phrase (e.g., One Hundred Years of Solitude; “The Fourth World”; Disability Visibility).</>;
    if (selectOption.uid === 'title_starts_with') return <>Search for titles that begin with a word or phrase (e.g., introduction to chemistry; history of Mexico; Asian art).</>;
    if (selectOption.uid === 'author') return <>Search for items by author or contributor (e.g., Kimmerer, Robin Wall). Also search organizations or corporate authors (e.g., American Medical Association). Search for items by author using original scripts (e.g., 小川 洋子).</>;
    if (selectOption.uid === 'journal_title') return <>Search the title of a journal or serial publication (e.g., Detroit Free Press; “journal of the american medical association”; African-American newspapers).</>;
    if (selectOption.uid === 'subject') return <>Use words or phrases to search subjects (e.g., plant physiology, Baldwin, James).</>;
    if (selectOption.uid === 'lc_subject_starts_with') return <>Enter words or phrases to see subjects that start with them (e.g., Baldwin, James; sociology dictionaries).</>;
    if (selectOption.uid === 'academic_discipline') return <>Search academic disciplines (e.g., International business; Latin american and caribbean studies). <Anchor href='/databases/browse'>Browse all Databases</Anchor> alphabetically or by academic discipline.</>;
    if (selectOption.uid === 'publisher') return <>Search names of publishers of databases.</>;
    if (selectOption.uid === 'call_number_starts_with') return <>Search the first few letters and numbers of a call number (e.g., RC662.4 .H38 2016; QH 105). <Anchor href='https://www.loc.gov/catdir/cpso/lcco/?utm_source=library-search'>Learn about the meaning of call numbers<span className='visually-hidden'> (link points to external site)</span></Anchor>.</>;
    if (selectOption.uid === 'series') return <>Search the series title of a group of thematically-related books. Use ‘title’ search to find unique titles within a series (e.g., Politics of Race and Ethnicity, Brill's Annotated Bibliographies, Oxford Choral Music).</>;
    if (selectOption.uid === 'publication_date') return <>Search by year (YYYY) (e.g., 2021; 1942).</>;
    if (selectOption.uid === 'isn') return <>Search by ISSN (8-digit code), ISBN (13 or 10-digit code), or OCLC number (e.g., 0040-781X; 0747581088; 921446069).</>;
    if (selectOption.uid === 'issn') return <>Search by ISSN (8-digit code) (e.g., 0040-781X).</>;
    if (selectOption.uid === 'isbn') return <>Search by ISBN (13 or 10-digit code) (e.g., 0747581088).</>;
    if (selectOption.uid === 'browse_by_callnumber') return <>Browse by Library of Congress (LC) or Dewey call number, sorted alphanumerically (e.g., RC662.4 .H38 2016; QH 105, 880 J375re). <Anchor href='https://www.loc.gov/catdir/cpso/lcco/?utm_source=library-search'>Learn about the meaning of call numbers<span className='visually-hidden'> (link points to external site)</span></Anchor>.</>;
    if (selectOption.uid === 'browse_by_author') return <>Browse an alphabetical list of authors. Authors can be people (put last names first), organizations, or events (e.g., Kingston, Maxine Hong; United Nations Development Programme; Pong, Chun-ho).</>;
    if (selectOption.uid === 'browse_by_subject') return <>Browse an A-Z list of subjects (e.g., motion pictures; history--United States; Eliot, George).</>;
    return null;
  };
  // Check if tip exists
  if (!tip()) return null;
  return (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        gap: '12px',
        marginTop: '0.75rem',
        width: '100%'
      }}
    >
      <Icon
        d='M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z'
        style={{
          flexShrink: '0',
          paddingTop: '4px',
          height: 'auto'
        }}
      />
      <p style={{ margin: '0' }}>
        <span style={{ fontWeight: 'bold' }}>{field.includes('browse_by') ? 'Browse' : 'Search'} Tip: </span>
        {tip()}
      </p>
    </div>
  );
};

SearchTip.propTypes = {
  activeDatastore: PropTypes.string,
  field: PropTypes.string
};

export default SearchTip;
