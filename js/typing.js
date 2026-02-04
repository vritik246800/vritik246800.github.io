const text = "Vritik Valabdás";
const speed = 120; // velocidade de digitação
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing-name").textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, speed);
    }
}

window.addEventListener("load", typeEffect);
