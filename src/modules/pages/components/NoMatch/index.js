import React from 'react';
import { Heading, Text, List } from "@umich-lib/core";

import {
  Link
} from 'react-router-dom'
import {
  setDocumentTitle
} from '../../../a11y'

const NoMatch = function NoMatch() {
  setDocumentTitle(['404'])

  return (
    <div className="container container-narrow">
      <div className="page-not-found-container">
        <Heading size="xlarge" level={1}>
          Page not found - 404
        </Heading>

        <Text lede>We can't find the page you're looking for.</Text>

        <Heading size="medium" level={2}>
          Try these options instead
        </Heading>
        <List type="bulleted" style={{ maxWidth: '32em' }}>
          <li>
            <Text>Start over from <Link to="/everything" className="underline">the homepage</Link>.</Text>
          </li>
          <li>
            <Text>The link to the resource you're looking for may have changed, please
            search for the title or related keyword to check for current access.</Text>
          </li>
          <li>
          <Text>
            <Link to="/databases/browse" className="underline">Browse all Databases</Link> or <Link to="/onlinejournals/browse" className="underline">Browse all Online Journals</Link> to view comprehensive lists
            of current library resources.</Text>
          </li>
          <li>
          <Text>
            <a href="https://www.lib.umich.edu/ask-librarian" className="underline">Ask a librarian</a> and we'll help you find what you're
            looking for!</Text>
          </li>
        </List>
      </div>
    </div>
  );
};

export default NoMatch;
