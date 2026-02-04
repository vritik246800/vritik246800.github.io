const text = "Vritik Valabdás";
const hero = document.getElementById("hero-name");
const typingSpeed = 100;

let index = 0;
let chars = [];

/* typing */
function typeText() {
    if (index < text.length) {
        hero.textContent += text[index];
        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        splitLetters();
    }
}

/* split em letras */
function splitLetters() {
    const content = hero.textContent;
    hero.innerHTML = "";
    chars = [];

    [...content].forEach(letter => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = letter === " " ? "\u00A0" : letter;
        hero.appendChild(span);
        chars.push(span);
    });
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

/* mobile: toque ativa íman leve */
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

/* start */
window.addEventListener("load", typeText);
