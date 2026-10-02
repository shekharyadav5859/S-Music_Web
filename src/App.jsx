import './App.css'
import { Routes, Route } from 'react-router-dom'

import AppPage from './Home/AppPage'

import Luylet from './Home/Outlet'
import SongPage from './Home/SongPage'
import { useContext } from 'react'
import { AudioContext } from './Audio/AudioContext'
import MusicPlayer from './BottomPlay/MusicPlayer'
import OneArtists from './Artists/OneArtists'
import SingUp from './Authentication/SingUp'
import { LogIn } from 'lucide-react'
import Login from './Authentication/Login'
import LikedSong from './Like/LikedSong'
import Artists from './Artists/Artists'

function App() {
   const { curr } = useContext(AudioContext);
  return (
    <>
      <Routes>
      <Route path='/' element={<Luylet/>}>
      <Route path="/" element={<AppPage />} />
      <Route path='/One/song/Page/:name' element={<SongPage/>}/>
      <Route path='/Atrtist/page/:name' element={<OneArtists/>}/>
      <Route path ='/liked' element={<LikedSong/>}/>
      <Route path ='/artists' element={<Artists/>}/>
      </Route> 
        

     <Route path='/User/SingUp' element={<SingUp/>}/>
     <Route path='login' element={<Login/>}/>
      
      </Routes>
        {curr && <MusicPlayer />}
    </>
  )
}

export default App
