export const ResultCard = (props) => {

    let suitIcon = ""
    switch (props.card.suit.name) {
        case 'Spades':
            suitIcon = "♠️"
            break
        case 'Hearts':
            suitIcon = "♥️"
            break
        case 'Diamonds':
            suitIcon = "♦️"
            break
        case 'Clubs':
            suitIcon = "♣"
            break
        default:
            suitIcon = "X"
    }

    return (
        <div className="column">
            <div className="card meal-card has-background-light">
                <div className="card-content">
                    <span className="icon">
                        {suitIcon}
                    </span>
                    <div className="is-flex is-justify-content-center is-align-items-center card-name">
                        <p>
                            {props.card.name}
                        </p>
                    </div>
                    <div className="is-flex is-justify-content-right">
                        <span className="icon">
                            {suitIcon}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
