import React from 'react';
import { Link } from 'react-router';

const Landing = ({ content, activeDatastore }) => {
  switch (activeDatastore.uid) {
    case 'everything':
      return (
        <div className="landing-container">
          <p><b>Everything</b> provides a sampling of results from across the library, while guiding you to additional materials and deeper details.</p>
          <p className="datastore-summary">You will see results from the <Link to={`/catalog`}>Catalog</Link>, <Link to={`/articlesplus`}>Articles+</Link>, <Link to={`/databases`}>Databases</Link>, <Link to={`/onlinejournals`}>Online Journals</Link>, and <Link to={`/librarywebsite`}>Library Website</Link> pages.</p>
        </div>
      )
    case 'mirlyn':
      return (
        <div className="landing-container">
          <p><b>Catalog</b> is the definitive place for finding materials held by the U-M Library.</p>
          <p>Your results will include everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</p>
        </div>
      )
    case 'articlesplus':
      return (
        <div className="landing-container">
          <p><b>Articles+</b> is a gateway to discovering a wide variety of library resources.</p>
          <p>Your results will include scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more.</p>
        </div>
      )
    case 'databases':
      return (
        <div className="landing-container">
          <p><b>Databases</b> are library search engines focused on a specific subject or range of subjects. Some may highlight a particular format, while others will contain a variety of material types.</p>
          <p>Your results will include databases the library subscribes to, databases of locally created materials, and databases available to anyone via open access.</p>
        </div>
      )
    case 'journals':
      return (
        <div className="landing-container">
          <p><b>Online Journals</b> are serial (repeating) publications the library subscribes to electronically. This includes not only journals, but also newspapers, trade publications, magazines, and more.</p>
          <p>Your results will include journals the library subscribes to &mdash; as well as some available to anyone via open access &mdash; and feature a statement with any specifics about access. Many journals will be available through multiple platforms, so you will available dates alongside each link.</p>
        </div>
      )
    case 'website':
      return (
        <div className="landing-container">
          <p>Our <b>library website</b> is the place to learn about our services, spaces, and collections.</p>
          <p>Your results will include website pages, events, exhibits, news, and more.</p>
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

export default Landing;
