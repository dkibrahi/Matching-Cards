import { useState } from 'react';
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
        <Card />
      </div>
    </div>
  );
}

export default App;
