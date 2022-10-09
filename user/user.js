/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { updateProfile, uploadImage } from '../fetch-utils.js';

/* Get DOM Elements */
const profileForm = document.getElementById('profile-form');
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('preview');
const errorDisplay = document.getElementById('error-display');

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

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorDisplay.textContent = '';

    const formData = new FormData(profileForm);

    const imageFile = formData.get('image-input');
    const randomFolder = Math.floor(Math.random() * Date.now());
    const imagePath = `avatar-images/${randomFolder}/${imageFile}`;
    const url = await uploadImage('avatar-images', imagePath, imageFile);

    const profile = {
        display_name: formData.get('display-name'),
        bio: formData.get('bio'),
        avatar_image_url: url,
    };

    const response = await updateProfile(profile);

    error = response.error;

    if (error) {
        displayError();
    } else {
        location.replace('../');
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
