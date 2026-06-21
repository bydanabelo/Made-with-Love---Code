(function () {
  var targets = document.querySelectorAll(
    '.work-card, .service-card, .exp-card, .stat, .hero h1, .hero__text, .works__header, .works__intro, .services h2, .experience h2, .freelancing h2, .footer__row, .project__image, .project__block'
  );

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();

/* Services accordion */
(function () {
  var cards = document.querySelectorAll('.services__list .service-card');
  if (!cards.length) return;

  function open(card) {
    cards.forEach(function (c) {
      var isOpen = c === card;
      c.classList.toggle('is-open', isOpen);
      c.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  cards.forEach(function (card) {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', card.classList.contains('is-open') ? 'true' : 'false');

    card.addEventListener('click', function () {
      open(card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(card);
      }
    });
  });
})();


/* Experience timeline scroll progress */
(function () {
  var timeline = document.querySelector('.timeline');
  if (!timeline) return;
  var fill = timeline.querySelector('.timeline__progress');
  var cards = timeline.querySelectorAll('.exp-card');
  var ticking = false;

  function update() {
    ticking = false;
    var rect = timeline.getBoundingClientRect();
    var trigger = window.innerHeight * 0.5;
    var pct = (trigger - rect.top) / rect.height;
    pct = Math.max(0, Math.min(1, pct));
    if (fill) fill.style.height = (pct * 100) + '%';

    cards.forEach(function (card) {
      var dotY = card.getBoundingClientRect().top + 38;
      card.classList.toggle('is-active', dotY <= trigger);
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();