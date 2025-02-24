import React from "react";
import clsx from "clsx";
import {languages} from "../languages";
import Header from "./Header";
import {getFarewellText, chooseWord} from "./utils.js";
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use";


export default function Game(){
    const [word, setWord] = React.useState(() => chooseWord());
    const [guesses, setGuesses] = React.useState(new Set([]));

    const wrongGuessCount = [...guesses].filter((l)=> !word.toLocaleUpperCase().includes(l)).length
    const {width, height} = useWindowSize()

    //List of Languages
    const languageList = languages.map(
        (language, index) =>{
        const isLost = index < wrongGuessCount;
        const colorName = clsx({lost:isLost})
        return( 
            <span 
                key={index}
                className={`chip ${colorName}`} 
                style={{backgroundColor:language.backgroundColor, color:language.color}}
            >
                {language.name}
            </span>
        )
})

    //Word to be guessed
    const wordArr = word.toUpperCase().split("")    //Word to Array
    
    
    //Game over condition
    const isWon = wordArr.every(letter => guesses.has(letter));
    const isLost = wrongGuessCount > languages.length - 1 ;
    
    const isGameOver = isWon || isLost;
    let gameStatus = "Pick a letter"
    
    if(isGameOver){
        if(isLost){
            gameStatus = "You lose";
        }
        else if(isWon){
            gameStatus = "You won";
            
        }
    }else if(wrongGuessCount>0){
        const text = getFarewellText(languages[wrongGuessCount - 1].name);
        gameStatus = text
    }
    
    const gameStatusClass = clsx("status", {
        won: isWon,
        lost: isLost
    })

    //Reveal letters
    let wordList = wordArr.map((l,index)=>(
        <span key={index}>
            {(guesses.has(l) && wordArr.includes(l)) || isGameOver ? l : "."}
        </span>  //Letter cases displayed
    ))


    //Resetting game
    function resetGame(){
        setGuesses(new Set([]));
        setWord(chooseWord());
    }
   
    // Handling letter guesses
    function addGuessedLetter(letter){
        setGuesses((prevSetGuess) => {
        const newSet = new Set(prevSetGuess) //like array we create a new a set from the previous one to trigger re render
        newSet.add(letter)
        return newSet    
    })
    }

    //Displaying letters
    const alphabet = "abcdefghijklmnopqrstuvwxyzéù-àèç";
    const letterArr = alphabet.toUpperCase().split("");

    const alphabetButtons = letterArr.map( (l,index) =>{
        const isGuessed = guesses.has(l)
        const isCorrect = isGuessed && wordArr.includes(l)
        const isWrong = isGuessed && !wordArr.includes(l)
        
        const c = clsx({correct:isCorrect, wrong:isWrong})
        return (
        <button 
            key={l} 
            className={c} 
            type="button" 
            disabled = {isGameOver} 
            aria-disabled={guesses} 
            aria-label={`Letter ${l}`}
            onClick={() => addGuessedLetter(l)}
        >
            {l}
        </button>
        )        
})
    
    
    return(
        <main>
            <Header status={gameStatus} classStatus={gameStatusClass}></Header>
            <div className="languages">
                {languageList}
            </div>
            <div className="current-word">
                {wordList}
            </div>
            <section className="board">
                <div>{alphabetButtons}</div>
                {isWon && <Confetti width={width} height={height}></Confetti>}
                {isGameOver && ( <button className="new-game" onClick={() =>resetGame()}>New Game</button>)}
            </section>
        </main>
    )
}
