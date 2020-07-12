import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Movie from "./components/movie";
import NavBar from "./components/navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customer from "./components/customer";
import Rental from "./components/rental";
import NotFound from "./components/not-found";
import MovieDetails from "./components/movieDetails";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <br></br>
      <main className="container">
        <Switch>
          <Route path="/movie/:id" component={MovieDetails}></Route>
          <Route path="/movie" component={Movie}></Route>
          <Route path="/customer" component={Customer}></Route>
          <Route path="/rental" component={Rental}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect to="/not-found"></Redirect>
          <Redirect from="/" exact to="/movie"></Redirect>
        </Switch>
      </main>
    </>
  );
}

export default App;
