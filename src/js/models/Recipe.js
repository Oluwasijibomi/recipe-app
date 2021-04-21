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

            //console.log(res.data.data.recipe.ingredients)
        } catch (error) {
            alert("Something went Wrong :(");
        }
    }

    calcTime () {
        // Assume that we need 15min for each 3 ingrdients
        const numIng = this.ingredients.length;
        //console.log(numIng);
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    };

    calcServings() {
        this.servings = 4; 
    };

    parseIngredients() {
        const unitsLong = ["tablespoons", "tablespoon", "ounce", "ounces"];
        const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cups", "pound"];


        const newIngredients = this.ingredients.map((el) => {
            console.log(el);
            // 1.) Uniform Units of
            let ingredient = el.toLowerCase();
            
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // 2.) Remove Parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ")


            // 3.) Parse ingredients into count, unit and ingredients
            const arrIng = ingredient.split(" ");
            const unitIndex = arrIng.findIndex(el2 => unitsShort.include(el2));

            let objIng;
            if (unitIndex > -1) {
                //theres is a unit
            } else if (parceInt(arrIng[0], 10)) {
                // Theres NO unit, but the first element is a number
                objIng = {
                    count: parseInt(arring[0], 10),
                    unit: "",
                    ingredient: arrIng.slice(1).join(" ")
                }
            } else if (unitIndex === -1) {
                
                objIng = {
                    count: 1,
                    unit: "",
                    ingredient
                }
            }
            return objIng;
        });

        console.log(newIngredients)
        this.ingredients = newIngredients;
    } 

};