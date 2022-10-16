import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState('')
  const lastMessageRef = useRef(null)

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='container min-h-screen bg-white flex justify-between'>
      <ChatBar socket={socket} />
      <div className='w-9/12 flex flex-col justify-between'>
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          socket={socket}
        />
      </div>
    </div>
  )
}

export default ChatPage
