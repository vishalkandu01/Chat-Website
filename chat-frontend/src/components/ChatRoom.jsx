import React, { useState, useEffect } from 'react'


const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  
  const sendMessage = async () => {
    try {
      await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user, message}),
      });
      
      //clear the message input after sending
      setMessage('');
      
      //fetch messages to update the list
      fetchMessages();
    
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  }
  
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 2000)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <b>{message.user}:</b> {message.message}
          </li>
        ))}
      </ul>
      <h2>ChatRoom</h2>
      <div>
        <input
          type="text"
          placeholder='Your name'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder='Type your message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default ChatRoom