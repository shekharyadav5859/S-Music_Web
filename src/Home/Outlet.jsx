import React from 'react'
import Navber from '../Header/Navber'
import Footer from '../Footer/Footer'

import { Outlet } from 'react-router-dom'

export default function Luylet() {
  return (
    <>
    <Navber/>
   <Outlet/>
    <Footer/>
    
    </>
  )
}
