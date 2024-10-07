import React, { Fragment, useState } from 'react'
import Header from '../Header/Header'
import Routers from '../../routers/Routers'
function Layout() {
  return (
    <Fragment>
        <Header />
        <div>
            <Routers/>
        </div>
    </Fragment>
    
  )
}

export default Layout