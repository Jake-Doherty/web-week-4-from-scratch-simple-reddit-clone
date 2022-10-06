export function renderDefinition(definition) {
    const li = document.createElement('li');
    li.classList.add('definition-item');

    const a = document.createElement('a');
    a.classList.add('definition-link');
    a.href = '/definition/index.html';
    // a.href = `/definition/?id=${definition.id}`;

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
    img.src = definition.image_url;

    div.append(h3, span, p, img);

    a.append(div);

    li.append(a);

    return li;
}
