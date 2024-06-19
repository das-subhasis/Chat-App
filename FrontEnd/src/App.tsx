import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Chat from './pages/Chat'
import Header from './components/Header'
import Login from './pages/Authentication/Login'
import Signup from './pages/Authentication/Signup'
import { Router } from 'express'
import Homepage from './pages/Homepage'
import ChatPage from './pages/ChatPage'
import Protected from './routes/Protected'

function App() {

  return (
    <>
      <div className='min-h-screen flex flex-col bg-[#1c1c1c] font-roboto'>
          <Header />
          <Routes>
            <Route path='/' element={<Protected><ChatPage/></Protected>} />
            <Route path='/login' Component={Login} />
            <Route path='/signup' Component={Signup} />
            <Route path='*' element={<>Not Found - Error 404</>} />
          </Routes>
      </div>
    </>
  )
}

export default App
