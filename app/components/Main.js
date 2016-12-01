import React from 'react'

import { Header, SearchBox, DatastoreNavigation } from './'
import { prideSwitchToDatastore, prideRunSearch } from './../pride_interface.js'

require("../assets/stylesheets/main.scss")


export const Main = (props) => {
  return (
    <main>
      <Header/>
      <SearchBox/>
      <DatastoreNavigation/>
      <div className="container container-narrow">
        {React.cloneElement(props.children, props)}
      </div>
    </main>
  )
}
