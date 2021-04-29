import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowseInfo } from "../../../browse";
import { Heading } from "@umich-lib/core";
import { InstitutionSelect } from "../../../institution";

const Landing = ({ content, activeDatastore }) => {
  switch (activeDatastore.uid) {
    case "everything":
      return (
        <div className="landing-container">
          <h1 className="landing-heading-text" aria-live="polite">
            Search <b>Everything</b> to see a broad sampling of results from
            across 'Library Search' and to explore specific areas and records in
            greater detail.
          </h1>
          <p>
            You will see results from the <Link to={`/catalog`}>Catalog</Link>,{" "}
            <Link to={`/articlesplus`}>Articles</Link>,{" "}
            <Link to={`/databases`}>Databases</Link>,{" "}
            <Link to={`/onlinejournals`}>Online Journals</Link>, and{" "}
            <Link to={`/guidesandmore`}>Guides and More</Link> pages.
          </p>
          <p>
            Enter a search term in the search box to start your own Everything
            search.
          </p>
        </div>
      );
    case "mirlyn":
      return (
        <div>
          <div className="landing-container">
            <h1 className="landing-heading-text" aria-live="polite">
              The <b>Catalog</b> is the definitive place for finding materials
              held by the U-M Library.
            </h1>
            <p>
              Your results will include everything in our physical collection
              (books, audio, video, maps, musical scores, archival materials,
              and more), as well as materials available online such as
              electronic books, streaming audio and video, and online journals.
            </p>
          </div>

          <div className="container container-narrow">
            <div className="institution-select-landing-container">
              <Heading size="large" level={2} style={{ textAlign: "center" }}>
                {" "}
                To find materials closest to you, please choose a library
              </Heading>
              <InstitutionSelect type="switch" />
            </div>
            <p className="landing-extra-info">
              <a href="http://mirlyn-classic.lib.umich.edu/">
                Mirlyn Classic Catalog
              </a>
            </p>
            <p className="landing-extra-info">
              <a href="https://lib.umich.edu/find-borrow-request/find-materials/using-other-catalogs">
                About our other Library Catalogs
              </a>
            </p>
          </div>
        </div>
      );
    case "articlesplus":
      return (
        <div className="landing-container">
          <h1 className="landing-heading-text" aria-live="polite">
            <b>Articles</b> is a gateway to discovering a wide range of the
            library's resources.
          </h1>
          <p>
            Your results will include scholarly journal articles, newspaper
            articles, book chapters, conference proceedings, and more. To focus
            your search on a specific subject area, try looking for databases.
          </p>
        </div>
      );
    case "databases":
      return (
        <div className="landing-container">
          <h1 className="landing-heading-text" aria-live="polite">
            <b>Databases</b> are library search engines focused on a specific
            subject or range of subjects. Some may highlight a particular
            format, while others will contain a variety of material types.
          </h1>
          <p>
            Your results will include databases the library subscribes to,
            databases of locally created materials, and databases available to
            anyone via open access.
          </p>

          <BrowseInfo datastore={activeDatastore} />
        </div>
      );
    case "onlinejournals":
      return (
        <div className="landing-container">
          <h1 className="landing-heading-text" aria-live="polite">
            <b>Online Journals</b> are serial (repeating) publications the
            library subscribes to electronically. This includes not only
            journals, but also newspapers, trade publications, magazines, and
            more.
          </h1>
          <p>
            Your results will include journals the library subscribes to, as
            well as some available to anyone via open access. You will see
            statements with any specifics about access and many journals will be
            available through multiple platforms. Be sure to check dates
            alongside each to see what you can access.
          </p>

          <BrowseInfo datastore={activeDatastore} />
        </div>
      );
    case "website":
      return (
        <div className="landing-container">
          <h1 className="landing-heading-text" aria-live="polite">
            <b>Guides and more</b> is the place to learn about our services,
            spaces, and collections.
          </h1>
          <p>
            Your results will include research guides, specialty sites, blogs
            and blogs posts, and online exhibits. Visit{" "}
            <a href="https://lib.umich.edu">lib.umich.edu</a> to search the
            library website, including library staff, current news, events, and
            physical exhibits.
          </p>
        </div>
      );
    default:
      return (
        <div className="landing-container">
          <p>Empty state. Begin your search.</p>
        </div>
      );
  }
};

export default connect(null)(Landing);
