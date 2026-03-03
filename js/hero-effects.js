const text = "Vritik Valabdás";
const hero = document.getElementById("hero-name");
const typingSpeed = 100;

let index = 0;
let chars = [];

/* typing — escreve letra a letra, insere <br> no espaço entre as palavras */
function typeText() {
    if (index < text.length) {
        const letter = text[index];

        // Espaço entre "Vritik" e "Valabdás" → quebra de linha
        if (letter === " ") {
            hero.appendChild(document.createElement("br"));
        } else {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = letter;
            hero.appendChild(span);
        }

        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        splitLetters();
    }
}

/* split em letras — mantém o <br>, ignora-o no array de chars */
function splitLetters() {
    // Recolhe os spans já criados (ignora o br)
    chars = Array.from(hero.querySelectorAll(".char"));

    // Colore o primeiro char (V de Vritik)
    if (chars[0]) chars[0].classList.add("char-v");
}

/* efeito íman */
document.addEventListener("mousemove", e => {
    chars.forEach(span => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const range = 350;

        if (dist < range) {
            const strength = (1 - dist / range) * 1;
            span.style.transform =
                `translate(${dx * strength}px, ${dy * strength}px)`;
        } else {
            span.style.transform = "translate(0,0)";
        }
    });
});

/* mobile */
hero.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    chars.forEach(span => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = touch.clientX - cx;
        const dy = touch.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
            span.style.transform =
                `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
        }
    });
}, { passive: true });

hero.addEventListener("touchend", () => {
    chars.forEach(span => span.style.transform = "translate(0,0)");
});

window.addEventListener("load", typeText);