// other
import useSound from 'use-sound'
import clickSound from '../resources/click.mp3'
import deniedSound from '../resources/denied.mp3'

// styles
import './Card.css';

export default function Card({ card, handleChoice, flipped, disabled }) {
    const [playClickSound] = useSound(clickSound);
    const [playDeniedSound] = useSound(deniedSound);

    const handleClick = () => {
        if (!disabled) {
            // console.log("NANI? Should be clicked");
            playClickSound();
            handleChoice(card);
        }

        else {
            playDeniedSound();
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped": ""}>
            <img className="front" 
                src={card.src} 
                alt="front of card" />

            <img className="back" 
                src="/img/cover.png" 
                alt="back of card" 
                onClick={handleClick}/>
            </div>
        </div>
    )
}
