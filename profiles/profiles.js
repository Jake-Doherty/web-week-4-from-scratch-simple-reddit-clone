// import
import '../auth/user.js';
import { getProfiles } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';

// get dom
const errorDisplay = document.getElementById('error-display');
const userProfilesList = document.getElementById('user-profile-list');

// state
let error = null;
let profiles = [];

// events
window.addEventListener('load', async () => {
    const response = await getProfiles();

    error = response.error;
    profiles = response.data;

    if (error) {
        displayError();
    } else {
        displayProfiles();
    }
});

// display functions
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

async function displayProfiles() {
    for (const profile of profiles) {
        const profileEl = renderProfile(profile);
        userProfilesList.append(profileEl);
    }
}
