import React from "react";
export default function Die({value, isHeld, hold}){
    const styles = {
        backgroundColor:"#59E391"
    }
    return(
        <button style={isHeld ? styles: null} onClick={hold} aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`} aria-pressed={props.isHeld}>
            {value}
        </button>
    )
}