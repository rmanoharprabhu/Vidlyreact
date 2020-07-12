import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Like from "../common/like";
import Tippy from "@tippyjs/react";
import { ToastContainer } from "react-toastify";

class MovieTable extends Component {
  //To set the key I used the ID methos to inditify the same. Even in real time we will get the columns with id.
  columns = [
    {
      path: "title",
      label: "Title",
      id: "1",
      content: (movie) => <Link to={`/movie/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre", id: "2" },
    { path: "numberInStock", label: "Number In Stock", id: "3" },
    { path: "dailyRentalRate", label: "Rate", id: "4" },
    {
      path: "",
      label: "Favourite",
      id: "5",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      id: "6",
      content: (movie) => (
        <>
          <Tippy content={"Remove the movie"}>
            <button
              onClick={() => this.props.onDelete(movie)}
              className="btn btn-danger btm-sm"
            >
              Delete
            </button>
          </Tippy>
          <ToastContainer autoClose={1000} />
        </>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      ></Table>
    );
  }
}

export default MovieTable;
