import React from 'react'
import Heading from '@umich-lib/heading'

const GetThisFAQ = () => (
  <section className="card get-this-section">
    <Heading size="medium" level={3} style={{ marginTop: 0 }}>Frequently asked questions</Heading>

    <Heading size="small" level={4}>I can't find my book on the shelf. Can you look for it?</Heading>
    <p className="u-margin-top-none">Yes! Request it for pickup and we will take a look.</p>

    <Heading size="small" level={4}>How will I receive my material?</Heading>
    <p className="u-margin-top-none">Receipt of your material depends on the services you select</p>

    <ul>
      <li><b>Pickups</b>, <b>holds</b>, and <b>recalls</b> are delivered to the library you chose.</li>
      <li className="u-margin-top-none"><b>Scans</b> are sent electronically and you will receive an email when a PDF is available.</li>
      <li className="u-margin-top-none"><b>Interlibrary Loans</b> are delivered to your departmental mailbox or designated delivery site.</li>
    </ul>

    <a href="https://www.lib.umich.edu/borrowing-and-circulation/get" className="underline">More about Get This options</a>
  </section>
)

export default GetThisFAQ
