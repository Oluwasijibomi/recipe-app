import axios from "axios";


export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        const key = "28064759-4fcf-41bc-a921-e7d90e986072";

        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/v2/recipes/${this.id}?key=${key}`);
            this.title = res.data.data.recipe.title;
            this.publisher = res.data.data.recipe.publisher;
            this.img = res.data.data.recipe.image_url;
            this.url = res.data.data.recipe.source_url;
            this.ingredients = res.data.data.recipe.ingredients;

            console.log(res)
        } catch (error) {
            alert("Something went Wrong :(");
        }
    }

    calcTime () {

        // Assume that we need 15min for each 3 ingrdients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4; 
    }
}