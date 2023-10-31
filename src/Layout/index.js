import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home/Home";
import Deck from "../Components/Deck/Deck"
import DeckList from "../Components/Deck/DeckList";
import DeckForm from "../Components/Deck/DeckForm"
import CardForm from "../Components/Cards/CardForm"
import Study from "../Components/Deck/Study"

function Layout() {
    
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/:deckId/edit">
                <DeckForm mode="edit"/>
          </Route>
          <Route exact path="/decks/:deckId/study">
                <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
              <CardForm mode="edit"/>
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
              <CardForm mode="create"/>
          </Route>
          <Route exact path="/decks/new">
                <DeckForm mode="create"/>
          </Route>
          <Route exact path="/decks/:deckId">
                <Deck/>
          </Route>
          {/* <Route exact path="/decks"> 
            <DeckList />
          </Route> */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;