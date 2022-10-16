import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ socket }) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('userName', userName)
    socket.emit('newUser', { userName, socketID: socket.id })
    navigate('/chat')
  }
  return (
    <form className='container min-h-screen bg-white flex flex-col items-center justify-center' onSubmit={handleSubmit}>
      <h2 className='text-3xl mb-3'>Sign in to Open Chat</h2>
      <label htmlFor='username' className='text-lg mb-2'>Username</label>
      <input
        type='text'
        minLength={6}
        name='username'
        id='username'
        className='border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 mb-3'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>Sign in</button>
    </form>
  )
}

export default Home
