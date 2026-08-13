const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 8
    ? "0 4px 16px rgba(0,0,0,0.06)"
    : "none";
});

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

// "O que fazemos": seção fica fixa na tela e os cards aparecem um a um conforme o scroll
const revealCards = document.querySelectorAll(".card--reveal");

if (revealCards.length && window.gsap && window.ScrollTrigger) {
  gsap.set(revealCards, { opacity: 0, y: 40 });

  const revealTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#incluso",
      start: "top top",
      end: "+=" + revealCards.length * 320,
      scrub: 0.5,
      pin: true,
      anticipatePin: 1,
    },
  });

  revealCards.forEach((card, i) => {
    revealTl.to(card, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, i);
  });
}

// Fade-up simples ao entrar na tela, usado pelas demais seções
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length && window.gsap && window.ScrollTrigger) {
  revealEls.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}
