import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Booklist from './modules/Booklist';
import Seatbook from './modules/Seatbook';
import logo from './logo.svg';

function App() {
  return (
    <div className="App"> 
          <Router>
            <Switch>
              <Route exact path="/" name="Booking" component={Booklist} />
              <Route exact path="/booking" name="Booking" component={Seatbook} />
            </Switch>
          </Router>
    </div>
  );
}

export default App;
