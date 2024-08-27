import { Anchor, H1 } from '../../../reusable';
import { BrowseInfo } from '../../../browse';
import PropTypes from 'prop-types';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Landing = ({ activeDatastore, institution }) => {
  const [searchParams] = useSearchParams();
  const { uid, name } = activeDatastore;
  const landingContent = {
    databases: {
      content: (
        <>
          <p>Your results will include databases the library subscribes to, databases of locally created materials, and databases available to anyone via open access.</p>
          <BrowseInfo datastore={activeDatastore} />
        </>
      ),
      headingText: (<><span className='strong'>Databases</span> are library search engines focused on a specific subject or range of subjects. Some may highlight a particular format, while others will contain a variety of material types.</>)
    },
    everything: {
      content: (
        <>
          <p>You will see results from the <Anchor to='/catalog'>Catalog</Anchor>, <Anchor to='/articles'>Articles</Anchor>, <Anchor to='/databases'>Databases</Anchor>, <Anchor to='/onlinejournals'>Online Journals</Anchor>, and <Anchor to='/guidesandmore'>Guides and More</Anchor> pages.</p>
          <p>Enter a search term in the search box to start your own Everything search.</p>
        </>
      ),
      headingText: (<>Search <span className='strong'>Everything</span> to see a broad sampling of results from across &lsquo;Library Search&rsquo; and to explore specific areas and records in greater detail.</>)
    },
    mirlyn: {
      content: (<p>Your results will include everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</p>),
      headingText: (<>The <span className='strong'>Catalog</span> is the definitive place for finding materials held by the U-M Library.</>)
    },
    onlinejournals: {
      content: (
        <>
          <p>Your results will include journals the library subscribes to, as well as some available to anyone via open access. You will see statements with any specifics about access and many journals will be available through multiple platforms. Be sure to check dates alongside each to see what you can access.</p>
          <BrowseInfo datastore={activeDatastore} />
        </>
      ),
      headingText: (<><span className='strong'>Online Journals</span> are serial (repeating) publications the library subscribes to electronically. This includes not only journals, but also newspapers, trade publications, magazines, and more.</>)
    },
    primo: {
      content: (<p>Your results will include scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more. To focus your search on a specific subject area, try looking for databases.</p>),
      headingText: (<><span className='strong'>Articles</span> is a gateway to discovering a wide range of the library&apos;s resources.</>)
    },
    website: {
      content: (<p>Your results will include research guides, specialty sites, blogs and blogs posts, and online exhibits. Visit{' '} <Anchor href='https://lib.umich.edu'>lib.umich.edu</Anchor> to search the library website, including library staff, current news, events, and physical exhibits.</p>),
      headingText: (<><span className='strong'>Guides and more</span> is the place to learn about our services, spaces, and collections.</>)
    }
  };

  return (
    <div className='container'>
      <H1 className='visually-hidden'>
        {name}
      </H1>
      <div className='landing-container'>
        <p className='landing-heading-text'>{landingContent[uid].headingText}</p>
        {landingContent[uid].content}
      </div>
      {uid === 'mirlyn' && (
        <div className='container container-narrow'>
          <div className='institution-select-landing-container center-text'>
            <h2 className='heading-large'>
              To find materials closest to you, please choose a library
            </h2>
            <p className='flex flex__responsive'>
              {institution.options.map((library, index) => {
                return (
                  <Anchor
                    key={index}
                    to={`?library=${library.replaceAll(' ', '+')}`}
                    className={`btn btn--secondary ${library === (searchParams.get('library') || institution.defaultInstitution) ? 'btn--secondary--active' : ''}`}
                  >
                    {library}
                  </Anchor>
                );
              })}
            </p>
            <Anchor href='https://lib.umich.edu/find-borrow-request/find-materials/using-other-catalogs'>
              About our other Library Catalogs
            </Anchor>
          </div>
        </div>
      )}
    </div>
  );
};

Landing.propTypes = {
  activeDatastore: PropTypes.object,
  institution: PropTypes.object
};

export default Landing;
