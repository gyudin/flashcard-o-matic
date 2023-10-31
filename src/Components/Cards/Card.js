import React from "react";
import { Link } from "react-router-dom";

const Card = ({ card: { id, front, back }, deckId, handleDelete }) => {
  return (
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="card-text mr-2">
              <strong>Front: </strong>
              {front}
            </p>
            <p className="card-text answer">
              <strong>Back: </strong>
              {back}
            </p>
          </div>
          <div className="d-flex justify-content-end">
            <Link
              to={`/decks/${deckId}/cards/${id}/edit`}
              className="btn btn-secondary mr-1 btn-sm"
            >
              <span className="oi oi-pencil mr-1"></span>Edit
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(id)}
            >
              <span className="oi oi-trash"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
