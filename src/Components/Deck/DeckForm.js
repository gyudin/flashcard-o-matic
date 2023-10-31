import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../../utils/api";
import Breadcrumb from '../Shared/BreadCrumbs';

function DeckForm({mode}) {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const { deckId } = useParams();
  const history = useHistory();
  const crumbs = [
    { name: 'Home', link: '/' },
    { name: mode === 'create' ? 'Create Deck' : deck.name },
  ];

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      if (deckId) {
        try {
          const loadedDeck = await readDeck(deckId, abortController.signal);
          setDeck(loadedDeck);
        } catch (error) {
          if (error.name !== "AbortError") {
            throw error;
          }
        }
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (deckId) {
      try {
        const updatedDeck = await updateDeck(deck, abortController.signal);
        history.push(`/decks/${updatedDeck.id}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    } else {
      try {
        const newDeck = await createDeck(deck, abortController.signal);
        history.push(`/decks/${newDeck.id}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
  };

  return (
    <>  
        <Breadcrumb crumbs={crumbs} />
        <h1>{mode === 'create' ? 'Create Deck' : 'Edit Deck'}</h1>
        <form onSubmit={handleSubmit} className="col-sm-12">
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Deck Name"
            required
            value={deck.name}
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Brief description"
            rows="3"
            required
            value={deck.description}
            onChange={handleChange}
            ></textarea>
        </div>
        <Link to={deckId ? `/decks/${deckId}` : "/"} className="btn btn-secondary mr-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Save</button>
        </form>
    </>
  );
}

export default DeckForm;