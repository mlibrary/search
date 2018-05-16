import React from 'react'
import {
  setDocumentTitle
} from '../../../a11y'
import { Link } from 'react-router-dom'

const marginBottomNone = { margin: 0 }
const marginBottom = {
  ...marginBottomNone,
  marginBottom: '1rem'
}

class RoadMapPage extends React.Component {
  componentDidMount() {
    setDocumentTitle(['Feature Road Map'])
  }

  render() {
    return (
      <div className="container container-narrow">
        <article className="page">
          <section>
            <h1 style={{ marginTop: 0 }}>Feature Road Map</h1>
            <p>The U-M Library Search interface is under ongoing development. While it will become the default search tool on April 30, it will not replace <a className="underline" href="http://mirlyn.lib.umich.edu/">Mirlyn</a>, <a className="underline" href="https://www.lib.umich.edu/articles/search">ArticlesPlus</a>, <a className="underline" href="https://www.lib.umich.edu/searchtools">Search Tools</a>, and <a className="underline" href="https://www.lib.umich.edu/">MLibrary Search</a> until July 30. During this period, work continues in several areas.</p>
          </section>

          <section>
            <h2>What's To Come</h2>
            <p>Work still underway includes:</p>
            <ul>
              <li><b>Accessibility</b> -- Improvements for assistive technology such as screen readers. See our <Link className="underline" to="/accessibility">Accessibility</Link> page for details.</li>
              <li><b>Ask a Library Specialist</b> -- Expanded display of U-M librarians and staff who have expertise in fields related to your search, to get individual help when you need it.</li>
              <li><b>Library Favorites</b> -- An update to the Library Favorites tool that allows you to save search results for future use.</li>
              <li><b>Smart Results</b> -- Recommended databases and journals based on your search, along with spelling correction and suggestions.</li>
            </ul>
          </section>

          <section>
            <h2>Feedback Wanted</h2>

            <p>We want and appreciate your feedback on our new search interface. When you see something you wish were different -- or like -- let us know through the feedback link below or by contacting us through one of the email addresses below.</p>

            <p style={marginBottomNone}><b>Ken Varnum</b></p>
            <p style={marginBottomNone}>Co-Chair of the Search Project Team</p>
            <p style={marginBottomNone}>Senior Program Manager</p>
            <p style={marginBottom}><a href="mailto:varnum@umich.edu" style={{ textDecoration: 'underline' }}>varnum@umich.edu</a></p>

            <p style={marginBottomNone}><b>Scott Dennis</b></p>
            <p style={marginBottomNone}>Co-Chair of the Search Project Team</p>
            <p style={marginBottomNone}>Librarian for Philosophy, General Reference, and Core Electronic Resources</p>
            <p style={marginBottomNone}><a href="mailto:sdenn@umich.edu" style={{ textDecoration: 'underline' }}>sdenn@umich.edu</a></p>
          </section>
        </article>
      </div>
    )
  }
}

export default RoadMapPage
