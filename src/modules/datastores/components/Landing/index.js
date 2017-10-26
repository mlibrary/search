import React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../../core';

import {
  InstitutionSelect
} from '../../../institution'

const Landing = ({ content, activeDatastore }) => {
  switch (activeDatastore.uid) {
    case 'everything':
      return (
        <div className="landing-container">
          <LandingIcons icons={['auto-fix']} />
          <p className="landing-heading-text">Search <b>Everything</b> to see a broad sampling of results from across 'Library Search' and to explore specific areas and records in greater detail.</p>
          <p>You will see results from the <Link to={`/catalog`}>Catalog</Link>, <Link to={`/articlesplus`}>Articles</Link>, <Link to={`/databases`}>Databases</Link>, <Link to={`/onlinejournals`}>Online Journals</Link>, and <Link to={`/librarywebsite`}>Library Website</Link> pages.</p>
          <p>Enter a search term in the search box to start your own Everything search.</p>
        </div>
      )
    case 'mirlyn':
      return (
        <div>
          <div className="landing-container">
            <LandingIcons icons={['book-variant', 'document', 'arrow-right-drop-circle', 'image-multiple', 'music-note']} />
            <p className="landing-heading-text">The <b>Catalog</b> is the definitive place for finding materials held by the U-M Library.</p>
            <p>Your results will include everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</p>
          </div>

          <div className="container container-narrow">
            <div className="institution-select-landing-container">
              <h3 className="institution-select-landing-heading"> To find materials closest to you, please choose a library</h3>
              <InstitutionSelect type="switch" />
            </div>
            <p className="landing-extra-info"><a href="http://mirlyn-classic.lib.umich.edu/">Mirlyn Classic Catalog</a></p>
            <p className="landing-extra-info"><a href="https://www.lib.umich.edu/library-catalogs">About our other Library Catalogs</a></p>
          </div>
      </div>
      )
    case 'articlesplus':
      return (
        <div className="landing-container">
          <LandingIcons icons={['file-find', 'document', 'file']} />
          <p className="landing-heading-text"><b>Articles</b> is a gateway to discovering a wide range of the library's resources.</p>
          <p>Your results will include scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more. To focus your search on a specific subject area, try looking for databases.</p>
        </div>
      )
    case 'databases':
      return (
        <div className="landing-container">
          <LandingIcons icons={['search', 'database', 'website']} />
          <p className="landing-heading-text"><b>Databases</b> are library search engines focused on a specific subject or range of subjects. Some may highlight a particular format, while others will contain a variety of material types.</p>
          <p>Your results will include databases the library subscribes to, databases of locally created materials, and databases available to anyone via open access.</p>
        </div>
      )
    case 'journals':
      return (
        <div className="landing-container">
          <LandingIcons icons={['book-multiple-variant']} />
          <p className="landing-heading-text"><b>Online Journals</b> are serial (repeating) publications the library subscribes to electronically. This includes not only journals, but also newspapers, trade publications, magazines, and more.</p>
          <p>Your results will include journals the library subscribes to, as well as some available to anyone via open access. You will see statements with any specifics about access and many journals will be available through multiple platforms. Be sure to check dates alongside each to see what you can access.</p>
        </div>
      )
    case 'website':
      return (
        <div className="landing-container">
          <LandingIcons icons={['calendar-clock', 'map-marker-radius', 'website']} />
          <p className="landing-heading-text">Our <b>library website</b> is the place to learn about our services, spaces, and collections.</p>
          <p>Your results will include website pages, research guides, library staff, events, exhibits, news, and more.</p>
        </div>
      )
    default:
      return (
        <div className="landing-container">
          <p>Empty state. Begin your search.</p>
        </div>
      )
  }
};

const LandingIcons = ({ icons }) => {
  return (
    <div className="landing-icons">
      {icons.map((icon, index) => {
        return (
          <Icon key={index} name={icon} />
        )
      })}
    </div>
  )
}

export default Landing;
