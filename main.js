(() => {
  // Fonction principale
  function initSearchInModal() {
    const observer = new MutationObserver(onDomMutated);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function onDomMutated(mutations) {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1 && node.matches('ytd-add-to-playlist-renderer')) {
          injectSearchField(node);
        }
      }
    }
  }

  function injectSearchField(modal) {
    if (modal.querySelector('.yt-playlist-search')) return;
    const header = modal.querySelector('#header');
    const input = document.createElement('input');
    input.className = 'yt-playlist-search';
    input.style.width = "100%";
    input.style.padding = "1rem";
    input.placeholder = 'Type something…';
    header.insertAdjacentElement('afterend', input);
    input.addEventListener('input', onSearchInput);
    input.focus();
  }

  function onSearchInput(e) {
    const filter = e.target.value.toLowerCase();
    document
      .querySelectorAll('ytd-playlist-add-to-option-renderer')
      .forEach((item, idx) => {
        if (idx === 0) {
          item.style.display = '';
          return;
        }

        const titleEl = item.querySelector('yt-formatted-string#label');
        if (!titleEl) return;

        const title = titleEl.textContent.toLowerCase();
        item.style.display = title.includes(filter) ? '' : 'none';
      });
  }

  // Démarrage
  window.addEventListener('load', initSearchInModal);
})();
