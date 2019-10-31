import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example mt-3">
      <ul className="pagination justify-content-center">
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <a
            className="page-link"
            aria-label="Previous"
            onClick={() => paginate(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={`page-item${number === currentPage ? " active" : ""}`}
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item${
            currentPage === pageNumbers.length ? " disabled" : ""
          }`}
        >
          <a
            className="page-link"
            aria-label="Next"
            onClick={() => paginate(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
