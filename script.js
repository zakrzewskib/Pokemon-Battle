'use strict';

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const root = document.documentElement;
const rootVariables = getComputedStyle(root);

const imgUrls = '';

const pokemonTypes = [];

const computerPlaysPokemon = function (src) {
  const pokemonType = pokemonTypes[0];
  setBattleCardImage(secondBattleCard, './img/cards/Pikachu.png');
  removeCard(computerCardsEls[0]);
};

const setBattleCardImage = function (card, src) {
  card.children[0].src = src;
  card.classList.remove('hidden');
};

const removeCard = function (card) {
  card.classList.add('hidden');
};

const moveCard = function (card) {
  console.log(card.style);
  // top: 50%;
  // transform: translateY(-50%);

  const top = '-57rem';

  card.style.top = top;

  card.style.transform = `rotate(0deg)`;
};

const playPokemon = function (card) {
  const imageSrc = card.children[0].src;
  const pokemonType = pokemonTypes[card.id];

  setBattleCardImage(firstBattleCard, imageSrc);

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
