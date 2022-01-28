import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
// import Messages from './Messages'
// import MessageInput from './MessageInput'

function Socket() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    const newSocket = io(`http://localhost:5000`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => {
        console.log(msg)
        setMessage((messages) => {
          let newMessages = messages.slice()
          newMessages.push({ msg, type: 'receive' })
          return newMessages
        })
      })
    }
  }, [socket])

  const style = {
    default: {
      color: 'White',
      width: 'max-content',
      maxWidth: '60%',
      padding: 10,
      borderRadius: 40,
      marginTop: 4,
      marginBottom: 4,
    },
    button: {
      color: 'white',
      padding: '4px 8px',
      backgroundColor: value ? 'blue' : 'grey',
      width: 'max-content',
      marginTop: 8,
      cursor: value ? 'pointer' : '',
    },
    send: {
      backgroundColor: 'Green',
      borderTopLeftRadius: 'unset',
    },
    receive: {
      backgroundColor: 'Blue',
      marginLeft: 'auto',
      borderTopRightRadius: 'unset',
    },
  }
  return (
    <div className="App">
      {socket ? (
        <div className="chat-container">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
          <div
            onClick={() => {
              if (value) {
                setMessage((messages) => {
                  let newMessages = messages.slice()
                  newMessages.push({ type: 'send', msg: value })
                  return newMessages
                })
                socket.send(value)
                setValue('')
              }
            }}
            style={style.button}
          >
            SEND
          </div>
          {/* <div
            onClick={() => {
              setMessage((messages) => {
                let newMessages = messages.slice()
                newMessages.push({ type: 'send', msg: 'my name' })
                return newMessages
              })
              socket.send('my name')
            }}
          >
            hello
          </div>
          <div
            onClick={() => {
              setMessage((messages) => {
                let newMessages = messages.slice()
                newMessages.push({ type: 'send', msg: 'bye' })
                return newMessages
              })
              socket.send('boy')
            }}
          >
            bye
          </div> */}
          <div>
            {message.map((msg) => {
              return (
                <div style={{ ...style.default, ...style[msg.type] }}>
                  {msg.msg}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  )
}

export default Socket
