/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getCategories, getDefinitions } from './fetch-utils.js';
import { renderDefinition, renderSelectOption } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const definitionList = document.getElementById('definition-list');
const searchForm = document.getElementById('search-form');
const categorySelect = document.getElementById('category-select');

/* State */
let error = null;
let definitions = [];
let categories = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getDefinitions();

    error = response.error;
    definitions = response.data;

    if (error) {
        displayError();
    } else {
        displayDefinitions();
    }
});

window.addEventListener('load', async () => {
    await findDefinitions();

    const response = await getCategories();

    error = response.error;
    categories = response.data;

    if (error) {
        displayError();
    } else {
        displayCategories();
    }
});

async function findDefinitions(subject, category) {
    const response = await getDefinitions(subject, category);

    error = response.error;
    definitions = response.data;
    categories = response.data;

    if (error) {
        displayError();
    } else {
        displayDefinitions();
    }
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);

    findDefinitions(formData.get('subject'), formData.get('category'));
});

/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayDefinitions() {
    definitionList.innerHTML = '';

    for (const definition of definitions) {
        const definitionEl = renderDefinition(definition);
        definitionList.append(definitionEl);
    }
}

function displayCategories() {
    for (const category of categories) {
        const categoryEl = renderSelectOption(category);
        categorySelect.append(categoryEl);
    }
}
