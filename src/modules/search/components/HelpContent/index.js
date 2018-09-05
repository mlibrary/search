import React from 'react'
import { Link } from 'react-router-dom'
import {
  setDocumentTitle
} from '../../../a11y'
import {
  Breadcrumb
} from '../../../reusable'


class HelpContent extends React.Component {
  componentDidMount() {
    setDocumentTitle(['How to Use Search'])
  }

  render() {
    return (
      <div className="container container-narrow">        
        <article className="page">
          <h1 style={{ marginTop: 0 }}>How to Use Search</h1>

          <section>
            <h2>What is this new search tool?</h2>
            <p>
              U-M Library Search is a new search interface that consolidates multiple older search interfaces from the library’s website in one place: the “MLibrary” search, Mirlyn, ArticlesPlus, Search Tools Databases, and Search Tools Journals. The U-M Library Search interface replaced the old interfaces on July 30, 2018.
            </p>
            <p>
              The starting point is the Everything search, which shows a small number of results from each of the other categories (Library Catalog Search, Library Articles Search, Library Databases Search, Library Journals Search, and Library Website Search). You can switch to see a specific category of results by clicking the category name below the search box either before you start your search or once results display.
            </p>
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
                  <td><Link className="underline" to="/everything?query=victors">victors</Link></td>
                  <td>Will search for items with the words <i>victors</i> in the item.</td>
                </tr>
                <tr>
                  <td><Link className="underline" to="/everything?query=victors valiant">victors valiant</Link></td>
                  <td>Will search for items with both the words victors and valiant in the item.</td>
                </tr>
                <tr>
                  <td><Link className="underline" to='/everything?query="victors valiant"'>"victors valiant"</Link></td>
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
                  <td><Link className="underline" to="/everything?query=victors OR valiant">victors OR valiant</Link></td>
                  <td>Will search for items with the words <i>victors</i> or <i>valiant</i> in the item.</td>
                </tr>
                <tr>
                  <td><Link className="underline" to="/everything?query=victors AND valiant">victors AND valiant</Link></td>
                  <td>Will search for items with both the <i>victors</i> and <i>valiant</i> in the item.</td>
                </tr>
                <tr>
                  <td><Link className="underline" to='/everything?query="victors valiant" OR "conqu`ruing heroes"'>"victors valiant" OR "conqu`ring heroes"</Link></td>
                  <td>Will search for items with one or both of <i>victors valiant</i> or <i>conqu’ring heroes</i> in the item.</td>
                </tr>
                <tr>
                  <td><Link className="underline" to='/everything?query=%2B"victors valiant" %2Dheroes'>+"victors valiant" -heroes</Link></td>
                  <td>Will display items that must have the phrase <i>victors valiant</i> and must not have <i>heroes</i></td>
                </tr>
                <tr>
                  <td><Link className="underline" to='/everything?query=football 	%2BWolverines %2DBuckeyes'>football +Wolverines -Buckeyes</Link></td>
                  <td>Will display items that may have the word <i>football</i>, must have the word <i>Wolverines</i>, and must not have the word <i>Buckeyes</i></td>
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
                  <td><Link className="underline" to="/everything?query=*">*</Link></td>
                  <td>An asterisk will retrieve all items, which you can then filter.</td>
                </tr>
              </tbody>
            </table>

            <p>The starting point is the Everything search, which shows a small number of results from each of the other categories (Catalog, Articles, Databases, Journals, Website). You can switch to see a specific category of results by clicking the category name below the search box either before you start your search or once results display.</p>
          </section>

          <section>
            <h2>What are filters?</h2>
            <p>When you do a search in Catalog, Articles, Databases, Journals, or Library Website, you will see a list of results with filters. These filters let you quickly narrow the list of results by category. Available filters depend on which category of results you are looking at. In Catalog, they include categories such as subject, academic discipline, and format. In Articles, they include publication date, format, and subject.</p>

            <p>Apply a filter by clicking in the list and remove it by clicking the ‘x’ at the top of the filter column next to the one you want to remove.</p>
          </section>

          <section>
            <h2>What is advanced search?</h2>
            <p>Each category of search results has an advanced search screen that you can access from the <b>Advanced</b> link to the right of the search box. Advanced search allows you to select specific fields a search word appears in, as well as apply other requirements. As with filters, these options will vary based on the category you’re searching in.</p>

            <p>For example, in Catalog you can look for Hail to the Victors in the title field and Elbel in the author field. You can also specify publication date ranges, the language in which the item was written, its format (book, video, microfilm, etc.), place of publication, and the library in which the item is held.</p>
          </section>

          <section>
            <h2>How do I email, text, or export records?</h2>
            <p>When you do a search in Catalog, Articles, Databases, Journals, or Library Website, you can add one or more search results to a temporary list by clicking “Add to list”. <b>Your list is erased when you close your browser</b>. Later this summer, you will be able to use Favorites to save items in your library account.</p>

            <p>Once you have added at least one item to the list, a “Go to my list” link will appear at the top of the results. Click that to see the export options:</p>

            <ul>
              <li><b>Email</b> will let logged-in users email the list of items to yourself or someone else</li>
              <li><b>Text</b> will let logged-in users send a text with the list of items to a cell phone in the United States or Canada</li>
              <li><b>Export RIS</b> will download a file to your computer that can be imported into many citation management tools</li>
              <li><b>Endnote</b> will download a file to your computer that can be imported into the Endnote citation management software</li>
              <li><b>Refworks</b> will download a file to your computer that can be imported into the Refworks citation management software</li>
              <li><b>Zotero</b> will download a file to your computer that can be imported into the Zotero citation management software</li>
            </ul>

            <p>When you are viewing a single item’s full details (after you have clicked an item title in any search result), you have access to the same list of export options.</p>

            <p><b>Lists are kept separately for each search category</b> -- catalog items are in your Catalog list, articles are in your Articles list, etc.</p>
          </section>

          <section>
            <h2>How do I browse databases and journals by subject or title?</h2>

            <p>When you go to either the Databases or Journals starting pages there is a link to “<Link className="underline" to="/databases/browse">Browse all Databases</Link>” or “<Link className="underline" to="/journals/browse">Browse all Journals</Link>,” respectively. When you are looking at a search result from either Databases or Journals, these Browse links are shown at the bottom of the Filters.</p>

            <p>Either way, the links take you to a page that allows you to see all databases or journals listed alphabetically by title or by subject. Click on a first letter or on a subject to see all the items that match.</p>
          </section>

          <section>
            <h2>How do I get more help?</h2>

            <p>Contact <a className="underline" href="https://www.lib.umich.edu/ask-librarian">Ask a Librarian</a> for chat, email, or phone assistance. See <a className="underline" href="https://www.lib.umich.edu/get-research-help">Get Research Help</a> for additional resources.</p>
          </section>
        </article>
      </div>
    )
  }
}

export default HelpContent
