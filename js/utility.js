const randomBetween = (a, b) => Math.trunc(Math.random() * b) + a;

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const emojis = [
  {
    type: 'Fire',
    emoji: '🔥',
  },
  {
    type: 'Electric',
    emoji: '⚡',
  },
  {
    type: 'Grass',
    emoji: '🍃',
  },
  {
    type: 'Water',
    emoji: '💦',
  },
  {
    type: 'Fairy',
    emoji: '🌟',
  },
  {
    type: 'Psychic',
    emoji: '👁‍🗨',
  },
];
