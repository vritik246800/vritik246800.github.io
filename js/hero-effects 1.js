const h2 = document.getElementById("magnet-h2");
const text = h2.textContent;
h2.textContent = "";

// separar letras
[...text].forEach(char => {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char;
  h2.appendChild(span);
});

const letters = [...h2.querySelectorAll("span")];

document.addEventListener("mousemove", e => {
  letters.forEach(letter => {
    const rect = letter.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const magnetRange = 200;

    if (distance < magnetRange) {
      const force = (1 - distance / magnetRange) * 0.90;
      letter.style.transform = `translate(${dx * force}px, ${dy * force}px)`;
    } else {
      letter.style.transform = "translate(0,0)";
    }
  });
});
