import React, { useState, useEffect } from 'react'

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data))
  }, [socket, users])

  return (
    <div className='bg-gray-50 w-3/12 shadow-lg'>
      <h2 className='text-center text-3xl mb-5'>Open Chat</h2>
      <div className='ml-5'>
        <h4 className='pl-5'>ACTIVE USERS</h4>
        <div className='pl-8'>
          {users.map((user) => (
            <h3 className='text-green-500' key={user.socketID}>{user.userName}</h3>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatBar
