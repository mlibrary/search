import React from 'react';
import {
  setDocumentTitle
} from '../../../a11y';
import schematicImage from './schematic.png';

const TechnicalOverview = function NoMatch () {
  setDocumentTitle(['Technical overview']);

  return (
    <div className='container container-narrow'>
      <main className='page'>
        <h1 className='u-margin-top-none' id='maincontent' tabIndex='-1'>Technical overview</h1>

        <p>Library Search (<a className='underline' href='https://search.lib.umich.edu/'>https://search.lib.umich.edu/</a>) was built by the <a className='underline' href='https://lib.umich.edu/about-us/our-divisions-and-departments/library-information-technology/design-and-discovery'>Design &amp; Discovery</a> department at the University of Michigan Library. It was originally based on the <a className='underline' href='https://github.com/cul/clio-spectrum'>CLIO project</a> from Columbia University, but has evolved significantly into its own application over its two-year development path. It relies on many open source technologies, (<a className='underline' href='http://lucene.apache.org/solr/'>Solr</a>, <a className='underline' href='http://projectblacklight.org/'>Blacklight</a>, <a className='underline' href='https://rubyonrails.org/'>Rails</a>, <a className='underline' href='https://reactjs.org/'>React.js</a>, <a className='underline' href='https://citationstyles.org/'>CSL</a>, and many others).</p>
        <p>Library Search is built in three main layers to allow for flexibility in the front end and back end data repositories. A different front end application should not require rewriting the search queries, while conversely changes to one or more back-end search indexes or repositories would not require updates to the user interface. The middle layer acts as translator between the front and back ends.</p>
        <p>For more information about Library Search, please contact <a className='underline' href='mailto:library-search-feedback@umich.edu'>library-search-feedback@umich.edu</a>.</p>

        <h2>High-Level Schematic</h2>
        <p><img src={schematicImage} alt='' style={{ height: 'auto', maxWidth: '100%' }} /></p>

        <h2>Front-End / User Interface</h2>
        <p>The user interface for Library Search, shown at the top of the above schematic, is a Single Page Application built with <a className='underline' href='https://reactjs.org/'>React</a> (JavaScript library for building UIs) and developed in-house. It aims to meet the latest <a className='underline' href='https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1'>WCAG AA Standards</a> and is responsive. Its role is to display the search interface to the user, pass user search queries or other interactions to the Pride and Prejudice middleware components as JSON objects, and format data returned from Pride and Prejudice into what the user sees and interacts with.</p>

        <h3>Middleware</h3>
        <p>The front end interacts with two pieces of middleware, Pride and Prejudice. While they are interconnected, they serve largely discrete functions and act as brokers between the user interface and user interactions on the front end, and the back end indexes and data sources through APIs.</p>

        <h3>Pride</h3>
        <p>Pride is a JavaScript library that translates user queries generated from the front end and represented as JSON objects. It then passes them along to the Search API to be run against our two local Solr indexes (for catalog and web content) and Summon (for licensed context).</p>
        <p>Where user identification can make a difference for the scope of the query, Pride checks for the user&#39;s logged in status and/or IP range to formulate the appropriate search query. This is important, for example, because users affiliated with the U-M Flint campus get a Flint-library-only catalog scope by default and users affiliated with the Ann Arbor campus get results from Articles that cover all content licensed for their campus when they are logged in or on a campus computer network.</p>
        <p>Pride also maps &quot;Get This&quot; delivery services as available to that user for each item displayed in the Catalog. Get This maps the user&#39;s status to characteristics of item in the catalog, displaying the possible options for the user. For example, items in closed remote storage facilities do not have a &quot;self service&quot; option, and only logged-in University of Michigan users can make interlibrary loan requests.</p>
        <p>Once the searches are conducted in the search indexes, Pride then formats the search results into a JSON object and returns them to the front end for display.</p>

        <h3>Prejudice</h3>
        <p>Prejudice is a Ruby app that handles functions in Library Search beyond the search queries themselves. For example, it queries the Aleph holdings API to return current availability of an item based on circulation data, and indicates which items in the current search results set the users has previously noted as a Library Favorite.</p>
        <p>These results are returned asynchronously to the front end, which explains why there can be a brief delay between the search results loading and the availability and locations of items being displayed.</p>

        <h2>Back End</h2>
        <p>At the foundation of Library Search are indexes and other data sources, outlined here. With the architecture of the middle and front end layers, the library has relative freedom to replace specific components over time without significant changes needed at the front end.</p>

        <h3>Solr</h3>
        <p>Solr (5.5) is used on the back end managed by the library. There is one index for catalog data and another for web content.</p>
        <ul>
          <li>Catalog index built from MARC export from Aleph
            <ul>
              <li>Periodic (monthly) re-indexes</li>
              <li>Nightly adds/edits/deletes for changed records</li>
            </ul>
          </li>
          <li>Web content index
            <ul>
              <li>Content from Drupal (the index updates within 20 minutes of the changes to content managed in the Drupal content management system)</li>
              <li>Content from Omeka online exhibits (the index updates within 20 minutes of changes to exhibit content)</li>
              <li>Content from Springshare&#39;s LibGuides (the index updates weekly based on an XML export from the LibGuides platform)</li>
            </ul>
          </li>
        </ul>
        <p>Library expertise is generated by a separate process; for details, see the &quot;<a className='underline' href='https://apps.lib.umich.edu/blogs/library-tech-talk/putting-librarians-face-search'>Putting a Librarian&#39;s Face on Search</a>&quot; blog post for an overview.</p>

        <h3>APIs</h3>
        <ul>
          <li>Articles index
            <ul>
              <li>Content from our licensed content service, provided by Summon, is retrieved via API to the Summon index</li>
            </ul>
          </li>
          <li>MCommunity (campus LDAP directory)
            <ul>
              <li>Used to verify access to U-M only content</li>
            </ul>
          </li>
          <li>getHoldings API
            <ul>
              <li>The Aleph APIs provided by ExLibris originally did not provide the functionality needed for the catalog, so over a decade ago we wrote our own API that reads the Aleph Oracle tables directly to provide holdings information. The API is a Perl CGI that returns its results as JSON encoded data.</li>
            </ul>
          </li>
        </ul>

        <h2>Keeping Track of Code &amp; Interface Changes</h2>
        <p>Most code is available in the <a className='underline' href='https://github.com/mlibrary/'>University of Michigan Library&#39;s GitHub repository</a> at the following locations:</p>
        <ul>
          <li><a className='underline' href='https://github.com/mlibrary/search'>Search user interface</a></li>
          <li><a className='underline' href='https://github.com/mlibrary/pride'>Pride</a></li>
          <li><a className='underline' href='https://github.com/mlibrary/prejudice'>Prejudice</a></li>
        </ul>
        <p>Updates to these repositories generally summarize the interface or application changes they reflect. There is also a separate, layperson-friendly <a className='underline' href='https://docs.google.com/document/d/1XTEqXZ9wr1SErU36dd-_XYvrcwrF5tEQwx3dDLeey0Y/edit?usp=sharing'>Library Search Change and Update Log</a>.</p>
      </main>
    </div>
  );
};

export default TechnicalOverview;
