let lang = "pt";

function toggleLang() {
  const subtitle = document.getElementById("subtitle");

  if (lang === "pt") {
    subtitle.innerText =
      "Java Developer | Systems | Networks | GUI";
    lang = "en";
  } else {
    subtitle.innerText =
      "Desenvolvedor Java | Sistemas | Redes | GUI";
    lang = "pt";
  }
}

function getCurrentYear() {
    return new Date().getFullYear();
}

// aplica no footer
document.getElementById("currentYear").textContent = getCurrentYear();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("PWA ativa"))
    .catch(err => console.error("Erro SW:", err));
}

