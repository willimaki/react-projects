import React from "react";
import GameStatus from "./Game";
import Game from "./Game";


export default function Header({status, classStatus}){   
    return (
    <main>
        <div className="intro">
            <h1 className="Title">Assembly : The Game</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        </div>
        
        <section aria-live="polite" role="status"   className={classStatus}>
            <h3>{status}</h3>
        </section>
        
        
    </main>
    )
}