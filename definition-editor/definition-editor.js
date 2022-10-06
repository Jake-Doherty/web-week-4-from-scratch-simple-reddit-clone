/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';

/* Get DOM Elements */
const addDefinitionForm = document.getElementById('add-definition-form');
const errorDispay = document.getElementById('error');
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('preview-image');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        imagePreview.src = URL.createObjectURL(file);
    } else {
        imagePreview.src = '/assets/placeholder-image.png';
    }
});
/* Display Functions */
