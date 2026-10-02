
import React, { useContext } from 'react'

import HeroSection from '../Header/Hero'
import MainPage from './HomePage'
import Artists from '../Artists/Artists'
import { AudioContext } from '../Audio/AudioContext';
import SingUp from '../Authentication/SingUp';




export default function AppPage() {
   const { curr } = useContext(AudioContext);
  return (
   <>
    
  
   <HeroSection/>
   <MainPage/>
   <Artists/>
 
   
   </>
  )
}
