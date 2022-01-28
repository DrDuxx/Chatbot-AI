import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom'

import Home from './pages/Home'
import Settings from './pages/Settings'
import Socket from './pages/Socket'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const location = useLocation

  return (
    <Router>
      <div className="App">
        <div className="pages">
          <Switch location={location.location} key={location.path}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/chat">
              <Socket />
            </Route>
            <Route exact path="/train">
              <Settings />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
