const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 8
    ? "0 4px 16px rgba(0,0,0,0.06)"
    : "none";
});

const rotatingWords = [
  "sem burocracia.",
  "100% online.",
  "mais acessível.",
  "mais simples.",
  "no seu tempo.",
];

const heroBg = document.getElementById("heroBg");

if (heroBg) {
  const parallaxFactor = 0.35;
  let ticking = false;

  const updateParallax = () => {
    heroBg.style.transform = `translateY(${window.scrollY * parallaxFactor}px)`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

const rotatingWordEl = document.getElementById("rotatingWord");

if (rotatingWordEl) {
  let wordIndex = 0;

  setInterval(() => {
    rotatingWordEl.classList.add("is-transitioning");

    setTimeout(() => {
      wordIndex = (wordIndex + 1) % rotatingWords.length;
      rotatingWordEl.textContent = rotatingWords[wordIndex];
      rotatingWordEl.classList.remove("is-transitioning");
    }, 350);
  }, 2600);
}
