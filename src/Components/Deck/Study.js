import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumbs from "../Shared/BreadCrumbs";
import ModalPrompt from "../Shared/ModalPrompt";

const Study = () => {
  const [deck, setDeck] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const loadDeck = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };

    loadDeck();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex === deck.cards.length - 1) {
      setShowModal(true);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowModal(false);
  };

  const handleFinish = () => {
    history.push("/");
    setShowModal(false);
  };

  const crumbs = [
    { name: "Home", link: "/" },
    { name: deck.name, link: `/decks/${deckId}` },
    { name: "Study" },
  ];

  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />
      <h1>Study: {deck.name}</h1>
      {deck.cards && deck.cards.length > 2 ? (
        <div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Card {currentCardIndex + 1} of {deck.cards.length}
              </h5>
              <p className="card-text">
                {isFlipped
                  ? deck.cards[currentCardIndex].back
                  : deck.cards[currentCardIndex].front}
              </p>
              <button className="btn btn-secondary mr-1" onClick={handleFlip}>
                <span className="oi oi-loop-circular mr-2" />
                Flip
              </button>
              {isFlipped && (
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                  <span className="oi oi-chevron-right ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Not enough cards.</h2>
          <p>
            You need at least 3 cards to study. There are{" "}
            {deck.cards ? deck.cards.length : 0} cards in this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            + Add Cards
          </Link>
        </div>
      )}
      {showModal && (
        <ModalPrompt
          onCancel={handleFinish}
          onConfirm={handleRestart}
          cancelText="Finish"
          confirmText="Restart"
          message="Do you want to restart the deck?"
        />
      )}
    </div>
  );
};

export default Study;
