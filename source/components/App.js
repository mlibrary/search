import React from 'react'

import { SearchBox } from './SearchBox.js'
import { Datastores } from './Datastores.js'
import { store } from '../store/index.js'

require("../../assets/stylesheets/main.scss")

export class App extends React.Component {
  render() {
    return (
      <main>
        <SearchBox/>
        <Datastores
          state = {store.getState()}
        />
      </main>
    )
  }
}
