import React from 'react'
import { Heading } from '@umich-lib/core'

const GetThisFAQ = () => (
  <section className="card get-this-section">
    <Heading size="medium" level={3} style={{ marginTop: 0 }}>Frequently asked questions</Heading>

    <Heading size="small" level={4}>When can I request a physical copy for contactless pickup?</Heading>
    <p className="u-margin-top-none">Many items in our physical collection have been digitized and made available through the HathiTrust Digital Library. When this is the case, you'll see “Full text available online."</p>

    <p className="u-margin-top-none">For physical items from our collection that aren't digitized and available through HathiTrust, you'll see an option for "Contactless pickup at the library."</p>

    <p className="u-margin-top-none">Due to copyright limitations, we cannot check out multiple copies of an item that has been digitized, which means the HathiTrust version may be the only option available.</p>

  </section>
)

export default GetThisFAQ
