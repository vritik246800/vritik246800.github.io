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
