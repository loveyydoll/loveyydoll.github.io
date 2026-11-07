// Replace these paths with your own photographs; leave null for an honest empty frame.
const setupPhotos = {
  desk: null, // e.g. 'assets/setup/desk.jpg'
  macbook: null,
  iphone: null,
  guitar: null,
};
const setupAlt = {
  desk: 'My desk and workspace',
  macbook: 'My MacBook Air M5',
  iphone: 'My lavender iPhone 17',
  guitar: 'My Beckman Dreadnought Tigerburst acoustic guitar',
};
Object.entries(setupPhotos).forEach(([key, src]) => {
  if (!src) return;
  const slot = document.querySelector(`[data-photo="${key}"]`);
  if (!slot) return;
  const image = new Image();
  image.alt = setupAlt[key];
  image.decoding = 'async';
  image.onload = () => slot.replaceChildren(image);
  // A missing file leaves the labelled placeholder intact.
  image.src = src;
});
