import React from 'react'
import { useHistory } from 'react-router-dom'

import logo from '../assets/robot.svg'

const Home = () => {
  const history = useHistory()

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col d-flex align-items-center justify-content-between justify-content-md-center mt-5 ">
          <h1 className="display-1 text-primary text-center">ChatBot-AI</h1>
          <img src={logo} alt="ChadBot" className="main-image" />
        </div>
        <div className="dropdown-divider"></div>
        <blockquote class="blockquote my-5 text-center">
          <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <div>
          <div className="d-grid gap-2 col-md-4 mx-auto">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => history.push('/chat')}
            >
              Test Our ChatBot
            </button>
          </div>
          <div className="d-grid gap-2 col-md-3 mx-auto mt-3">
            <button
              type="button"
              className="btn btn-warning btn-lg"
              onClick={() => history.push('/train')}
            >
              Train the Bot
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
