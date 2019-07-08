/** @jsx jsx */
import { jsx } from '@emotion/core'

import {
  Margins,
  SPACING
} from '@umich-lib/core'

import { Link } from '../../../core'

export default function Feedback() {
  return (
    <Margins>
      <div 
        css={{
          marginTop: SPACING['L'],
          marginBottom: SPACING['L']
        }}
      >
        <Link
          to="https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf"
        >
          Give feedback about this page
        </Link>
      </div>
    </Margins>
  )
}
