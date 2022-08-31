import { Link, useLocation } from "react-router-dom"
import { fetchHistory, postOption } from "../../utils/apiUtils"
import { getLocalUser } from "../../utils/utils"
import { ResultCard } from "./ResultCard"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export const PlayResult = () => {

    const location = useLocation()
    const { finalDraw } = location.state

    const { width, height } = useWindowSize()

    const postResults = () => {

        //Build object data for storage and add to array
        const gameResult = []
        finalDraw.forEach((card, i) => {

            const cardObject = {
                cardId: card.id,
                positionId: i,
                timestamp: Date.now(),
                userId: getLocalUser().id
            }
            gameResult.push(cardObject)
        })

        //POST each cardObject from array to database
        Promise.all(gameResult.map(historyCard => fetchHistory("", postOption(historyCard))))
    }

    //Map name property of each history object, add line breaks, convert to string and copy to clipboard
    const clipboardResults = () => {
        const nameArray = finalDraw.map(card => card.name)
        const listArray = nameArray.join('\r\n')
        const textList = listArray.toString()
        navigator.clipboard.writeText(textList)
    }

    return (
        <>
            <section className="hero is-small is-primary">
                <div className="hero-body ml-3">
                    <p className="title">
                        Play
                    </p>
                    <p className="subtitle">
                        Final result
                    </p>
                </div>
            </section>
            <section className="columns is-centered is-multiline is-2-tablet mt-5">
                <div className="column">
                </div>
                {
                    finalDraw.map(card => {
                        return <ResultCard key={card.id} card={card} />
                    })

                }
                <div className="column">
                </div>
            </section>
            <section className="is-flex is-justify-content-center">
                <Link to="/play/round" state={{ deckId: finalDraw[0].deckId }}>
                    <button className="button mt-3 mr-5">
                        Play Again
                    </button>
                </Link>
                <button
                    className="button mt-3 mr-5"
                    onClick={postResults}>
                    Save Game
                </button>
                <button
                    className="button mt-3"
                    onClick={clipboardResults}>
                    Copy to Clipboard
                </button>
            </section>
            <Confetti
                width={width}
                height={height}
                recycle={false}
                gravity={.05}
                opacity={.6}
            />
        </>
    )
}
