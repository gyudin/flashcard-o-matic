import React from "react";
import DeckList from "../Deck/DeckList";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="py-4">
        <Link to="/decks/new" className="btn btn-success btn-lg">
          + Create Deck
        </Link>
      </div>
      <DeckList />
    </div>
  );
}

export default Home;
