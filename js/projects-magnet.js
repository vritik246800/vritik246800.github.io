// Separa letras de todos os elementos exceto botão
function splitText(element) {
    const text = element.textContent;
    element.textContent = "";
    const chars = [];

    [...text].forEach(char => {
        const span = document.createElement("span");
        span.className = "magnet-char";
        span.textContent = char === " " ? "\u00A0" : char;
        element.appendChild(span);
        chars.push(span);
    });

    return chars;
}

// Aplica efeito magnético
function applyMagnet(chars, range = 250, strength = 0.8) {
    document.addEventListener("mousemove", e => {
        chars.forEach(char => {
            const rect = char.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < range) {
                const force = (1 - dist / range) * strength;
                char.style.transform = `translate(${dx * force}px, ${dy * force}px)`;
            } else {
                char.style.transform = "translate(0, 0)";
            }
        });
    });
}

// Executa ao carregar
window.addEventListener("load", () => {
    const icon = document.querySelector(".unavailable-icon");
    const h2 = document.querySelector(".unavailable-section h2");
    const p = document.querySelector(".unavailable-section p");
    const badge = document.querySelector(".coming-soon-badge");

    let allChars = [];

    if (icon) allChars = allChars.concat(splitText(icon));
    if (h2) allChars = allChars.concat(splitText(h2));
    if (p) allChars = allChars.concat(splitText(p));
    if (badge) allChars = allChars.concat(splitText(badge));

    if (allChars.length > 0) {
        applyMagnet(allChars, 250, 0.8);
    }
});
