import React from "react";
import { ToastContainer } from "react-toastify";
import Tippy from "@tippyjs/react";
import Like from "../common/like";

const MovieTable = (props) => {
  const { movies, onLike, onDelete } = props;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Number In Stock</th>
          <th>Rate</th>
          <th>Favourite</th>
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
};

export default MovieTable;
