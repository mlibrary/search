import React from 'react'
import remark from 'remark'
import remark2react from 'remark-react'
import images from 'remark-images'
import {
  Heading,
  Text,
  List
} from '@umich-lib/core'

import content from './content.js';

class TechnicalOverview extends React.Component {
  render() {
    return (
      <div className="container container-narrow">
        <article className="page">
          {
            remark()
              .use(images)
              .use(remark2react, {
                remarkReactComponents: {
                  'h1': (props) => <Heading size="xlarge" level={1} style={{ marginTop: '0' }} {...props} />,
                  'h2': (props) => <Heading size="large" level={2} {...props} />,
                  'h3': (props) => <Heading size="medium" level={3} {...props} />,
                  'a': (props) => <a {...props} className="underline" />,
                  'p': Text,
                  'img': (props) => <img {...props} style={{ width: '100%' }} />,
                  'ul': (props) => <List {...props} type="bulleted" />
                }
              })
              .processSync(content).contents
          }
        </article>
      </div>
    )
  }
}

export default TechnicalOverview