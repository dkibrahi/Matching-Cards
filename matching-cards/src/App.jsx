import { useState, useEffect } from 'react';
import Card from './components/Card';

// styles 
import './App.css';


const cardImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"}
]

function App() {
  const [cards, setCards] = useState([]);
  const [numTurns, setNumTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      compareCards();
    }
  }, [choiceOne, choiceTwo]);

  // handle a card choice
  const handleChoice = (card) => {
    if (choiceOne === null) {
      setChoiceOne(card);
    }

    else {
      setChoiceTwo(card);
    }
  } 

  // compare if user made right match
  const compareCards = () => {
    if (choiceOne.src === choiceTwo.src) {
      console.log("MATCH");
    }

    else {
      console.log("NO MATCH");
    }

    resetTurn();
  }

  // reset cards and increment turns

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setNumTurns(numTurns + 1);
  }

  // shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // two copies of each card
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}))

      // reset cards and turns
      setCards(shuffledCards);
      setNumTurns(0);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card key={card.id} 
            card={card}
            handleChoice={handleChoice}/>
        ))}
      </div>
    </div>
  );
}

export default App;
