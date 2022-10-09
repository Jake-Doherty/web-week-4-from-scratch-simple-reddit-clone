/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createDefinition, getCategories, uploadImage } from '../fetch-utils.js';
import { renderSelectOption } from '../render-utils.js';

/* Get DOM Elements */
const addDefinitionForm = document.getElementById('add-definition-form');
const errorDisplay = document.getElementById('error');
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('preview-image');
const categorySelect = document.getElementById('category-select');

/* State */
let error = null;
let categories = [];

/* Events */

window.addEventListener('load', async () => {
    const response = await getCategories();

    error = response.error;
    categories = response.data;

    if (error) {
        displayError();
    } else {
        displayCategories();
    }
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        imagePreview.src = URL.createObjectURL(file);
    } else {
        imagePreview.src = '/assets/placeholder-image.png';
    }
});

addDefinitionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addDefinitionForm);

    const imageFile = formData.get('image-input');
    const randomFolder = Math.floor(Math.random() * Date.now());
    const imagePath = `def-images/${randomFolder}/${imageFile.name}`;
    const url = await uploadImage('def-images', imagePath, imageFile);

    const definition = {
        subject: formData.get('subject'),
        category: formData.get('category-select'),
        description: formData.get('description-area'),
        image_url: url,
    };

    const response = await createDefinition(definition);

    error = response.error;

    if (error) {
        displayError();
    } else {
        location.replace('/');
    }
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

function displayCategories() {
    for (const category of categories) {
        const categoryEl = renderSelectOption(category);
        categorySelect.append(categoryEl);
    }
}
