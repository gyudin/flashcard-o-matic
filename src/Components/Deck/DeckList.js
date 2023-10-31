import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api/index";
import DeletePrompt from "../Shared/DeletePrompt";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDeckId, setDeleteDeckId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function fetchDecks() {
      try {
        const response = await listDecks();
        setDecks(response);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch decks");
        setIsLoading(false);
      }
    }
    fetchDecks();
  }, []);

  const handleDelete = async (id) => {
    setDeleteDeckId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDeck(deleteDeckId);
      const newDecks = decks.filter((deck) => deck.id !== deleteDeckId);
      setDecks(newDecks);
      setDeleteDeckId(null);
      history.push("/");
    } catch (error) {
      setError("Failed to delete deck");
    }
  };

  const handleCancelDelete = () => {
    setDeleteDeckId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="row">
      {decks.map((deck) => {
        const cards = deck.cards;
        const isDeleting = deleteDeckId === deck.id;
        return (
          <div className="col-sm-6" key={deck.id}>
            <div className="card">
              <div className="card-header bg-dark text-white justify-content-between pb-0">
                    <h5 className="card-title text-truncate float-left">{deck.name}</h5>
                    <span className="badge bg-success text-white float-right">{`${cards.length} cards`}</span>
              </div>
              <div className={`card-body ${isDeleting ? 'grey-background' : ''}`}>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">
                      <span className="oi oi-eye"></span> View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                      <span className="oi oi-book"></span> Study
                    </Link>
                  </div>
                  <div>
                    <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
                      <span className="oi oi-trash "></span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {deleteDeckId && (
        <DeletePrompt
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default DeckList;
