import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import AllMovies from './components/movies/AllMovies'
import SeatAvailable from './components/SeatAvailable'
import Form from './components/movies/Form'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
        <div className="container">
          <a className="navbar-brand" href="#">Test App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          </div>
        </div>
      </nav>

      <Router>
        <Switch>
          <Route exact path="/" render={(props) =>  (
               <Redirect to='/movies' />)}  />
          <Route path="/movies" exact component={(AllMovies)}/> 
          <Route path="/movies/new" exact component={(Form)}/>
          <Route path="/movies/:id/edit" exact component={(Form)}/>
          <Route path="/seat-available" exact component={(SeatAvailable)}/>         
        </Switch>
      </Router>

    </div>
  );
}

export default App;
