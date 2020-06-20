import React, { Component } from "react";
import Like from "../common/like";
import Pagination from "../common/pagination";
import { ToastContainer, toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { getMovies } from "../services/fakeMovieService";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

class Movie extends Component {
  state = {
    allMovies: getMovies(),
    favStatus: false,
    pageSize: 3,
  };

  handleFavStatus = (movie) => {
    const allMovies = [...this.state.allMovies];
    const index = allMovies.indexOf(movie);
    allMovies[index] = { ...allMovies[index] };
    allMovies[index].liked = !allMovies[index].liked;
    this.setState({ allMovies });
  };

  handleMovieDelete = (movie) => {
    const filteredMovies = this.state.allMovies.filter(
      (s) => s._id !== movie._id
    );
    const movieTitle = movie.title;
    console.table(filteredMovies);
    this.setState({ allMovies: filteredMovies });

    toast.success("Deleted the movie " + movieTitle + " Sucessfully ");
  };
  render() {
    const { length: count } = this.state.allMovies;
    if (count === 0) {
      return <h1>No Movies Found in the Database</h1>;
    }
    return (
      <>
        <div>
          <h3>Currently displaying {count} Movies from Database</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Number In Stock</th>
                <th>Rate</th>
                <th>Favroite</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.allMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleFavStatus(movie)}
                    />
                  </td>
                  <td>
                    <Tippy content={"Remove the movie"}>
                      <button
                        onClick={() => this.handleMovieDelete(movie)}
                        className="btn btn-danger btm-sm"
                      >
                        Delete
                      </button>
                    </Tippy>
                    <ToastContainer autoClose={1000} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination totalItems={count} pageSize={this.state.pageSize} />
        </div>
      </>
    );
  }

  getFavStatusClass = () => {
    return this.state.favStatus ? "fa fa-heart" : "fa fa-heart-o";
  };
}

export default Movie;
