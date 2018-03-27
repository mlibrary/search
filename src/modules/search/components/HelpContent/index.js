import React from 'react'

import {
  setDocumentTitle
} from '../../../a11y'

class HelpContent extends React.Component {
  componentDidMount() {
    setDocumentTitle(['How to Use Search'])
  }

  render() {
    return (
      <div className="container container-narrow">
        <article className="page">
          <section>
            <h1 style={{ marginTop: 0 }}>How to Use Search</h1>
            <p style={{ fontSize: '1.2rem' }}>You can search using keywords, exact phrases, AND or ORs, and filters to narrow your search results.</p>
          </section>

          <section>
            <h2>What is this new search tool?</h2>
            <p>The U-M Library Search (Mirlyn) Beta lets you search across many of our existing search interfaces in this one tool. We've consolidated: <a href="https://www.lib.umich.edu/searchtools">MLibrary Search</a>, <a href="https://mirlyn.lib.umich.edu/">Mirlyn</a>, <a href="https://www.lib.umich.edu/searchtools#articlesplus/search">ArticlesPlus</a>, <a href="https://www.lib.umich.edu/searchtools#databases/search">Search Tools Databases</a>, and <a href="https://www.lib.umich.edu/searchtools#journals/search">Search Tools Journals</a> into this single interface.</p>

            <p>The starting point is the Everything search, which shows a small number of results from each of the other categories (Catalog, Articles, Databases, Journals, Website). You can switch to see a specific category of results by navigating the category groups before you start your search or once results display.</p>
          </section>

          <section>
            <h2>How do I search by keywords?</h2>
            <p>Type the word(s) or phrases in the search box. You can use quotation marks to note phrases, and you can use AND and OR (in all-caps) to ensure that both terms must be in the results, or that one or the other term may be in the results.</p>

            <h3>Keyword searching</h3>
            <table>
              <tbody>
                <tr>
                  <th>Example</th>
                  <th>Explained</th>
                </tr>
                <tr>
                  <td><a href="/everything?query=victors">victors</a></td>
                  <td>Will search for items with the words <i>victors</i> in the item.</td>
                </tr>
                <tr>
                  <td><a href="/everything?query=victors valiant">victors valiant</a></td>
                  <td>Will search for items with both the words victors and valiant in the item.</td>
                </tr>
                <tr>
                  <td><a href='/everything?query="victors valiant"'>"victors valiant"</a></td>
                  <td>Will search for items with the exact phrase victors valiant in the item.</td>
                </tr>
              </tbody>
            </table>

            <h3>AND or OR searching</h3>
            <table>
              <tbody>
                <tr>
                  <th>Example</th>
                  <th>Explained</th>
                </tr>
                <tr>
                  <td><a href="/everything?query=victors OR valiant">victors OR valiant</a></td>
                  <td>Will search for items with the words <i>victors</i> or <i>valiant</i> in the item.</td>
                </tr>
                <tr>
                  <td><a href="/everything?query=victors AND valiant">victors AND valiant</a></td>
                  <td>Will search for items with both the <i>victors</i> and <i>valiant</i> in the item.</td>
                </tr>
                <tr>
                  <td><a href='/everything?query="victors valiant" OR "conqu`ruing heroes"'>"victors valiant" OR "conqu`ring heroes"</a></td>
                  <td>Will search for items with one or both of <i>victors valiant</i> or <i>conqu’ring heroes</i> in the item.</td>
                </tr>
              </tbody>
            </table>

            <h3>Retrieve all items</h3>
            <table>
              <tbody>
                <tr>
                  <th>Example</th>
                  <th>Explained</th>
                </tr>
                <tr>
                  <td><a href="/everything?query=*">*</a></td>
                  <td>An asterisk will retrieve all items, which you can then filter.</td>
                </tr>
              </tbody>
            </table>

            <p>The starting point is the Everything search, which shows a small number of results from each of the other categories (Catalog, Articles, Databases, Journals, Website). You can switch to see a specific category of results by clicking the category name below the search box either before you start your search or once results display.</p>
          </section>

          <section>
            <h2>What are filters?</h2>
            <p>When you do a search in Catalog, Articles, Databases, Journals, or Website, you will have both results and filters. Filters let you quickly narrow down the list of results by category. Filters are different depending on which category of results you are looking at. In Catalog, they include items such as subject, academic discipline, and format. In Articles, they include publication date, format, and subject.</p>

            <p>Apply a filter by selecting it in the list and remove it by deselecting it from current filters section.</p>
          </section>

          <section>
            <h2>What is advanced search?</h2>
            <p>Each category of search results has an advanced search screen that you can access from the Advanced link to the right of the search box. Advanced search allows you to select specific fields a search word appears in, as well as apply other requirements. As with filters, these options will vary based on the category you’re searching in.</p>

            <p>For example, in Catalog you can look for Hail to the Victors in the title field and Elbel in the author field. You can also specify publication date ranges, the language in which the item was written, its format (book, video, microfilm, etc.), place of publication, and the library in which the item is held.</p>
          </section>
        </article>
      </div>
    )
  }
}

export default HelpContent
