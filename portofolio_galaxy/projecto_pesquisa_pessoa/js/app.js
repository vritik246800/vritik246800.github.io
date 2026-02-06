/* =========================
   People Web Search – App Logic
   Passo 4: JS + Histórico (JSON-ready)
========================= */

// =========================
// DOM ELEMENTS
// =========================
const inputName = document.getElementById('fullName');
const searchBtn = document.getElementById('searchBtn');
const profileList = document.querySelector('.profile-list');
const imageGrid = document.querySelector('.image-grid');
const sourceList = document.querySelector('.source-list');
const historyList = document.getElementById('historyList');

// =========================
// STORAGE ADAPTER (JSON READY)
// =========================
class StorageAdapter {
  constructor(key) {
    this.key = key;
  }

  load() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data, null, 2));
  }
}

const storage = new StorageAdapter('people-search-history');

// =========================
// MOCK SEARCH ENGINE (OSINT STYLE)
// =========================
async function mockSearch(fullName) {
  // Simula um motor OSINT (substituível por APIs reais)
  return {
    name: fullName,
    profiles: [
      { platform: 'Instagram', url: `https://instagram.com/${slugify(fullName)}` },
      { platform: 'Facebook', url: `https://facebook.com/search/top?q=${encodeURIComponent(fullName)}` },
      { platform: 'TikTok', url: `https://www.tiktok.com/search?q=${encodeURIComponent(fullName)}` },
      { platform: 'X', url: `https://x.com/search?q=${encodeURIComponent(fullName)}` }
    ],
    images: [
      'https://via.placeholder.com/300x300?text=Image+1',
      'https://via.placeholder.com/300x300?text=Image+2',
      'https://via.placeholder.com/300x300?text=Image+3'
    ],
    sources: [
      `https://www.google.com/search?q=${encodeURIComponent(fullName)}`,
      `https://pt.wikipedia.org/wiki/${encodeURIComponent(fullName)}`
    ],
    timestamp: new Date().toISOString()
  };
}

// =========================
// RENDER FUNCTIONS
// =========================
function renderResults(data) {
  profileList.innerHTML = '';
  imageGrid.innerHTML = '';
  sourceList.innerHTML = '';

  data.profiles.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.platform}</strong> — <a href="${p.url}" target="_blank">${p.url}</a>`;
    profileList.appendChild(li);
  });

  data.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    imageGrid.appendChild(img);
  });

  data.sources.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${s}" target="_blank">${s}</a>`;
    sourceList.appendChild(li);
  });
}

function renderHistory() {
  const history = storage.load();
  historyList.innerHTML = '';

  history.reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${new Date(item.timestamp).toLocaleString()}`;
    li.onclick = () => renderResults(item);
    historyList.appendChild(li);
  });
}

// =========================
// HELPERS
// =========================
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// =========================
// EVENTS
// =========================
searchBtn.addEventListener('click', async () => {
  const fullName = inputName.value.trim();
  if (!fullName) return alert('Digite o nome completo');

  const result = await mockSearch(fullName);
  renderResults(result);

  const history = storage.load();
  history.push(result);
  storage.save(history);
  renderHistory();
});

// =========================
// INIT
// =========================
renderHistory();
