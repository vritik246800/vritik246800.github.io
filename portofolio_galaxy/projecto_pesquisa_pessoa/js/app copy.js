/* =========================
   App Logic
========================= */

const inputName   = document.getElementById('fullName');
const searchBtn   = document.getElementById('searchBtn');
const profileList = document.querySelector('.profile-list');
const imageGrid   = document.querySelector('.image-grid');
const sourceList  = document.querySelector('.source-list');
const historyList = document.getElementById('historyList');

// render resultados
function renderResults(data) {
  profileList.innerHTML = '';
  imageGrid.innerHTML = '';
  sourceList.innerHTML = '';

  data.profiles.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.platform}</strong> — <a href="${p.url}" target="_blank">${p.url}</a>`;
    profileList.appendChild(li);
  });

  data.sources.forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${s}" target="_blank">${s}</a>`;
    sourceList.appendChild(li);
  });
}

// render histórico lateral
async function renderHistory() {
  historyList.innerHTML = '';

  data.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${new Date(item.timestamp).toLocaleString()}`;
    li.onclick = () => renderResults(item);
    historyList.appendChild(li);
  });
}

// evento pesquisar
searchBtn.addEventListener('click', async () => {
  const name = inputName.value.trim();
  if (!name) return alert('Digite o nome completo');

  // 👇 escolhe a pasta do projeto (1ª vez)
  await storage.requestProjectDirectory();

  triggerCSESearch(name);

const result = buildOSINTResult(name);

// ⏳ espera o Google mexer no DOM
setTimeout(async () => {
  renderResults(result);

  await storage.save(result);
  renderHistory();
}, 800);
});

// inicia histórico
let data = [];
(async () => {
  await storage.requestProjectDirectory();
  data = await storage.load();
  renderHistory();
})();
