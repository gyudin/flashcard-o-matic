import React from 'react';
import Card from './Card';

const CardList = ({ deckId, cards = [], onDelete }) => {
  return (
    <div>
      <div className="row">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            deckId={deckId}
            handleDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;