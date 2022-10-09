export function renderDefinition(definition) {
    const li = document.createElement('li');
    li.classList.add('definition-item');

    const a = document.createElement('a');
    a.classList.add('definition-link');
    a.href = `/definition/?id=${definition.id}`;

    const div = document.createElement('div');
    div.classList.add('definition-div');

    const h3 = document.createElement('h3');
    h3.classList.add('definition-title');
    h3.textContent = definition.subject;

    const span = document.createElement('span');
    span.classList.add('category');
    span.textContent = definition.category;

    const p = document.createElement('p');
    p.classList.add('description');
    p.textContent = definition.description;

    const img = document.createElement('img');
    img.classList.add('post-image');
    if (definition.image_url.length <= 101) {
        img.src = 'assets/placeholder-image.png';
    } else {
        img.src = definition.image_url;
    }

    div.append(h3, span, p, img);

    a.append(div);

    li.append(a);

    return li;
}

export function renderComment(comment) {
    const li = document.createElement('li');
    li.classList.add('comment');

    const p = document.createElement('p');
    p.classList.add('comment-body');
    p.textContent = comment.text;

    const span = document.createElement('span');
    span.classList.add('timestamp');
    span.textContent = comment.created_at;

    li.append(p, span);

    return li;
}

export function renderSelectOption(category) {
    const option = document.createElement('option');
    option.textContent = category.name;
    option.value = category.name;
    return option;
}
