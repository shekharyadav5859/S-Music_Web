import './App.css'
import { Routes, Route } from 'react-router-dom'

import AppPage from './Home/AppPage'

import Luylet from './Home/Outlet'
import SongPage from './Home/SongPage'

function App() {
  return (
    <>
      <Routes>
      <Route path='/' element={<Luylet/>}>
      <Route path="/" element={<AppPage />} />
      <Route path='/One/song/Page/:name' element={<SongPage/>}/>
       
        </Route>


      
      </Routes>
    </>
  )
}

export default App
