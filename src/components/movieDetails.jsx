import React from "react";

const MovieDetails = ({ match, history }) => {
  return (
    <div>
      <h1>Movie details {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movie")}
      >
        Ok
      </button>
    </div>
  );
};

export default MovieDetails;
