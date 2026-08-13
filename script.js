const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header: transparente no topo, sólido após 80px de scroll
const header = document.getElementById("header");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 80);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Parallax do hero
const heroBg = document.getElementById("heroBg");
const gsapReady = window.gsap && window.ScrollTrigger;

if (heroBg && gsapReady && !prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

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
} else if (heroBg && !prefersReducedMotion) {
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

if (revealCards.length && gsapReady && !prefersReducedMotion) {
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

// Fade-in único por seção (nunca por elemento isolado) — no máximo um efeito por bloco
if (gsapReady && !prefersReducedMotion) {
  document.querySelectorAll(".reveal-group").forEach((group) => {
    const items = group.querySelectorAll(".reveal-item");
    const targets = items.length ? items : group;

    gsap.set(targets, { opacity: 0, y: 24 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: items.length ? 0.08 : 0,
      scrollTrigger: { trigger: group, start: "top 88%" },
    });
  });
}

// FAQ — accordion com transição de altura, primeiro item aberto por padrão
document.querySelectorAll(".faq-item__q").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});
