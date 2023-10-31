import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {crumbs &&
          crumbs.map((crumb, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${
                index === crumbs.length - 1 ? "active" : ""
              }`}
            >
              {crumb.link ? (
                <Link to={crumb.link}>
                  {index === 0 && <span className="oi oi-home mr-1" />}
                  {crumb.name}
                </Link>
              ) : (
                crumb.name
              )}
            </li>
          ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
