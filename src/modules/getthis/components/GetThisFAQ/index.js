import React from 'react'
import { Heading } from '@umich-lib/core'

const GetThisFAQ = () => (
  <section className="card get-this-section">
    <Heading size="medium" level={3} style={{ marginTop: 0 }}>Frequently asked questions</Heading>

    <Heading size="small" level={4}>When can I request a physical copy for contactless pickup?</Heading>
    <p className="u-margin-top-none">Many items in our physical collection have been digitized and made available through the HathiTrust Digital Library. When this is the case, you'll see “Full text available online."</p>

    <p className="u-margin-top-none">For physical items from our collection that aren't digitized and available through HathiTrust, you'll see an option for "Contactless pickup at the library."</p>


    <Heading size="small" level={4}>What should I do if an item has multiple volumes and the one I need isn’t available in HathiTrust or for contactless pickup?</Heading>
    
    <p className="u-margin-top-none">When titles available through HathiTrust Digital Library have multiple volumes, we have to set the whole group as “Full text available online” even if some volumes are not digitized. If the one you need is not available in HathiTrust, please contact <a href="mailto:circservices@umich.edu" className="underline">circservices@umich.edu</a>.</p>

  </section>
)

export default GetThisFAQ
