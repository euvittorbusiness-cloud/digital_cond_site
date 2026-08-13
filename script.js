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

if (heroBg && window.gsap && window.ScrollTrigger && window.Lenis) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.to(heroBg, {
    yPercent: 18,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
} else if (heroBg) {
  // Fallback sem CDN: parallax simples baseado no scroll nativo
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

const revealCards = document.querySelectorAll(".card--reveal");

if (revealCards.length && window.gsap && window.ScrollTrigger) {
  gsap.set(revealCards, { opacity: 0, y: 40 });

  const revealTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#servicos",
      start: "top top",
      end: "+=" + revealCards.length * 400,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  revealCards.forEach((card, i) => {
    revealTl.to(card, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, i);
  });
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
