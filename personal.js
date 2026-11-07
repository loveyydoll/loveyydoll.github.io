const search = document.querySelector('#artist-search');
if (search) {
  const cards = [...document.querySelectorAll('[data-artist]')];
  const normalise = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  search.addEventListener('input', () => {
    const query = normalise(search.value.trim());
    let visible = 0;
    cards.forEach(card => { card.hidden = !normalise(card.dataset.artist).includes(query); if (!card.hidden) visible++; });
    document.querySelector('#result-count').textContent = `${visible} ${visible === 1 ? 'artist' : 'artists'}`;
    document.querySelector('#no-results').hidden = visible !== 0;
  });
}
