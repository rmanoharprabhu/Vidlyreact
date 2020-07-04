import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Tippy from "@tippyjs/react";
import Like from "../common/like";
import TableHeader from "../common/tableHeader";

class MovieTable extends Component {
  // raiseSort = (path) => {
  //   //const sortColumn = [...this.props.sortColumn];
  //   this.props.sortColumn.path = path;
  //   const selectedSortType =
  //     this.props.sortColumn.sortType === "asc" ? "desc" : "asc";
  //   this.props.sortColumn.sortType = selectedSortType;
  //   this.props.onSort(this.props.sortColumn);
  // };

  columns = [
    { path: "title", label: "Title", id: "1" },
    { path: "genre.name", label: "Genre", id: "2" },
    { path: "numberInStock", label: "Number In Stock", id: "3" },
    { path: "dailyRentalRate", label: "Rate", id: "4" },
    { path: "", label: "Favourite", id: "5" },
    { id: "6" },
  ];

  render() {
    const { movies, onLike, onDelete } = this.props;

    return (
      <table className="table table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={this.props.sortColumn}
          onSort={this.props.onSort}
        />
        {/* <thead>
          <tr>
            <th style={pointerStyle} onClick={() => this.raiseSort("name")}>
              Title
            </th>
            <th
              style={pointerStyle}
              onClick={() => this.raiseSort("genre.name")}
            >
              Genre
            </th>
            <th
              style={pointerStyle}
              onClick={() => this.raiseSort("numberInStock")}
            >
              Number In Stock
            </th>
            <th
              style={pointerStyle}
              onClick={() => this.raiseSort("dailyRentalRate")}
            >
              Rate
            </th>
            <th>Favourite</th>
            <th></th>
          </tr>
        </thead> */}
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <Tippy content={"Remove the movie"}>
                  <button
                    onClick={() => onDelete(movie)}
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
    );
  }
}

export default MovieTable;
