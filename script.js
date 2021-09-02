'use strict';

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const root = document.documentElement;
const rootVariables = getComputedStyle(root);

const imgUrls = '';

const pokemonTypes = [];

const tops = [];
const length = 100;
const firstTop = 0;
const lastTop = -128;

const topsComputer = [];
const firstTopComputer = 0;
const lastTopComputer = 128.5;

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

const moveCard = function (card, player) {
  const left = player ? '0' : '-32rem';
  card.style.left = left;

  if (!player) card.children[0].src = './img/cards/Pikachu.png';

  card.style.pointerEvents = 'none';
  card.style.transform = `rotate(0deg)`;
  card.style.zIndex = 0;

  setTop(card, player);
};

// const setComputerTop = function (card) {
//   card.style.top = '128.5%';
// };

// const moveComputerCard = function (card) {
//   card.style.pointerEvents = 'none';
//   const left = '-22rem';

//   card.style.transform = `rotate(0deg)`;
//   card.style.zIndex = 0;

//   card.style.left = left;
//   setComputerTop(card);
// };

const computerPlaysPokemon = function (src) {
  moveCard(computerCardsEls[0], false);
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

  // setBattleCardImage(firstBattleCard, imageSrc);

  moveCard(card, true);

  computerPlaysPokemon(imageSrc);
};

const definePokemon = function () {
  pokemonTypes[0] = 'Electric';
  pokemonTypes[1] = 'Fire';
  pokemonTypes[2] = 'Grass';
  pokemonTypes[3] = 'Psychic';
  pokemonTypes[4] = 'Fairy';
};

const addEventListenersToPlayerCards = function () {
  playerCardsEls.forEach(card => {
    card.addEventListener('click', function () {
      // setTimeout(playPokemon, 200, this);
      playPokemon(this);
      // removeCard(this);
    });
  });
};

definePokemon();
addEventListenersToPlayerCards();
