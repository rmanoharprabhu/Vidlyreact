import React, { Component } from "react";
import MovieTable from "./movieTable";
import Pagination from "../common/pagination";
import { getMovies } from "../services/fakeMovieService";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import { toast } from "react-toastify";
import _ from "lodash";

class Movie extends Component {
  state = {
    allMovies: [],
    allGenres: [],
    favStatus: false,
    pageSize: 4,
    currentPage: 1,
    selectedGener: "",
    sortColumn: { path: "title", sortType: "asc" },
  };

  componentDidMount = () => {
    // My way of implementation
    // const defaultItem = { _id: 0, name: "All Genres" };
    // const generes = getGenres();
    // generes.splice(0, 0, defaultItem);

    //The Other Way
    const defaultItem = { _id: 0, name: "All Genres" };
    const generes = [defaultItem, ...getGenres()];

    this.setState({
      allMovies: getMovies(),
      allGenres: generes,
      selectedGener: defaultItem,
    });
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

  handleGeneChange = (gene) => {
    //console.log(gene);
    this.setState({ selectedGener: gene, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    //If both Object and Values are same we can use like below.
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      allMovies,
      allGenres,
      selectedGener,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectedGener && selectedGener._id !== 0
        ? allMovies.filter((s) => s.genre._id === selectedGener._id)
        : allMovies;
    //console.log(filteredMovies);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.sortType]
    );

    //using object destrucring we are taking the length of the array.
    const movies = paginate(sorted, currentPage, pageSize);
    const { length: count } = filteredMovies;

    if (count === 0) {
      return <h1>No Movies Found in the Database</h1>;
    }
    return (
      <>
        <div className="row">
          <div className="col-3">
            <ListGroup
              onItemSelect={this.handleGeneChange}
              selectedItem={selectedGener}
              items={allGenres}
            ></ListGroup>
          </div>
          <div className="col">
            <h3>
              Currently displaying{" "}
              {pageSize * currentPage >= count ? count : pageSize * currentPage}{" "}
              / {count} Movies from Database
            </h3>

            <MovieTable
              movies={movies}
              onLike={this.handleFavStatus}
              onDelete={this.handleMovieDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            ></MovieTable>
            <Pagination
              totalItems={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }

  getFavStatusClass = () => {
    return this.state.favStatus ? "fa fa-heart" : "fa fa-heart-o";
  };
}

export default Movie;
