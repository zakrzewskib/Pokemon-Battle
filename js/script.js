'use strict';

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const playerPokemonInfo = document.querySelector('.player-pokemon');
const computerPokemonInfo = document.querySelector('.computer-pokemon');
const winner = document.querySelector('.winner');
const result = document.querySelector('.result');

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

const setInfoAboutWinner = function (type1, type2, youWin) {
  if (youWin[1] === 'draw') {
    winner.textContent = "It's a draw!";
    result.textContent = `${type2}${emojis.get(type2)} vs ${type1}${emojis.get(type1)}`;
  } else {
    winner.textContent = youWin ? 'You win!' : 'You lose!';
    result.textContent = `${type2}${emojis.get(type2)} ${youWin ? 'loses to' : 'beats'} ${type1}${emojis.get(type1)}`;
  }
};

const setWinner = function (type1, type2) {
  if (type1 === type2) {
    return [false, 'draw'];
  }

  // WINNING
  else if (type1 === 'Fire' && (type2 === 'Bug' || type2 === 'Steel' || type2 === 'Grass' || type2 === 'Ice')) {
    return [true, ''];
  } else if (type1 === 'Water' && (type2 === 'Ground' || type2 === 'Rock' || type2 === 'Fire')) {
    return [true, ''];
  } else if (type1 === 'Grass' && (type2 === 'Ground' || type2 === 'Rock' || type2 === 'Water')) {
    return [true, ''];
  } else if (type1 === 'Electric' && (type2 === 'Flying' || type2 === 'Water')) {
    return [true, ''];
  } else if (type1 === 'Psychic' && (type2 === 'Fighting' || type2 === 'Poison')) {
    return [true, ''];
  } else if (type1 === 'Fairy' && (type2 === 'Fighting' || type2 === 'Dragon' || type2 === 'Dark')) {
    return [true, ''];
  }

  // LOSING
  else if (type1 === 'Fire' && (type2 === 'Rock' || type2 === 'Water' || type2 === 'Dragon')) {
    return [false, ''];
  } else if (type1 === 'Water' && (type2 === 'Grass' || type2 === 'Dragon')) {
    return [false, ''];
  } else if (
    type1 === 'Grass' &&
    (type2 === 'Flying' || type2 === 'Poison' || type2 === 'Bug' || type2 === 'Steel' || type2 === 'Fire')
  ) {
    return [false, ''];
  } else if (type1 === 'Electric' && (type2 === 'Ground' || type2 === 'Grass' || type2 === 'Grass')) {
    return [false, ''];
  } else if (type1 === 'Psychic' && (type2 === 'Steel' || type2 === 'Dark')) {
    return [false, ''];
  } else if (type1 === 'Fairy' && (type2 === 'Poison' || type2 === 'Steel' || type2 === 'Fire')) {
    return [false, ''];
  }

  // NO DATA
  return [false, 'draw'];
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
};

const playPokemon = function (card) {
  const src = card.children[0].src;
  const pokemonType = pokemonTypes[card.id];
  const pokemonName = pokemonNames[card.id];

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
