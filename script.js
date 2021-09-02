'use strict';

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const root = document.documentElement;
const rootVariables = getComputedStyle(root);

const randomBetween = (a, b) => Math.trunc(Math.random() * b) + a;

const pokemonTypes = [];

const tops = [];
const length = 100;
const firstTop = 0;
const lastTop = -128;

const topsComputer = [];
const firstTopComputer = 0;
const lastTopComputer = 128.5;

const imgUrls = [''];

class Pokemon {
  constructor(src, type) {
    this.src = src;
    this.type = type;
  }
}

const pokemons = [];

const defineTypes = function () {
  pokemonTypes[0] = 'Electric';
  pokemonTypes[1] = 'Grass';
  pokemonTypes[2] = 'Fire';
  pokemonTypes[3] = 'Psychic';
  pokemonTypes[4] = 'Water';
};

const defineImgUrls = function () {
  const prefix = './img/cards/';
  imgUrls[0] = prefix + 'Pikachu.png';
  imgUrls[1] = prefix + 'Bulbasaur.png';
  imgUrls[2] = prefix + 'Charmander.png';
  imgUrls[3] = prefix + 'Haunter.png';
  imgUrls[4] = prefix + 'Magikarp.png';
};

const definePokemon = function () {
  defineTypes();
  defineImgUrls();

  for (let i = 0; i < pokemonTypes.length; i++) {
    pokemons.push(new Pokemon(imgUrls[i], pokemonTypes[i]));
  }

  console.log(pokemons);
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

  console.log(tops[length - 1], topsComputer[length - 1]);

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

const randomizePokemon = function () {
  randomIndex = randomBetween(0, pokemons.length - 1);
  computerPokemon = pokemons[randomIndex];
};

const moveCard = function (card, player) {
  const left = player ? '0' : '-32rem';
  card.style.left = left;

  if (!player) {
    card.children[0].src = computerPokemon.src;
  }

  card.style.pointerEvents = 'none';
  card.style.transform = `rotate(0deg)`;
  card.style.zIndex = 0;

  setTop(card, player);

  setTimeout(function () {
    card.classList.add('hidden');
  }, 1000);
};

const computerPlaysPokemon = function (src) {
  randomizePokemon();
  moveCard(computerCardsEls[randomIndex], false);
};

const setBattleCardImage = function (card, src) {
  card.children[0].src = src;
  card.classList.remove('hidden');
};

const removeCard = function (card) {
  card.classList.add('hidden');
};

const playPokemon = function (card) {
  const imageSrc = card.children[0].src;
  const pokemonType = pokemonTypes[card.id];

  moveCard(card, true);

  computerPlaysPokemon(imageSrc);
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
