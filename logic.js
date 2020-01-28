// gives tags in html variables
const addGames = document.querySelector('.add-games');
const gamesList = document.querySelector('.games');
const clearAll = document.querySelector('#clear');
const checkAll = document.querySelector('#check-all');
const uncheckAll = document.querySelector('#uncheck-all');

// variable items is equal to whatever is in browser local storage or if nothing in there defaults to empty array
const games = JSON.parse(localStorage.getItem('games')) || [];

// takes input and stores it into an array and stores it into local storage
function addGame(e) {
    console.log('hello')
    e.preventDefault();
    const title = (this.querySelector('[name=game]')).value;
    const game = {
        title,
        checked: false
    };
    games.push(game);
    populateList(games, gamesList);
    localStorage.setItem('games', JSON.stringify(games));
    this.reset();
}


function populateList(games = [], gamesList) {
    gamesList.innerHTML = games.map((game, i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="game${i}" ${game.checked ? 'checked' : ''} />
        <label for="game${i}">${game.title}</label>
        </li>
        `;
    }).join('');
}

// handles checking items and storage into local storage
function toggleChecked(e) {
    if (!e.target.matches('input')) return;
    const pee = e.target;
    const index = pee.dataset.index;
    games[index].checked = !games[index].checked;
    localStorage.setItem('games', JSON.stringify(games));
    populateList(games, gamesList);
}

function toClearAll() {
    localStorage.clear();
    populateList([], gamesList);
}

function toCheckAll(e) {
    games.forEach((game, index) => {
        games[index].checked = true
    });
    localStorage.setItem('games', JSON.stringify(games));
    populateList(games, gamesList);
}

function toUncheckAll(e) {
    games.forEach((game, index) => {
        games[index].checked = false
    });
    localStorage.setItem('games', JSON.stringify(games));
    populateList(games, gamesList);
}

addGames.addEventListener('submit', addGame);
gamesList.addEventListener('click', toggleChecked);
clearAll.addEventListener('click', toClearAll);
checkAll.addEventListener('click', toCheckAll);
uncheckAll.addEventListener('click', toUncheckAll);

populateList(games, gamesList);