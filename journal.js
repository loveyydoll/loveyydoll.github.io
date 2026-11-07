/* Copy editing and quiet paper motion. No build tools or accounts required. */
(async () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const editing = new URLSearchParams(location.search).has('edit');
  const storageKey = 'loveyy-copy-draft-v1';
  const nodes = [...document.querySelectorAll('[data-copy]')].filter(node => !node.closest('.scrap, .theme-toggle') && node.id !== 'year');
  const fallback = Object.fromEntries(nodes.map(node => [node.dataset.copy, node.textContent]));
  let published = {};
  try {
    const response = await fetch('copy.json');
    if (response.ok) published = await response.json();
  } catch { /* The authored HTML remains readable offline. */ }
  let draft = {};
  if (editing) {
    try { draft = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch {}
  }
  const apply = values => nodes.forEach(node => {
    if (typeof values[node.dataset.copy] === 'string') node.textContent = values[node.dataset.copy];
  });
  apply({...fallback, ...published, ...draft});
  if (editing) {
    document.body.classList.add('copy-editing');
    const panel = document.createElement('aside');
    panel.className = 'copy-tools';
    panel.setAttribute('aria-label', 'Text editing tools');
    const label = document.createElement('strong');
    label.textContent = 'Pencil mode';
    const help = document.createElement('p');
    help.textContent = 'Click outlined text to edit. Changes stay on this browser until you export copy.json and add it to the repository.';
    const status = document.createElement('span');
    status.setAttribute('role', 'status');
    status.textContent = 'Your private draft is ready.';
    function persist() {
      draft = {...draft, ...Object.fromEntries(nodes.map(node => [node.dataset.copy, node.textContent]))};
      try { localStorage.setItem(storageKey, JSON.stringify(draft)); status.textContent = 'Draft saved on this browser.'; }
      catch { status.textContent = 'Browser storage unavailable. Export to keep your edits.'; }
    }
    nodes.forEach(node => {
      node.contentEditable = 'plaintext-only';
      node.spellcheck = true;
      node.addEventListener('input', persist);
      node.addEventListener('click', event => { if (node.closest('a')) event.preventDefault(); });
    });
    const download = document.createElement('button');
    download.type = 'button'; download.textContent = 'Export copy.json';
    download.addEventListener('click', () => {
      persist();
      const blob = new Blob([JSON.stringify({...published, ...draft}, null, 2) + '\n'], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'copy.json'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    const reset = document.createElement('button');
    reset.type = 'button'; reset.textContent = 'Discard local draft';
    reset.addEventListener('click', () => {
      if (!confirm('Discard your unpublished text edits on this browser?')) return;
      draft = {}; try { localStorage.removeItem(storageKey); } catch {}
      apply({...fallback, ...published}); status.textContent = 'Showing published text.';
    });
    panel.append(label, help, download, reset, status); document.body.append(panel);
    // Keep rotating cards stable while the surrounding copy is being edited.
    const hold = document.querySelector('#hold-pages'); if (hold) hold.checked = true;
    return;
  }
  // A theatrical title card, not a network progress indicator. Once per tab session.
  let showIntro = true;
  try { showIntro = !sessionStorage.getItem('loveyy-opened'); sessionStorage.setItem('loveyy-opened','1'); } catch {}
  if (showIntro) {
    const opening = document.createElement('div'); opening.className = 'journal-opening';
    opening.setAttribute('aria-hidden','true');
    const star = document.createElement('span'); star.className = 'opening-star'; star.textContent = '✳';
    const title = document.createElement('span'); title.className = 'opening-title'; title.textContent = 'a little corner of the internet';
    const note = document.createElement('span'); note.className = 'opening-note'; note.textContent = 'opening the scrapbook…';
    opening.append(star,title,note); document.body.append(opening);
    setTimeout(() => opening.remove(), reduced.matches ? 650 : 1400);
  }
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('paper-arrives'); observer.unobserve(entry.target);
    }), {threshold:.08});
    document.querySelectorAll('.setup-photo, .pc-note, .upgrade-note, .topic-heading, .setup-invitation, .bench-project, .guestbook-note').forEach(node => observer.observe(node));
    reduced.addEventListener('change', () => { if (reduced.matches) observer.disconnect(); });
  }
})();
