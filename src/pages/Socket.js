import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'
// import Messages from './Messages'
// import MessageInput from './MessageInput'

function Socket() {
  const history = useHistory()

  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API)
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
      borderRadius: 5,
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
      backgroundColor: '#198754',
      borderTopLeftRadius: '0',
    },
    receive: {
      backgroundColor: '#0D6EFD',
      marginLeft: 'auto',
      borderTopRightRadius: '0',
    },
  }
  return socket ? (
    <section>
      <blockquote
        class="blockquote text-center bg-primary d-flex align-items-center justify-content-center"
        style={{ height: '100px' }}
      >
        <p className="display-6" style={{ color: '#fff' }}>
          Chat Room
        </p>
      </blockquote>
      <div className="container" style={{ height: '85vh' }}>
        <div className="chat-container d-flex flex-column h-100 justify-content-between">
          <div className="chat-div">
            <div>
              {message.map((msg, i) => {
                return (
                  <div key={i} style={{ ...style.default, ...style[msg.type] }}>
                    {msg.msg}
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div className="input-group mt-3 align-self-end">
              <input
                type="text"
                className="form-control"
                placeholder="Message"
                aria-label="Message"
                aria-describedby="button-addon2"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && value) {
                    if (value) {
                      setMessage((messages) => {
                        let newMessages = messages.slice()
                        newMessages.push({ type: 'send', msg: value })
                        return newMessages
                      })
                      socket.send(value)
                      setValue('')
                    }
                  }
                }}
              />
              <button
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
                type="button"
                className={`btn btn-success`}
                disabled={value ? false : true}
              >
                Send
              </button>
            </div>
            <div className="d-grid gap-2 col-md-2 mx-auto mt-4 mb-2">
              <button
                type="button"
                className="btn btn-danger btn"
                onClick={() => history.push('/')}
              >
                End Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="alert alert-danger mt-5" role="alert">
      Not Connected
    </div>
  )
}

export default Socket
