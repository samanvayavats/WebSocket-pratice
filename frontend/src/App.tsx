
import { useState ,useEffect } from 'react'
const App = () => {
const [socket , useSocket] = useState<null | WebSocket>(null)
const [message , setMessage] = useState<string[]>([])
const [newMessage, setnewMessage] = useState('')

  useEffect(() => {
  const socket = new WebSocket('ws://localhost:8080')
  socket.onopen = ()=>{
  console.log('the connection has been done ')
  useSocket(socket)
  
  socket.onmessage =(message)=>{
    console.log('message recieved is :' ,message.data)
    setMessage((prev)=>[...prev , message.data])
  }
}

  // return socket.close()
}, [])


  return (
    <div>
      <input type="text" name="sendmessage" placeholder='send message' onChange={(e)=>{setnewMessage(e.target.value)}} />
      <button
      onClick={()=>socket?.send(newMessage)}
      >click me </button>
      {
        message.map((msg, index)=>(
          <div key={index}>{msg}</div>
        ))
      }
    </div>
  )
}

export default App
