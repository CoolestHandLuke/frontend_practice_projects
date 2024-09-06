const choicesInput = document.querySelector('#textarea');
const choicesParent = document.querySelector('#tags');

choicesInput.focus();

let choicesCounter = 0;
let timer = 0;

choicesInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = '';
        }, 10);

        randomSelect();
    }
    createNewChoice(e.target.value);
});

function createNewChoice(input) {
    const tags = input
        .split(',')
        .filter((tag) => tag.trim() !== '')
        .map((tag) => tag.trim());

    choicesParent.innerHTML = '';

    tags.forEach((tag) => {
        choicesParent.innerHTML += `<span class="tag">${tag}</span>`;
    });
}

function randomSelect() {
    const times = 30;
    let counter = 0;

    const interval = setInterval(() => {
        const randomTag = pickRandomTag();
        const tags = document.querySelectorAll('.tag');
        tags.forEach((tag) => {
            tag.classList.remove('highlight');
            if (tag === randomTag) {
                tag.classList.add('highlight');
            }
        });
        counter++;

        if (counter === times) clearInterval(interval);
    }, 100);
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[getRandomInt(0, tags.length)];
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
