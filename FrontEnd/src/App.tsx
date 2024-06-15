import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Chat from './pages/Chat'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <div className='min-h-screen bg-[#8B93FF]'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' Component={Chat} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
