/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link as RouterLink } from 'react-router-dom'
import {
  Link as DSLink,
  LINK_STYLES
} from '@umich-lib/core'


function Link({ to, kind = 'default', ...other }) {
  /*
    The check if the href is an internal link.
  */
  if (to.startsWith('/')) {
    return (
      <RouterLink
        to={to}
      ><span css={{
        ...LINK_STYLES[kind]
      }} {...other} /></RouterLink>
    )
  }

  // A regular anchor link. Probably an external link.
  return (
    <DSLink href={to} {...other} kind={kind} />
  )
}

export default Link