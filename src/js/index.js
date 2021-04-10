import Search from "./models/Search";
import * as searchView from "./views/SearchView"
import {elements} from "./views/base"

// Global state of the app
const state = {};

const controlSearch = async () => {

    // 1.) Get Query from the view

    const query = searchView.getInput(); //TODO

    if (query) {
        // 2.) New search object and add it to state
        state.search = new Search(query);

        // 3.) Prepare UI for results
        searchView.clearInput()
        searchView.clearResults()

        // 4.) Search for recipe
        await state.search.getResults();

        // 5.) render result on UI
        searchView.renderResults(state.search.result)
    }

}

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch()
})
