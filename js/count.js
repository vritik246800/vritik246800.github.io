const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            // animar os cards em sequência
            const cards = entry.target.querySelectorAll(".project-card");

            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("show");
                }, index * 150);
            });

            animateCounter();
        }
    });
}, { threshold: 0.3 });

observer.observe(document.querySelector("#swift-projects"));

function animateCounter() {

    const counter = document.getElementById("swift-count");
    const total = document.querySelectorAll("#swift-projects .project-card").length;

    let start = 0;

    const update = () => {
        start++;
        counter.textContent = start;

        if (start < total) {
            requestAnimationFrame(update);
        }
    };

    update();
}