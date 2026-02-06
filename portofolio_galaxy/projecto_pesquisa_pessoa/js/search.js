/* =========================
   Search Helpers
========================= */

// força pesquisa no Google CSE
function triggerCSESearch(query) {
  const input = document.querySelector('input.gsc-input');
  if (!input) return;

  input.value = query;
  input.dispatchEvent(new Event('input'));

  const btn = document.querySelector('.gsc-search-button');
  if (btn) btn.click();
}

// constrói resultado OSINT base
function buildOSINTResult(fullName) {
  return {
    name: fullName,
    profiles: [
      { platform: 'Instagram', url: `https://instagram.com/${slugify(fullName)}` },
      { platform: 'Facebook', url: `https://facebook.com/search/top?q=${encodeURIComponent(fullName)}` },
      { platform: 'TikTok', url: `https://www.tiktok.com/search?q=${encodeURIComponent(fullName)}` },
      { platform: 'X', url: `https://x.com/search?q=${encodeURIComponent(fullName)}` }
    ],
    images: [],
    sources: [
      `https://www.google.com/search?q=${encodeURIComponent(fullName)}`
    ],
    timestamp: new Date().toISOString()
  };
}

// helper
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
}
