import React from 'react'

const marginBottomNone = { margin: 0 }
const marginBottom = {
  ...marginBottomNone,
  marginBottom: '1rem'
}

class RoadMapPage extends React.Component {
  componentDidMount() {
    document.title = `Feature Road Map · Library Search`
  }

  render() {
    return (
      <div className="container container-narrow">
        <article className="page">
          <section>
            <h1 style={{ marginTop: 0 }}>Feature Road Map</h1>
            <p style={{ fontSize: '1.2rem' }}>The beta search interface is under continual development as the University Library works on secondary features. It will remain in beta, with new features periodically being added, through the Winter 2018 Term. We anticipate this site will replace current Mirlyn, ArticlesPlus, Search Tools, and the MLibrary search at the start of the Spring/Summer 2018 Term.</p>
          </section>

          <section>
            <h2>What's To Come</h2>
            <p>Major features still in development include:</p>
            <ul>
              <li><b>Select and act on items</b> -- The ability to select items in search results to share with others or generate citations.</li>
              <li><b>Service and Subject Experts</b> -- Better display of librarians and staff who are experts in fields related to your search, to get individual help when you need it.</li>
              <li><b>Library Favorites</b> -- An update to the Library Favorites tool that allows you to save search results for future use.</li>
              <li><b>Smart Results</b> -- Recommended databases and journals based on your search, along with spelling correction and suggestions.</li>
              <li><b>Browse Online Journals and Databases</b> -- The ability to browse by subject or alphabetically by name.</li>
            </ul>
          </section>

          <section>
            <h2>Feedback Wanted</h2>
            <p>We want and appreciate your feedback on the beta version of our new search interface. When you see something you wish were different -- or like -- help us make improvements by <a href="https://umich.qualtrics.com/jfe/form/SV_9SH992ZSrUoTeIJ" style={{ textDecoration: 'underline' }}>taking our quick survey</a>.</p>

            <p style={marginBottomNone}><b>Search Beta Feedback Email</b></p>
            <p style={marginBottom}><a href="mailto:search-beta-feedback@umich.edu" style={{ textDecoration: 'underline' }}>search-beta-feedback@umich.edu</a></p>

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
