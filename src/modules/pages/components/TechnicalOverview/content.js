import schematicImage from './schematic.png'

export default `
# Technical overview

Library Search (<https://search.lib.umich.edu/>) was built by the [Design & Discovery](https://www.lib.umich.edu/library-information-technology/design-discovery) department at the University of Michigan Library. It was originally based on the [CLIO project](https://github.com/cul/clio-spectrum) from Columbia University, but has evolved significantly into its own application over its two-year development path. It relies on many open source technologies, ([Solr](http://lucene.apache.org/solr/), [Blacklight](http://projectblacklight.org/), [Rails](https://rubyonrails.org/), [React.js](https://reactjs.org/), [CSL](https://citationstyles.org/), and many others).

Library Search is built in three main layers to allow for flexibility in the front end and back end data repositories. A different front end application should not require rewriting the search queries, while conversely changes to one or more back-end search indexes or repositories would not require updates to the user interface. The middle layer acts as translator between the front and back ends.

For more information about Library Search, please contact <library-search-feedback@umich.edu>.

## High-Level Schematic

![](${schematicImage})

## Front-End / User Interface

The user interface for Library Search, shown at the top of the above schematic, is a Single Page Application built with [React](https://reactjs.org/) (JavaScript library for building UIs) and developed in-house. It aims to meet the latest [WCAG AA Standards](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1) and is responsive. Its role is to display the search interface to the user, pass user search queries or other interactions to the Pride and Prejudice middleware components as JSON objects, and format data returned from Pride and Prejudice into what the user sees and interacts with.

### Middleware

The front end interacts with two pieces of middleware, Pride and Prejudice. While they are interconnected, they serve largely discrete functions and act as brokers between the user interface and user interactions on the front end, and the back end indexes and data sources through APIs.

### Pride

Pride is a JavaScript library that translates user queries generated from the front end and represented as JSON objects. It then passes them along to the Search API to be run against against our two local Solr indexes (for catalog and web content) and Summon (for licensed context).

Where user identification can make a difference for the scope of the query, Pride checks for the user's logged in status and/or IP range to formulate the appropriate search query. This is important, for example, because users affiliated with the U-M Flint campus get a Flint-library-only catalog scope by default and users affiliated with the Ann Arbor campus get results from Articles that cover all content licensed for their campus when they are logged in or on a campus computer network.

Pride also maps "Get This" delivery services as available to that user for each item displayed in the Catalog. Get This maps the user's status to characteristics of item in the catalog, displaying the possible options for the user. For example, items in closed remote storage facilities do not have a "self service" option, and only logged-in University of Michigan users can make interlibrary loan requests.

Once the searches are conducted in the search indexes, Pride then formats the search results into a JSON object and returns them to the front end for display.

### Prejudice

Prejudice is a Ruby app that handles functions in Library Search beyond the search queries themselves. For example, it queries the Aleph holdings API to return current availability of an item based on circulation data, and indicates which items in the current search results set the users has previously noted as a Library Favorite.

These results are returned asynchronously to the front end, which explains why there can be a brief delay between the search results loading and the availability and locations of items being displayed.

## Back End

At the foundation of Library Search are indexes and other data sources, outlined here. With the architecture of the middle and front end layers, the library has relative freedom to replace specific components over time without significant changes needed at the front end.


### Solr

Solr (5.5) is used on the back end managed by the library. There is one index for catalog data and another for web content.

- Catalog index built from MARC export from Aleph
  - Periodic (monthly) re-indexes
  - Nightly adds/edits/deletes for changed records
- Web content index
  - Content from Drupal (the index updates within 20 minutes of the changes to content managed in the Drupal content management system)
  - Content from Omeka online exhibits (the index updates within 20 minutes of changes to exhibit content)
  - Content from Springshare's LibGuides (the index updates weekly based on an XML export from the LibGuides platform)

Library expertise is generated by a separate process; for details, see the "[Putting a Librarian's Face on Search](https://www.lib.umich.edu/blogs/library-tech-talk/putting-librarians-face-search)" blog post for an overview.


### APIs

- Articles index
  - Content from our licensed content service, provided by Summon, is retrieved via API to the Summon index
- MCommunity (campus LDAP directory)
  - Used to verify access to U-M only content
- Favorites
  - Drupal module for maintaining user information and saved items
- getHoldings API
  - The Aleph APIs provided by ExLibris originally did not provide the functionality needed for the catalog, so over a decade ago we wrote our own API that reads the Aleph Oracle tables directly to provide holdings information. The API is a Perl CGI that returns its results as JSON encoded data.

## Keeping Track of Code & Interface Changes
Most code is available in the [University of Michigan Library's GitHub repository](https://github.com/mlibrary/) at the following locations:

- [Search user interface](https://github.com/mlibrary/search)
- [Pride](https://github.com/mlibrary/pride)
- [Prejudice](https://github.com/mlibrary/prejudice)

Updates to these repositories generally summarize the interface or application changes they reflect. There is also a separate, layperson-friendly [Library Search Change and Update Log](https://docs.google.com/document/d/1XTEqXZ9wr1SErU36dd-_XYvrcwrF5tEQwx3dDLeey0Y/edit?usp=sharing).

`