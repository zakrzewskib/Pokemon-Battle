'use strict';

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const root = document.documentElement;
const rootVariables = getComputedStyle(root);

const imgUrls = '';

const pokemonTypes = [];

const setComputerTop = function (card) {
  card.style.top = '128.5%';
};

const moveComputerCard = function (card) {
  card.style.pointerEvents = 'none';
  const left = '-22rem';
  card.children[0].src = './img/cards/Pikachu.png';

  card.style.transform = `rotate(0deg)`;
  card.style.zIndex = 0;

  card.style.left = left;
  setComputerTop(card);
};

const computerPlaysPokemon = function (src) {
  // setBattleCardImage(secondBattleCard, './img/cards/Pikachu.png');
  moveComputerCard(computerCardsEls[0]);
};

const setBattleCardImage = function (card, src) {
  card.children[0].src = src;
  card.classList.remove('hidden');
};

const removeCard = function (card) {
  card.classList.add('hidden');
};

const tops = [];
const length = 100;
const firstTop = 0;
const secondTop = -128;

const defineTopsForAnimation = function () {
  const step = (firstTop - secondTop) / (length - 1);

  for (let i = 0; i < length; i++) {
    tops.push(`${firstTop - step * i}%`);
  }
};

const setTop = function (card) {
  defineTopsForAnimation();

  console.log(tops[0]);
  console.log(tops[length - 1]);

  let i = 0;
  let time = 5;

  let interval = setInterval(function () {
    // console.log(card.style.top);
    card.style.top = tops[i];
    i++;
  }, time);

  setTimeout(function () {
    clearInterval(interval);
  }, length * time);
};

const moveCard = function (card) {
  // const left = '-28rem';
  card.style.pointerEvents = 'none';
  const left = '0rem';

  card.style.transform = `rotate(0deg)`;
  card.style.zIndex = 0;

  card.style.left = left;
  setTop(card);
};

const playPokemon = function (card) {
  const imageSrc = card.children[0].src;
  const pokemonType = pokemonTypes[card.id];

  // setBattleCardImage(firstBattleCard, imageSrc);

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
      moveCard(this);
    });
  });
};

definePokemon();
addEventListenersToPlayerCards();
