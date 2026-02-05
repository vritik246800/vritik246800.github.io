import { projects } from "../ts/projects.js";

const container = document.getElementById("projects");

function render(list) {
    container.innerHTML = "";
    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "project";
        div.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <span>${p.tech.join(" • ")}</span>
        `;
        container.appendChild(div);
    });
}

window.filterProjects = (cat) => {
    if (cat === "all") render(projects);
    else render(projects.filter(p => p.category === cat));
};

render(projects);

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("installBtn");
  if (installBtn) {
    installBtn.style.display = "inline-block";
  }
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
}
