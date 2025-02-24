import React from "react";
import Die from "./Die"
import {nanoid} from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from "react-confetti"


export default function Main(){
    const [diceArr, setDiceArr] = React.useState(() => initializeGame()) //call function only once, no matter rerenders
    const gameWon = diceArr.every(d => d.isHeld) && diceArr.every(d => d.value === diceArr[0].value)
    const { width, height } = useWindowSize()

    function initializeGame(){
        console.log("initialieing")
        const diceArr = []
        for(let i=0;i<10; i++){
            const randomNb= Math.floor(Math.random() * 6 + 1);
            diceArr.push(
                {
                    id:nanoid(),
                    value:randomNb,
                    isHeld:false
                }
            )
        }
        return diceArr;
    }
    const dieElements = diceArr.map(
        (nb) => <Die 
                    key={nb.id} 
                    id={nb.id} 
                    value={nb.value} 
                    isHeld={nb.isHeld} 
                    hold={() => hold(nb.id)} //callback function in order to capture the id when a dice will be clicked
                />
    )
    
    function rollDice(){
        setDiceArr((prevDiceArr) => 
            prevDiceArr.map( (d) =>
                d.isHeld ? d : {...d, value:  Math.floor(Math.random() * 6 + 1)}
            )
    )
    }

    function hold(id) {
        setDiceArr((prevDiceArr) =>
            prevDiceArr.map((d) =>
                d.id === id ? { ...d, isHeld: !d.isHeld } : d
            )
        );
    }
    


    return(
        <main className="main">
            <h1 className="title">Tenzies</h1>
            <h3 className="explanation">Roll until all dice are the same. Click each dice to freeze it at its current value betwen rolls</h3>
            <div className="Dices">
               {dieElements}
            </div>
            <button className="roll-button" onClick={gameWon ? () => setDiceArr(initializeGame) : rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
            {gameWon && <Confetti width={width} height={height}/>}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
        </main>
    )
}