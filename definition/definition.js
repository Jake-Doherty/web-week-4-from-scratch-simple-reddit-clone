/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createComment, getDefinition } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const categoryDisplay = document.getElementById('category-display');
const postDescription = document.getElementById('post-description');
const image = document.getElementById('image');
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('comment-list');

/* State */
let error = null;
let definition = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
    } else {
        const response = await getDefinition(id);
        error = response.error;
        definition = response.data;
    }

    if (error) {
        displayError();
    } else {
        displayDefinition();
        displayComments();
    }
});

commentInput.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(commentInput);

    const addComment = {
        text: formData.get('comment-textarea'),
        definition_id: definition.id,
    };

    const response = await createComment(addComment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        const comment = response.data;
        definition.comments.unshift(comment);
        displayComments();
        commentInput.reset();
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

function displayDefinition() {
    postTitle.textContent = definition.subject;
    categoryDisplay.textContent = definition.category;
    postDescription.textContent = definition.description;
    image.src = definition.image_url;
}

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of definition.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}
