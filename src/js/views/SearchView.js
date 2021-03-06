import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
} ;

// "pasta with tomatoe and spinach"
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }

            return acc + cur.length;
        }, 0);

        return `${newTitle.join(" ")} ...`
    }

    return title;
}


const renderRecipe = recipe => {
    const markup = 
    `
        <li>
            <a class="results__link" href="#${recipe.id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML("afterbegin", markup);
};


// type "prev or "next
const createButton = (page, type) => 

`
    <button class="btn-inline results__btn--${type}" data-goto = ${type === "prev" ? page - 1 : page + 1} >
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === "prev" ? page - 1 : page + 1} </span>
    </button>
`;



const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Only Button to go to next page

        button = createButton(page, "next")
    } else if (page < pages) {
        // Both b uttons
        button = `${createButton(page, "prev")}
        ${createButton(page, "next")}
        `
    } else if (page === pages && pages > 1) {
        // only Button to go to prev page
        button = createButton(page, "prev")
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button)
};

export const renderResults = (recipes, pages = 1, resPerPage = 10) => {
    //render result of current page
    const start = (pages - 1) * resPerPage;
    const end = pages * resPerPage;

    recipes.slice(start, end).forEach(el => renderRecipe(el) );

    //render pagination renderButtons
    renderButtons(pages, recipes.length, resPerPage)
};