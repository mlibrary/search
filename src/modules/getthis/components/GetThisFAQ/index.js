import React from 'react'
import { Heading } from '@umich-lib/core'

const GetThisFAQ = () => (
  <section className="card get-this-section">
    <Heading size="medium" level={3} style={{ marginTop: 0 }}>Frequently asked questions</Heading>

    <Heading size="small" level={4}>Contactless pickup isn’t listed as an option for some physical items. Instead I see “Full text available online” as part of HathiTrust. Why is that?</Heading>
    <p className="u-margin-top-none">Items available through HathiTrust Emergency Temporary Access (ETAS) are not available for contactless pickup at this time due to the ETAS terms of services related to copyrighted works.</p>

  </section>
)

export default GetThisFAQ
