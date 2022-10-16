import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ChatPage from './components/ChatPage'
import socketIO from 'socket.io-client'

const socket = socketIO.connect(import.meta.env.VITE_API_URL)
function App() {
  return (
    <BrowserRouter>
      <div className='font-sans'>
        <Routes>
          <Route path='/' element={<Home socket={socket} />}></Route>
          <Route path='/chat' element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
