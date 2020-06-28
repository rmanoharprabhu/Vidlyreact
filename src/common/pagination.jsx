import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { pageSize, totalItems, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(totalItems / pageSize);
  console.log(currentPage);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
            aria-current="page"
          >
            <a
              className="page-link"
              href="/#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
