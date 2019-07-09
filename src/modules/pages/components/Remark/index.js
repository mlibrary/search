/** @jsx jsx */
import { jsx } from '@emotion/core'

import remark from 'remark'
import remark2react from 'remark-react'
import {
  Heading,
  Text,
  List,
  SPACING,
  Margins,
  Breadcrumb,
  BreadcrumbItem
} from '@umich-lib/core'

import {
  Link
} from '../../../core'

import {
  setDocumentTitle
} from '../../../a11y'

export default function RemarkContent({ title, content }) {
  setDocumentTitle([].concat(title))
  
  return (
    <Margins>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/everything">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Technical overview</BreadcrumbItem>
      </Breadcrumb>

      <article css={{
        '> *': {
          marginBottom: SPACING["L"]
        }
      }}>
        {
          remark()
            .use(remark2react, {
              remarkReactComponents: {
                'h1': (props) => <Heading size="3XL" level={1} style={{ marginTop: '0' }} {...props} />,
                'h2': (props) => <Heading size="XL" level={2} {...props} />,
                'h3': (props) => <Heading size="M" level={3} {...props} />,
                'a': ({ href, ...rest }) => <Link to={href} {...rest} />,
                'p': Text,
                'img': (props) => <img {...props} style={{ width: '100%' }} />,
                'ul': (props) => <List {...props} type="bulleted" css={{
                  marginBottom: SPACING['M']
                }} />
              }
            })
            .processSync(content).contents
        }
      </article>
    </Margins>
  )
}