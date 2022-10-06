/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getDefinitions } from './fetch-utils.js';
import { renderDefinition } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const definitionList = document.getElementById('definition-list');

/* State */
let error = null;
let definitions = [];

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

/* Display Functions */
export function displayError() {
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
