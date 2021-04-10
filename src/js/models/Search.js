import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults (query) {
        const key = "28064759-4fcf-41bc-a921-e7d90e986072"
    
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${this.query}&key=${key}`)
            this.result = res.data.data.recipes;
            console.log(this.result)
        } catch (error) {
            alert(error)
        }
    }
} 