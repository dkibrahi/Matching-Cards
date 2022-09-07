import './Card.css';

export default function Card({ card, handleChoice }) {
    const handleClick = () => {
        handleChoice(card);
    }

    return (
        <div className="card">
            <img className="front" 
                src={card.src} 
                alt="front of card" />

            <img className="back" 
                src="/img/cover.png" 
                alt="back of card" 
                onClick={handleClick}/>
        </div>
    )
}
