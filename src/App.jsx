import './App.css'
import { Routes, Route } from 'react-router-dom'

import AppPage from './Home/AppPage'
import SingalSong from './Home/SingalSong'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppPage />} />

        <Route path="/One/song/Page/:id/:name"element={<SingalSong />}/>
      </Routes>
    </>
  )
}

export default App
