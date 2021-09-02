'use strict';

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const playerPokemonInfo = document.querySelector('.player-pokemon');
const computerPokemonInfo = document.querySelector('.computer-pokemon');

const root = document.documentElement;
const rootVariables = getComputedStyle(root);

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
};

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
};

const definePokemon = function () {
  defineTypes();
  defineImgUrls();

  for (let i = 0; i < pokemonTypes.length; i++) {
    pokemons.push(new Pokemon(imgUrls[i], pokemonTypes[i], pokemonNames[i]));
  }

  shuffleArray(indexes);
  shuffleArray(pokemons);
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

const randomizePokemon = function () {
  computerPokemon = pokemons[pokemons.length - 1];
  pokemons.pop();
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

const removeCard = function (card) {
  card.classList.add('hidden');
};

const setInfoAboutBattle = function (myPokemon) {
  playerPokemonInfo.textContent = myPokemon.name;
  computerPokemonInfo.textContent = computerPokemon.name;

  for (let el of emojis) {
    if (el.type == myPokemon.type) {
      playerPokemonInfo.textContent += el.emoji;
    }
    if (el.type == computerPokemon.type) {
      computerPokemonInfo.textContent += el.emoji;
    }
  }
};

const fight = function (myPokemon) {
  setInfoAboutBattle(myPokemon);
  console.log(pokemonNames);
};

const playPokemon = function (card) {
  const src = card.children[0].src;
  const pokemonType = pokemonTypes[card.id];
  const pokemonName = pokemonNames[card.id];

  console.log(pokemonNames);
  console.log(card.id);
  const myPokemon = new Pokemon(src, pokemonType, pokemonName);

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
