import React, { Component } from "react";
import Like from "../common/like";
import Pagination from "../common/pagination";
import { ToastContainer, toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { getMovies } from "../services/fakeMovieService";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { paginate } from "../utils/paginate";

class Movie extends Component {
  state = {
    allMovies: getMovies(),
    favStatus: false,
    pageSize: 4,
    currentPage: 1,
  };

  handleFavStatus = (movie) => {
    //Creating a new array with objects.
    const allMovies = [...this.state.allMovies];
    const index = allMovies.indexOf(movie); //Taking the index of the object
    allMovies[index] = { ...allMovies[index] }; //Take a copy of the object based on index.
    allMovies[index].liked = !allMovies[index].liked; //Change the value from the copied value
    this.setState({ allMovies }); //update the changed index back to orginal array.
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleMovieDelete = (movie) => {
    const filteredMovies = this.state.allMovies.filter(
      (s) => s._id !== movie._id
    );
    const movieTitle = movie.title;
    //console.table(filteredMovies);
    this.setState({ allMovies: filteredMovies });

    toast.success("Deleted the movie " + movieTitle + " Sucessfully ");
  };

  render() {
    const { pageSize, currentPage, allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    //using object destrucring we are taking the length of the array.
    const { length: count } = this.state.allMovies;

    if (count === 0) {
      return <h1>No Movies Found in the Database</h1>;
    }
    return (
      <>
        <div>
          <h3>
            Currently displaying{" "}
            {pageSize * currentPage >= count ? count : pageSize * currentPage} /{" "}
            {count} Movies from Database
          </h3>
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
              {movies.map((movie) => (
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
          <Pagination
            totalItems={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </>
    );
  }

  getFavStatusClass = () => {
    return this.state.favStatus ? "fa fa-heart" : "fa fa-heart-o";
  };
}

export default Movie;
