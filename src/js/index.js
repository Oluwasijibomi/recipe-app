import axios from "axios";
import 'idempotent-babel-polyfill';

async function getResults (query) {
    const key = "28064759-4fcf-41bc-a921-e7d90e986072"

    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${key}`)
        const recipes = res.data.data.recipes;
        console.log(recipes)
    } catch (error) {
        alert(error)
    }
    
}
getResults("pizza")
 