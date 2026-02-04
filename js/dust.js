const text = document.querySelector(".dust-text");

text.addEventListener("mouseleave", () => {
    const rect = text.getBoundingClientRect();
    const letters = text.innerText.split("");

    letters.forEach((char, i) => {
        const span = document.createElement("span");
        span.classList.add("particle");
        span.textContent = char;

        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;

        span.style.left = rect.width / letters.length * i + "px";
        span.style.top = "0px";
        span.style.setProperty("--x", `${x}px`);
        span.style.setProperty("--y", `${y}px`);

        text.appendChild(span);

        setTimeout(() => span.remove(), 1200);
    });
});
