'use strict';

const root = document.documentElement;
const rootVariables = getComputedStyle(root);

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const playerPokemonInfo = document.querySelector('.player-pokemon');
const computerPokemonInfo = document.querySelector('.computer-pokemon');
const winner = document.querySelector('.winner');
const result = document.querySelector('.result');

const gameResult = document.querySelector('.game-over');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

const scores = [0, 0];

const tops = [];
const topsComputer = [];

const length = 100;

const firstTop = 0;
const lastTop = -128;

const firstTopComputer = 0;
const lastTopComputer = 128.5;

const handLength = 5;
const indexesOfComputerCards = [0, 1, 2, 3, 4];
const imgUrls = [''];
const pokemonNames = [];
const pokemonTypes = [];

const pokemons = [];

let computerPokemon;
let randomIndex;
let pokemonsForComputer;

let zIndexForNextPlayedCards = 0;

let cardsPlayed = 0;

class Pokemon {
  constructor(src, type, name) {
    this.src = src;
    this.type = type;
    this.name = name;
  }
}

const defineTypes = function () {
  pokemonTypes[0] = 'Electric';
  pokemonTypes[1] = 'Grass';
  pokemonTypes[2] = 'Fire';
  pokemonTypes[3] = 'Psychic';
  pokemonTypes[4] = 'Fairy';
  pokemonTypes[5] = 'Water';
};

const defineImgUrlsAndNames = function () {
  const prefix = './img/cards/';

  pokemonNames[0] = 'Pikachu';
  imgUrls[0] = prefix + pokemonNames[0] + '.png';

  pokemonNames[1] = 'Bulbasaur';
  imgUrls[1] = prefix + pokemonNames[1] + '.png';

  pokemonNames[2] = 'Charmander';
  imgUrls[2] = prefix + pokemonNames[2] + '.png';

  pokemonNames[3] = 'Haunter';
  imgUrls[3] = prefix + pokemonNames[3] + '.png';

  pokemonNames[4] = 'Jigglypuff';
  imgUrls[4] = prefix + pokemonNames[4] + '.png';

  pokemonNames[5] = 'Magikarp';
  imgUrls[5] = prefix + pokemonNames[5] + '.png';
};

const setUrlsForPlayerCards = function () {
  for (let i = 0; i < playerCardsEls.length; i++) {
    playerCardsEls[i].children[0].setAttribute('src', pokemons[i].src);
  }
};

const definePokemons = function () {
  defineTypes();
  defineImgUrlsAndNames();

  for (let i = 0; i < pokemonTypes.length; i++) {
    pokemons.push(new Pokemon(imgUrls[i], pokemonTypes[i], pokemonNames[i]));
  }

  shuffleArray(indexesOfComputerCards);

  shuffleArray(pokemons);

  pokemonsForComputer = [...pokemons];

  shuffleArray(pokemonsForComputer);

  setUrlsForPlayerCards();
};

const randomizePokemonForComputer = function () {
  computerPokemon = pokemonsForComputer[pokemonsForComputer.length - 1];
  pokemonsForComputer.pop();
};

const defineTopsForAnimation = function (top, first, last) {
  const step = (first - last) / (length - 1);

  for (let i = 0; i < length; i++) {
    top[i] = `${first - step * i}%`;
  }
};

const setTop = function (card, player) {
  defineTopsForAnimation(tops, firstTop, lastTop);
  defineTopsForAnimation(topsComputer, firstTopComputer, lastTopComputer);

  let i = 0;
  let time = 5;

  let interval = setInterval(function () {
    card.style.top = player ? tops[i] : topsComputer[i];
    i++;
  }, time);

  setTimeout(function () {
    clearInterval(interval);
  }, length * time);
};

const moveCard = function (card, player) {
  const left = player ? '0' : '-32rem';
  card.style.left = left;

  if (!player) {
    card.children[0].src = computerPokemon.src;
  }

  card.style.pointerEvents = 'none';
  card.style.transform = `rotate(0deg)`;
  card.style.zIndex = zIndexForNextPlayedCards;
  zIndexForNextPlayedCards++;

  setTop(card, player);
};

const computerPlaysPokemon = function (src) {
  randomizePokemonForComputer();
  moveCard(computerCardsEls[indexesOfComputerCards[indexesOfComputerCards.length - 1]], false);
  indexesOfComputerCards.pop();
};

const setInfoAboutWinner = function (type1, type2, youWin) {
  if (youWin[1] === 'draw') {
    winner.textContent = "It's a draw!";
    result.textContent = `${type2}${emojis.get(type2)} vs ${type1}${emojis.get(type1)}`;
  } else if (youWin[0]) {
    winner.textContent = 'You win!';
    result.textContent = `${type2}${emojis.get(type2)} loses to ${type1}${emojis.get(type1)}`;
  } else {
    winner.textContent = 'You lose!';
    result.textContent = `${type2}${emojis.get(type2)} beats ${type1}${emojis.get(type1)}`;
  }
};

const setInfoAboutBattle = function (myPokemon) {
  playerPokemonInfo.textContent = myPokemon.name;
  computerPokemonInfo.textContent = computerPokemon.name;

  playerPokemonInfo.textContent += emojis.get(myPokemon.type);
  computerPokemonInfo.textContent += emojis.get(computerPokemon.type);
};

const setInfo = function (myPokemon, type1, type2, youWin) {
  setInfoAboutBattle(myPokemon);
  setInfoAboutWinner(type1, type2, youWin);
};

const increaseScore = function (youWin) {
  if (youWin[1] !== 'draw') {
    if (youWin[0]) {
      scores[1]++;
    } else {
      scores[0]++;
    }
  }

  score0.textContent = scores[0];
  score1.textContent = scores[1];
};

const fight = function (myPokemon) {
  const youWin = setWinner(myPokemon.type, computerPokemon.type);

  setTimeout(setInfo, 500, myPokemon, myPokemon.type, computerPokemon.type, youWin);

  increaseScore(youWin);
};

const checkIfGameEnded = function () {
  if (cardsPlayed === handLength) {
    if (scores[1] > scores[0]) {
      gameResult.textContent = 'You won!🏆';
    } else if (scores[0] > scores[1]) {
      gameResult.textContent = 'You lost!😢';
    } else {
      gameResult.textContent = "It's a draw!🤝";
    }
  }
};

const playPokemon = function (card) {
  const src = pokemons[card.id].src;
  const pokemonType = pokemons[card.id].type;
  const pokemonName = pokemons[card.id].name;

  const myPokemon = new Pokemon(src, pokemonType, pokemonName);

  moveCard(card, true); // true - move player's card
  computerPlaysPokemon(src);
  fight(myPokemon);

  cardsPlayed++;
  setTimeout(checkIfGameEnded, 5000);
};

const addEventListenersToPlayerCards = function () {
  playerCardsEls.forEach(card => {
    card.addEventListener('click', function () {
      playPokemon(this);
    });
  });
};

definePokemons();
addEventListenersToPlayerCards();
