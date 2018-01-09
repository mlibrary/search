import React from 'react'
import { connect } from 'react-redux'

import { requestGetThis } from '../../../pride';
import { DetailsList } from '../../../core'

import PickItUpAtLibrary from '../PickItUpAtLibrary'

class GetThis extends React.Component {
  componentDidMount() {
    console.log('did mount')

    const datastoreUid = 'mirlyn'
    const recordUid = '000675299'
    const barcode = '39015035425662'

    const getThis = requestGetThis({
      datastoreUid,
      recordUid,
      barcode,
    })
  }

  render() {
    return (
      <article className="container container-narrow">
        <section>
          <h1 className="u-margin-bottom-none">Get This</h1>
          <p className="u-margin-top-none">Request books and other media to the campus library or department most convenient for you.</p>
        </section>

        <section className="card get-this-section">
          <h2 className="get-this-section-heading">Record title</h2>

        </section>

        <section className="card get-this-section">
          <h2 className="get-this-section-heading">How would you like to get this item?</h2>

          <DetailsList className="get-this-options">
            <PickItUpAtLibrary />
          </DetailsList>
        </section>

        <section className="card get-this-section">
          <h3 className="get-this-section-heading">Frequently asked questions</h3>

          <h4 className="u-margin-bottom-none">I can't find my book on the shelf. Can you look for it?</h4>
          <p className="u-margin-top-none">Yes! Request it for pickup and we will take a look.</p>

          <h4 className="u-margin-bottom-none">How will I receive my material?</h4>
          <p className="u-margin-top-none">Receipt of your material depends on the services you select</p>

          <ul>
            <li><b>Pickups</b>, <b>holds</b>, and <b>recalls</b> are delivered to the library you chose.</li>
            <li className="u-margin-top-none"><b>Scans</b> are sent electronically and you will receive an email when a PDF is available.</li>
            <li className="u-margin-top-none"><b>Interlibrary Loans</b> are delivered to your departmental mailbox or designated delivery site.</li>
          </ul>

          <a href="http://guides.lib.umich.edu/c.php?g=283092&p=1886080" className="underline">More about Get This options</a>
        </section>
      </article>
    )
  }
}

export default GetThis;
