import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatBody = ({ messages, typingStatus, lastMessageRef, socket }) => {
  const navigate = useNavigate()

  const handleLeaveChat = () => {
    localStorage.removeItem('userName')
    navigate('/')
    window.location.reload()
  }

  const [message, setMessage] = useState('')
  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      })
    }
    setMessage('')
  }

  return (
    <>
      <header className='flex justify-between  text-white shadow'>
        <h3 className='p-5 bg-blue-400 flex-1'>Hangout with Colleagues</h3>
        <button
          className='px-5  bg-red-500 hover:bg-red-600'
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </button>
      </header>

      <div>
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className='  w-1/2 ml-auto' key={message.id}>
              <p className='text-right mr-3 text-sm'>You</p>
              <div className='px-5 py-2 bg-blue-500 rounded-full text-white'>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className='w-1/2 mr-auto' key={message.id}>
              <p className='text-left ml-3 text-sm'>{message.name}</p>
              <div className='px-5 py-2 bg-green-500 rounded-full text-white'>
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className='ml-3'>
          <h6 className='text-slate-500'>{typingStatus} ..</h6>
        </div>
        <div ref={lastMessageRef} />

        <form
          className='flex justify-between mb-1'
          onSubmit={handleSendMessage}
        >
          <input
            type='text'
            placeholder='Write message'
            className='flex-1 border-2 border-gray-300 p-3 rounded-lg rounded-r-none focus:outline-none focus:border-blue-500'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button className='bg-blue-600 text-white px-8 py-3 rounded-md rounded-l-none hover:bg-blue-700'>
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default ChatBody
