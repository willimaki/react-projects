import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromChefClade } from "../../ai"

export default function Main(){
    const [ingredients, setIngredients] = React.useState(["chicken", "all the main spices", "corn", "heavy cream", "pasta"])
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    console.log(recipeSection)

    React.useEffect(
        ()=> {if(recipe !== "" && recipeSection !== null){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    },[recipe])
    
    

    function updateArray(newItem){
        setIngredients(
            (prevArr) => [...prevArr,newItem]
        );
    }

    function dataHandler(data){
        const ing = data.get("ingredient");
        ing && updateArray(ing); 
    }

    async function getRecipeFromApi(){
        const recipe = await getRecipeFromChefClade(ingredients)
        console.log(ingredients)
        if(recipe.length > 0){
            setRecipeShown(
                (prevRecipe) => !prevRecipe
            )
        }
        setRecipe(() =>  recipe)
    }

    
    return(
        <main>
            <form action={dataHandler} className="ingredient-form">
                <input
                    aria-level="Add ingredient" 
                    type="text" 
                    placeholder="e.g oregano" 
                    className="add-text"
                    name="ingredient"
                />
                <input  
                    type="submit" 
                    value='+  Add ingredient' 
                    className="add-button" 
                />
            </form>
            {ingredients.length > 0 && <IngredientsList 
                                                    list = {ingredients}
                                                    getRecipeFromApi={getRecipeFromApi} 
                                                    recipeSection={recipeSection}
                                        />
            }
            {recipeShown && <ClaudeRecipe recipe={recipe} />
            
    }
        </main>
    )
}