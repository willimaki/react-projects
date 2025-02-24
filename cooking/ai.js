import { GoogleGenerativeAI } from "@google/generative-ai";
import API_KEY from "./credentials.js"

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe 
they could make with some or all of those ingredients. You don't need to use every ingredient 
they mention in your recipe. The recipe can include additional ingredients they didn't mention, 
but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
     model: "gemini-1.5-flash",
     systemInstruction: SYSTEM_PROMPT,
    });


export async function getRecipeFromChefClade(ingredients) {
    const ingredientsString = ingredients.join(", ");
    //Sending Prompt
    const result = await model.generateContent(ingredientsString);

    //Getting response
    const response = await result.response;
    const text = response.text();
    return text;
    
}
