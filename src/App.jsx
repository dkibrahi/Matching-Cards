// other
import { useState, useEffect } from 'react';
import { cardImages } from './external/CardImages';
import useSound from 'use-sound';

// sounds
import buttonClickSound from './resources/buttonClick.mp3';

// components
import Card from './components/Card';

// styles 
import './App.css';


function App() {
  const [cards, setCards] = useState([]); 
  const [numTurns, setNumTurns] = useState(0); // display number of turns
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false); // prevent user from clicking too many cards

  const [playBtnClickedSound] = useSound(buttonClickSound);

  useEffect(() => {
    shuffleCards(); // on page load
  }, [])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      compareCards();
    }
  }, [choiceOne, choiceTwo]);


  const handleChoice = (card) => {
    if (choiceOne === null) {
      setChoiceOne(card);
    }

    else {
      setChoiceTwo(card);
    }
  } 


  const compareCards = () => {
    setDisabled(true); // disable any other cards from being clicked

    // clicked on same exact card
    if (choiceOne.id === choiceTwo.id) {
      setChoiceTwo(null);
      setDisabled(false);
    }

    else if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          // update property of newly matched card
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

    // cards aren't the same
    else {
      setTimeout(() => resetTurn(), 1000);
    }
  }

  
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setNumTurns(numTurns + 1);
    setDisabled(false);
  }

 
  const shuffleCards = () => {
    playBtnClickedSound();

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
      <h1>Card Matching</h1>
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
