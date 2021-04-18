import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/SearchView";
import {elements, renderLoader, clearLoader} from "./views/base";

// Global state of the app
const state = {};

const controlSearch = async () => {

    // 1.) Get Query from the view

    //const query = searchView.getInput(); //TODO

    const query = "pizza";

    if (query) {
        // 2.) New search object and add it to state
        state.search = new Search(query);

        // 3.) Prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try {
            // 4.) Search for recipe
            await state.search.getResults();

            // 5.) render result on UI
            clearLoader();
            searchView.renderResults(state.search.result)
        } catch (err) {
            alert("Soemthing wrong with the Search...")
            clearLoader();
        };
    };
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch()
});

// TESTING
window.addEventListener("load", e => {
    e.preventDefault();
    controlSearch()
});

elements.searchResPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline")
    console.log(btn); 

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
        console.log(goToPage);
    }
});

//RECIPE CONTROLLER

const controlRecipe = async () => {

    // GET THE ID FROM URL
    const id = window.location.hash.replace("#", "");
    console.log(id)

    if (id) {
        // prepare UI for changes to

        // Create new recipe object
        state.recipe = new Recipe(id);

        //Testing
        window.r = state.recipe;

        try {
            // Get recipe dataset
        await state.recipe.getRecipe();
        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings()
;
        // Render recipe
        console.log(state.recipe)
        } catch (err) {
            alert("Error Processing Recipe")
        }
    }
}

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe))