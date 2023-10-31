import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import CardList from "../Cards/CardsList";
import DeletePrompt from "../Shared/DeletePrompt";
import Breadcrumbs from "../Shared/BreadCrumbs";

const Deck = () => {
  const [deck, setDeck] = useState({});
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [showDeleteCardPrompt, setShowDeleteCardPrompt] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const crumbs = [{ name: "Home", link: "/" }, { name: deck.name }];

  useEffect(() => {
    const loadDeck = async () => {
      const deckData = await readDeck(deckId);
      setDeck(deckData);
    };

    loadDeck();
  }, [deckId, isUpdating]);

  const handleDeleteDeck = async () => {
    setShowDeletePrompt(false);
    await deleteDeck(deck.id);
    history.push("/");
  };

  const handleDeleteCard = async (cardId) => {
    setSelectedCardId(cardId);
    setShowDeleteCardPrompt(true);
  };

  const handleConfirmDeleteCard = async () => {
    setIsUpdating(true);
    setShowDeleteCardPrompt(false);
    await deleteCard(selectedCardId);
    setIsUpdating(false);
  };

  return (
    <div className="col-sm-12 p-0">
      <Breadcrumbs crumbs={crumbs} />
      <div className="card">
        <div className="card-header bg-dark text-white pb-0">
          <h5 className="card-title">{deck.name}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{deck.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`${url}/edit`} className="btn btn-secondary mr-1">
                <span className="oi oi-pencil mr-1"></span>Edit
              </Link>
              <Link to={`${url}/study`} className="btn btn-primary mr-1">
                <span className="oi oi-book mr-1"></span>Study
              </Link>
              <Link to={`${url}/cards/new`} className="btn btn-primary">
                <strong>+ Add Cards</strong>
              </Link>
            </div>
            <div>
              <button
                onClick={() => setShowDeletePrompt(true)}
                className="btn btn-danger"
              >
                <span className="oi oi-trash"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CardList
        cards={deck.cards}
        deckId={deckId}
        onDelete={handleDeleteCard}
      />

      {showDeletePrompt && (
        <DeletePrompt
          onCancel={() => setShowDeletePrompt(false)}
          onConfirm={handleDeleteDeck}
        />
      )}

      {showDeleteCardPrompt && !isUpdating && (
        <DeletePrompt
          onCancel={() => setShowDeleteCardPrompt(false)}
          onConfirm={handleConfirmDeleteCard}
        />
      )}
    </div>
  );
};

export default Deck;
