import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Breadcrumb from "../Shared/BreadCrumbs";
import { readDeck, createCard, updateCard, readCard } from "../../utils/api";

function CardForm({ mode }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    async function loadDeck() {
      try {
        const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
      } catch (error) {
        console.error(error);
      }
    }

    async function loadCard() {
      try {
        const fetchedCard = await readCard(cardId);
        setCard(fetchedCard);
      } catch (error) {
        console.error(error);
      }
    }

    loadDeck();
    if (mode === "edit") {
      loadCard();
    }
  }, [deckId, cardId, mode]);

  const handleChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (mode === "create") {
      await createCard(deckId, card);
    } else {
      await updateCard({ ...card, id: cardId });
    }
    history.push(`/decks/${deckId}`);
  };

  const crumbs = [
    { name: "Home", link: "/" },
    { name: deck.name, link: `/decks/${deckId}` },
    { name: mode === "create" ? "Add Card" : "Edit Card" },
  ];

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />
      <h1>{mode === "create" ? "Add Card" : "Edit Card"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            placeholder="Front side of the card"
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            placeholder="Back side of the card"
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default CardForm;
