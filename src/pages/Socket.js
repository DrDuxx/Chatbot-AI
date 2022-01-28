import React, {useEffect, useState} from 'react'
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
					newMessages.push({msg, type: 'receive'})
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
		<div className='container'>
			{socket ? (
				<div className='chat-container d-flex flex-column'>
					<div>
						{message.map((msg) => {
							return (
								<div style={{...style.default, ...style[msg.type]}}>
									{msg.msg}
								</div>
							)
						})}
					</div>
					<div class='input-group mt-3 mb-5 align-self-end'>
						<input
							type='text'
							className='form-control'
							placeholder='Message'
							aria-label='Message'
							aria-describedby='button-addon2'
							value={value}
							onChange={(e) => {
								setValue(e.target.value)
							}}
						/>
						<button
							onClick={() => {
								if (value) {
									setMessage((messages) => {
										let newMessages = messages.slice()
										newMessages.push({type: 'send', msg: value})
										return newMessages
									})
									socket.send(value)
									setValue('')
								}
							}}
							type='button'
							className={`btn btn-success`}
							disabled={value ? false : true}
						>
							Send
						</button>
					</div>
				</div>
			) : (
				<div className='alert alert-danger mt-5' role='alert'>
					Not Connected
				</div>
			)}
		</div>
	)
}

export default Socket
