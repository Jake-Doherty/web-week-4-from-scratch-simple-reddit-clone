/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getProfile, getUser, updateProfile, uploadImage } from '../fetch-utils.js';

const user = getUser();

/* Get DOM Elements */
const profileForm = document.getElementById('profile-form');
const imageInput = document.getElementById('avatar-input');
const imagePreview = document.getElementById('preview');
const updateButton = document.getElementById('update-button');
const errorDisplay = document.getElementById('error-display');

/* State */
let error = null;
let profile = null;

/* Events */
window.addEventListener('load', async () => {
    const response = await getProfile(user.id);
    error = response.error;
    profile = response.data;

    if (error) {
        displayError();
    } else {
        displayProfile();
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

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorDisplay.textContent = '';
    updateButton.disabled;
    updateButton.textContent = 'Please Wait...';

    const formData = new FormData(profileForm);

    const imageFile = formData.get('avatar-input');
    const randomFolder = Math.floor(Math.random() * Date.now());
    const imagePath = `avatar-images/${randomFolder}/${imageFile.name}`;
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
        updateButton.textContent = 'All Done!';
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

function displayProfile() {
    document.getElementsByName('display-name')[0].placeholder = profile.display_name;
    imagePreview.src = profile.avatar_image_url;
    document.getElementsByName('bio')[0].placeholder = profile.bio;
}
