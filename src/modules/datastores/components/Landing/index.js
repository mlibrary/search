/** @jsx jsx */
import { jsx } from '@emotion/core'

import React from 'react';
import { connect } from 'react-redux';

import {
  Heading,
  TYPOGRAPHY,
  Text,
  Margins,
  SPACING
} from '@umich-lib/core'
import { Link } from '../../../core';
import { BrowseInfo } from '../../../browse';
import {
  InstitutionSelect
} from '../../../institution'

function LandingContainer (props) {
  return (
    <Margins>
      <div {...props} css={{
        maxWidth: '32rem',
        margin: '0 auto',
        marginTop: SPACING['2XL'],
        'b': {
          fontWeight: '700'
        },
        '> *': {
          marginBottom: SPACING['L']
        }
      }}
      />
    </Margins>
  )
}

const Landing = ({ content, activeDatastore }) => {
  switch (activeDatastore.uid) {
    case 'everything':
      return (
        <LandingContainer>
          <Heading level={1} size="XS" aria-live="polite">Search <b>Everything</b> to see a broad sampling of results from across 'Library Search' and to explore specific areas and records in greater detail.</Heading>
          <Text>You will see results from the <Link to={`/catalog`}>Catalog</Link>, <Link to={`/articlesplus`}>Articles</Link>, <Link to={`/databases`}>Databases</Link>, <Link to={`/onlinejournals`}>Online Journals</Link>, and <Link to={`/librarywebsite`}>Library Website</Link> pages.</Text>
          <Text>Enter a search term in the search box to start your own Everything search.</Text>
        </LandingContainer>
      )
    case 'mirlyn':
      return (
        <LandingContainer>
          <Heading level={1} size="XS" aria-live="polite">The <b>Catalog</b> is the definitive place for finding materials held by the U-M Library.</Heading>
          <p>Your results will include everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</p>

          <Heading size="L" level={2} style={{ textAlign: 'center' }}> To find materials closest to you, please choose a library</Heading>
          <InstitutionSelect />
          <ul css={{
            textAlign: 'center',
            '> *': {
              marginBottom: SPACING['S']
            }
          }}>
            <li><Link to="http://mirlyn-classic.lib.umich.edu/">Mirlyn Classic Catalog</Link></li>
            <li><Link to="https://www.lib.umich.edu/library-catalogs">About our other Library Catalogs</Link></li>
          </ul>
        </LandingContainer>
      )
    case 'articlesplus':
      return (
        <LandingContainer>
          <Heading level={1} size="XS" aria-live="polite"><b>Articles</b> is a gateway to discovering a wide range of the library's resources.</Heading>
          <p>Your results will include scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more. To focus your search on a specific subject area, try looking for databases.</p>
        </LandingContainer>
      )
    case 'databases':
      return (
        <LandingContainer>
          <Heading level={1} size="XS" aria-live="polite"><b>Databases</b> are library search engines focused on a specific subject or range of subjects. Some may highlight a particular format, while others will contain a variety of material types.</Heading>
          <p>Your results will include databases the library subscribes to, databases of locally created materials, and databases available to anyone via open access.</p>

          <BrowseInfo datastore={activeDatastore} />
        </LandingContainer>
      )
    case 'journals':
      return (
        <LandingContainer>
          <Heading level={1} size="XS" aria-live="polite"><b>Online Journals</b> are serial (repeating) publications the library subscribes to electronically. This includes not only journals, but also newspapers, trade publications, magazines, and more.</Heading>
          <p>Your results will include journals the library subscribes to, as well as some available to anyone via open access. You will see statements with any specifics about access and many journals will be available through multiple platforms. Be sure to check dates alongside each to see what you can access.</p>

          <BrowseInfo datastore={activeDatastore} />
        </LandingContainer>
      )
    case 'website':
      return (
        <LandingContainer>
          <Heading level={1} size="XS" aria-live="polite">Our <b>library website</b> is the place to learn about our services, spaces, and collections.</Heading>
          <p>Your results will include website pages, research guides, library staff, events, exhibits, news, and more.</p>
        </LandingContainer>
      )
    default:
      return (
        <LandingContainer>
          <p>Empty state. Begin your search.</p>
        </LandingContainer>
      )
  }
};

export default connect(null)(Landing);
