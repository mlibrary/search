import React from 'react';
import { setDocumentTitle } from '../../../a11y';
import { Anchor } from '../../../reusable';
import schematicImage from './schematic.png';

function AboutLibrarySearch () {
  setDocumentTitle(['About Library Search']);

  return (
    <div className='container container-narrow'>
      <main className='container__rounded page'>
        <h1 className='u-margin-top-none' id='maincontent' tabIndex='-1'>About Library Search</h1>
        <p>Library Search is the University of Michigan Library's discovery interface. Launched in July 2018, it is designed to provide a consistent user experience across the physical and electronic resources the library provides. The Everything view displays a few results matching a user's keyword search under separate panels for each of the five categories of information: Catalog, Articles, Databases, Online Journals, and Guides & More. Each of these categories has an in-depth view that enables users to drill down into those materials to find what best meets their needs.</p>
        <h2>Overview</h2>
        <p>Although the user interface is intentionally similar across search categories, it contains a variety of information sources where each kind of data are managed:</p>
        <ul>
          <li>Catalog and Online Journals are managed in our Alma Library Management System and are exported to a Solr index</li>
          <li>Databases and Guides &amp; More are drawn from local web content management systems and are exported to a Solr index</li>
          <li>Articles is managed through the Ex Libris Central Discovery Index through Primo VE's APIs</li>
          <li>Catalog Browse (in development in spring 2022) enables call number, subject authority file, and author authority file browsing of the library's catalog.</li>
        </ul>
        <p>For data sources other than Articles, metadata records are extracted from their source, transformed, and loaded into Solr indexes. The front end interacts with these search indexes through two interrelated sets of code:</p>
        <ul>
          <li><em>Pride</em>, which handles searches</li>
          <li><em>Prejudice</em>, which handles integrations with the campus directory for authentication and other services</li>
        </ul>
        <p><img src={schematicImage} alt='' style={{ height: 'auto', maxWidth: '100%' }} /></p>
        <h2>Flexibility</h2>
        <p>Library Search is designed to separate the user experience from the particular system that provides or manages the data. This allowed us, in summer 2021, to switch library management systems and article discovery systems from Aleph and Summon to Alma and Primo with minimal need for changes to the user experience. This approach brings several other benefits, as well:</p>
        <ul>
          <li>We are able to tune relevancy ranking of all the search categories (except Articles, which is provided by API via Primo) to meet our needs and make the user interface consistent across all the kinds of data we include (Catalog, Articles, Databases, web content, etc.).</li>
          <li>We are able to display any/all MARC data (and to consolidate or remove fields/subfields) for Catalog records, with a goal toward providing users with the record data they need.</li>
          <li>We are able to integrate delivery services for catalog materials at a much more granular level, offering different kinds of users different services, depending on the item type, circulation status, etc.</li>
          <li>We are able to keep user identities private from vendors, at least until such time as the user goes to a full-text site and interacts with content there.</li>
        </ul>
        <h2>Management</h2>
        <p>Library Search's front- and back-end systems are managed by staff from the <Anchor href='https://www.lib.umich.edu/about-us/our-divisions-and-departments/library-information-technology/design-and-discovery'>Design and Discovery</Anchor>, <Anchor href='https://www.lib.umich.edu/about-us/our-divisions-and-departments/library-information-technology/automation-indexing-and'>Automation, Indexing, and Metadata</Anchor>, and <Anchor href='https://www.lib.umich.edu/about-us/our-divisions-and-departments/library-information-technology/digital-library-applications'>Digital Library Applications</Anchor> departments within the <Anchor href='https://www.lib.umich.edu/about-us/our-divisions-and-departments/library-information-technology'>Library Information Technology</Anchor> division. All of the software we have developed is <Anchor href='https://github.com/mlibrary'>available in GitHub</Anchor> under open source licenses.</p>
        <p>The overall Library Search service is stewarded by the Library Search Service Team, co-chaired by Karen Reiman-Sendi and Ken Varnum.</p>
        <h2>Code repositories</h2>
        <p>The various applications developed at the University of Michigan Library are available through the <Anchor href='https://github.com/mlibrary/'>University Library's GitHub</Anchor> repository:</p>
        <ul>
          <li><Anchor href='https://github.com/mlibrary/pride'>pride</Anchor> -- A JavaScript library for interfacing with the U-M Library search backend</li>
          <li><Anchor href='https://github.com/mlibrary/prejudice'>prejudice</Anchor> -- A companion to pride</li>
          <li><Anchor href='https://github.com/mlibrary/search'>search</Anchor> -- A single-page web application that consolidates the library's multiple discovery interfaces into one</li>
          <li><Anchor href='https://github.com/mlibrary/spectrum'>spectrum</Anchor> -- The backend for Search</li>
          <li><Anchor href='https://github.com/mlibrary/catalog-browse'>catalog-browse</Anchor> -- The call number, author authority file, subject authority file application (under development as of April 2022)</li>
        </ul>
        <h2>More information</h2>
        <p>If you are curious to know more about Library Search, please contact <Anchor href='https://www.lib.umich.edu/users/varnum'>Ken Varnum</Anchor>, Senior Program Manager and Discovery Strategist.</p>
      </main>
    </div>
  );
};

export default AboutLibrarySearch;
