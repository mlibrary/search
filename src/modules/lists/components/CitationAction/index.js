import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@umich-lib/tabs'
import {
  cite
} from '../../../citations'

class CitationText extends React.Component {
  render() {
    return (
      <textarea
        style={{
          marginTop: '0.5rem',
          marginBottom: '0',
          width: '100%',
          padding: '0.5rem 0.75rem'
        }}
        value={this.props.value}
        onFocus={(e) => e.target.select()}
        readOnly
      />
    )
  }
}

const citation_options = [
  {
    name: 'MLA'
  },
  {
    name: 'APA'
  },
  {
    name: 'Chicago'
  },
  {
    name: 'IEEE'
  },
  {
    name: 'NLM'
  },
  {
    name: 'BibTex'
  }
]

class CitationAction extends Component {
  componentDidMount() {
    //let citation = cite({}, 'chicago-annotated-bibliography')

   // console.log('citation', citation)
  }

  render() {
    return (
      <section className="lists-action y-spacing">
        <Tabs>
          <TabList>
            {citation_options.map(co => (
              <Tab key={co.name}>{co.name}</Tab>
            ))}
          </TabList>

          <TabPanel>
            <CitationText value="..." />
          </TabPanel>
          <TabPanel>
          <CitationText value="Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing."/>
          </TabPanel>
          <TabPanel>
            <CitationText value="Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing."/>
          </TabPanel>
          <TabPanel>
            <CitationText value="Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing."/>
          </TabPanel>
          <TabPanel>
            <CitationText value="Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing."/>
          </TabPanel>
          <TabPanel>
            <CitationText value="Jacques, G., Le Treut, H. (2005). Climate change. Paris: UNESCO Publishing."/>
          </TabPanel>
        </Tabs>
      </section>
    )
  }
}

export default CitationAction;
