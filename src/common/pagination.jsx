import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { pageSize, totalItems } = props;
  const pageCount = parseInt(totalItems / pageSize);

  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {pages.map((page) => (
          <li key={page} className="page-item" aria-current="page">
            <span className="page-link">{page}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
