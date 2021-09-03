'use strict';

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const playerPokemonInfo = document.querySelector('.player-pokemon');
const computerPokemonInfo = document.querySelector('.computer-pokemon');
const winner = document.querySelector('.winner');
const result = document.querySelector('.result');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

const root = document.documentElement;
const rootVariables = getComputedStyle(root);

const scores = [0, 0];

const tops = [];
const length = 100;
const firstTop = 0;
const lastTop = -128;

const topsComputer = [];
const firstTopComputer = 0;
const lastTopComputer = 128.5;

const imgUrls = [''];

class Pokemon {
  constructor(src, type, name) {
    this.src = src;
    this.type = type;
    this.name = name;
  }
}

const indexes = [0, 1, 2, 3, 4];
const pokemonNames = [];
const pokemonTypes = [];
const pokemons = [];

const defineTypes = function () {
  pokemonTypes[0] = 'Electric';
  pokemonTypes[1] = 'Grass';
  pokemonTypes[2] = 'Fire';
  pokemonTypes[3] = 'Psychic';
  pokemonTypes[4] = 'Fairy';
  pokemonTypes[5] = 'Water';
};

const handLength = 5;

const defineImgUrls = function () {
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

const definePokemon = function () {
  defineTypes();
  defineImgUrls();

  for (let i = 0; i < pokemonTypes.length; i++) {
    pokemons.push(new Pokemon(imgUrls[i], pokemonTypes[i], pokemonNames[i]));
  }

  shuffleArray(indexes);
  shuffleArray(pokemons);

  pokemonsForComputer = [...pokemons];
  shuffleArray(pokemonsForComputer);

  setUrls();
};
1;
const setUrls = function () {
  for (let i = 0; i < playerCardsEls.length; i++) {
    playerCardsEls[i].children[0].setAttribute('src', pokemons[i].src);
  }
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

let computerPokemon;
let randomIndex;
let pokemonsForComputer;

const randomizePokemon = function () {
  computerPokemon = pokemonsForComputer[pokemonsForComputer.length - 1];
  pokemonsForComputer.pop();
};

let zIndex = 0;

const moveCard = function (card, player) {
  const left = player ? '0' : '-32rem';
  card.style.left = left;

  if (!player) {
    card.children[0].src = computerPokemon.src;
  }

  card.style.pointerEvents = 'none';
  card.style.transform = `rotate(0deg)`;
  card.style.zIndex = zIndex;
  zIndex++;

  setTop(card, player);

  // setTimeout(function () {
  //   card.classList.add('hidden');
  // }, 1000);
};

const computerPlaysPokemon = function (src) {
  randomizePokemon();
  moveCard(computerCardsEls[indexes[indexes.length - 1]], false);
  indexes.pop();
};

const setBattleCardImage = function (card, src) {
  card.children[0].src = src;
  card.classList.remove('hidden');
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

const fight = function (myPokemon) {
  // setInfoAboutBattle(myPokemon);
  const youWin = setWinner(myPokemon.type, computerPokemon.type);
  // setInfoAboutWinner(myPokemon.type, computerPokemon.type, youWin);
  setTimeout(setInfo, 500, myPokemon, myPokemon.type, computerPokemon.type, youWin);

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

const playPokemon = function (card) {
  console.log(card);
  const src = pokemons[card.id].src;
  const pokemonType = pokemons[card.id].type;
  const pokemonName = pokemons[card.id].name;

  const myPokemon = new Pokemon(src, pokemonType, pokemonName);
  console.log(myPokemon);

  moveCard(card, true);
  computerPlaysPokemon(src);
  fight(myPokemon);
};

const addEventListenersToPlayerCards = function () {
  playerCardsEls.forEach(card => {
    card.addEventListener('click', function () {
      playPokemon(this);
    });
  });
};

definePokemon();
addEventListenersToPlayerCards();
