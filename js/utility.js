const randomBetween = (a, b) => Math.trunc(Math.random() * b) + a;

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const emojis = new Map();
emojis.set('Fire', '🔥');
emojis.set('Grass', '🍃');
emojis.set('Water', '💦');
emojis.set('Fairy', '🌟');
emojis.set('Psychic', '👁‍🗨');
emojis.set('Electric', '⚡');

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
