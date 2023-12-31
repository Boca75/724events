import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    const byDateDesc = data?.focus.sort((evtB, evtA) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    );

    const nextCard = () => {
        setTimeout(() => {
            if (byDateDesc && index < byDateDesc.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        }, 5000);
    };

    const handleBulletClick = (bulletIndex) => {
        setIndex(bulletIndex);
    };

    useEffect(() => {
        nextCard();
    });

    return (
        <div className="SlideCardList">
            {byDateDesc &&
                byDateDesc.map((event, idx) => (
                    <div
                        key={event.id}
                        className={`SlideCard SlideCard--${
                            index === idx ? "display" : "hide"
                        }`}
                    >
                        <img src={event.cover} alt="forum" />
                        <div className="SlideCard__descriptionContainer">
                            <div className="SlideCard__description">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div>{getMonth(new Date(event.date))}</div>
                            </div>
                        </div>
                    </div>
                ))}
            <div className="SlideCard__paginationContainer">
                <div className="SlideCard__pagination">
                    {byDateDesc &&
                        byDateDesc.map((radio, radioIdx) => (
                            <input
                                key={radio.id}
                                type="radio"
                                name="radio-button"
                                checked={index === radioIdx}
                                onChange={() => handleBulletClick(radioIdx)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;


