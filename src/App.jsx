import './App.css'
import { Routes, Route } from 'react-router-dom'

import AppPage from './Home/AppPage'

import Luylet from './Home/Outlet'
import SongPage from './Home/SongPage'
import { useContext } from 'react'
import { AudioContext } from './Audio/AudioContext'
import MusicPlayer from './BottomPlay/MusicPlayer'
import OneArtists from './Artists/OneArtists'

function App() {
   const { curr } = useContext(AudioContext);
  return (
    <>
      <Routes>
      <Route path='/' element={<Luylet/>}>
      <Route path="/" element={<AppPage />} />
      <Route path='/One/song/Page/:name' element={<SongPage/>}/>
      <Route path='/Atrtist/page/:name' element={<OneArtists/>}/>
       
        </Route>


      
      </Routes>
        {curr && <MusicPlayer />}
    </>
  )
}

export default App
