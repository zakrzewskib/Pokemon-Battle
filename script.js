const cardsEls = document.querySelectorAll('.card');

cardsEls.forEach(card => {
  card.addEventListener('click', function() {
    console.log('Attack');
    card.classList.add('hidden');
  })
})