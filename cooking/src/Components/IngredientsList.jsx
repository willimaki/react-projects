import React from "react"

export default function IngredientsList({list, getRecipeFromApi,recipeSection}){
    const ingredientsListItems = list.map((i,index)=> <li key={index}>{i}</li>)

    return (
        <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {ingredientsListItems.length >= 3  && <div className="get-recipe-container">
                    <div ref={recipeSection}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={getRecipeFromApi}>Get a recipe</button>
                </div>}
            </section>
    )
}