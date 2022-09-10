import { useState, useEffect } from 'react';
import Card from './components/Card';

// styles 
import './App.css';


const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [numTurns, setNumTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, [])

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
    setDisabled(true); // disable any other cards from being clicked

    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true};
          }

          else {
            return card;
          }

        })
      })

      resetTurn();
    }

    else {
      setTimeout(() => resetTurn(), 750);
    }
  }

  console.log(cards);

  // reset cards and increment turns

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setNumTurns(numTurns + 1);
    setDisabled(false);
  }

  // shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // two copies of each card
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}))

      // reset cards and turns
      setCards(shuffledCards);
      setNumTurns(0);

      setChoiceOne(null);
      setChoiceTwo(null);
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
        ))}
      </div>

      <p>Turns: {numTurns}</p>
    </div>
  );
}

export default App;
