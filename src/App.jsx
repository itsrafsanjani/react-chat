import socketIO from 'socket.io-client'
const socket = socketIO.connect(import.meta.env.VITE_API_URL)

function App() {
  return <div className='App'>Hello World</div>
}

export default App
