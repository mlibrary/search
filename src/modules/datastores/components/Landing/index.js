import React from 'react';
import { connect } from 'react-redux';
import { Anchor } from '../../../reusable';
import { BrowseInfo } from '../../../browse';
import { InstitutionSelect } from '../../../institution';
import PropTypes from 'prop-types';

function Landing ({ content, activeDatastore }) {
  const landingContent = () => {
    switch (activeDatastore.uid) {
      case 'everything':
        return (
          <div className='landing-container'>
            <p className='landing-heading-text'>
              Search <span className='strong'>Everything</span> to see a broad sampling of results from
              across 'Library Search' and to explore specific areas and records in
              greater detail.
            </p>
            <p>
              You will see results from the <Anchor to='/catalog'>Catalog</Anchor>, <Anchor to='/articles'>Articles</Anchor>, <Anchor to='/databases'>Databases</Anchor>, <Anchor to='/onlinejournals'>Online Journals</Anchor>, and <Anchor to='/guidesandmore'>Guides and More</Anchor> pages.
            </p>
            <p>
              Enter a search term in the search box to start your own Everything
              search.
            </p>
          </div>
        );
      case 'mirlyn':
        return (
          <>
            <div className='landing-container'>
              <p className='landing-heading-text'>
                The <span className='strong'>Catalog</span> is the definitive place for finding materials
                held by the U-M Library.
              </p>
              <p>
                Your results will include everything in our physical collection
                (books, audio, video, maps, musical scores, archival materials,
                and more), as well as materials available online such as
                electronic books, streaming audio and video, and online journals.
              </p>
            </div>
            <div className='container container-narrow'>
              <div className='institution-select-landing-container'>
                <h2 className='heading-large' style={{ textAlign: 'center' }}>
                  To find materials closest to you, please choose a library
                </h2>
                <InstitutionSelect type='switch' />
              </div>
              <p className='landing-extra-info'>
                <Anchor href='https://lib.umich.edu/find-borrow-request/find-materials/using-other-catalogs'>
                  About our other Library Catalogs
                </Anchor>
              </p>
            </div>
          </>
        );
      case 'primo':
        return (
          <div className='landing-container'>
            <p className='landing-heading-text'>
              <span className='strong'>Articles</span> is a gateway to discovering a wide range of the
              library's resources.
            </p>
            <p>
              Your results will include scholarly journal articles, newspaper
              articles, book chapters, conference proceedings, and more. To focus
              your search on a specific subject area, try looking for databases.
            </p>
          </div>
        );
      case 'databases':
        return (
          <div className='landing-container'>
            <p className='landing-heading-text'>
              <span className='strong'>Databases</span> are library search engines focused on a specific
              subject or range of subjects. Some may highlight a particular
              format, while others will contain a variety of material types.
            </p>
            <p>
              Your results will include databases the library subscribes to,
              databases of locally created materials, and databases available to
              anyone via open access.
            </p>
            <BrowseInfo datastore={activeDatastore} />
          </div>
        );
      case 'onlinejournals':
        return (
          <div className='landing-container'>
            <p className='landing-heading-text'>
              <span className='strong'>Online Journals</span> are serial (repeating) publications the
              library subscribes to electronically. This includes not only
              journals, but also newspapers, trade publications, magazines, and
              more.
            </p>
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
      case 'website':
        return (
          <div className='landing-container'>
            <p className='landing-heading-text'>
              <span className='strong'>Guides and more</span> is the place to learn about our services,
              spaces, and collections.
            </p>
            <p>
              Your results will include research guides, specialty sites, blogs
              and blogs posts, and online exhibits. Visit{' '}
              <Anchor href='https://lib.umich.edu'>lib.umich.edu</Anchor> to search the
              library website, including library staff, current news, events, and
              physical exhibits.
            </p>
          </div>
        );
    }
  };

  return (
    <div className='container'>
      <h1 className='visually-hidden' id='maincontent' tabIndex='-1'>
        {activeDatastore.name}
      </h1>
      {landingContent()}
    </div>
  );
};

Landing.propTypes = {
  content: PropTypes.any,
  activeDatastore: PropTypes.object
};

export default connect(null)(Landing);
