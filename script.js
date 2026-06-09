// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Generic reveal observer
function revealOnScroll(selector, delayKey = 'delay') {
  const items = document.querySelectorAll(selector);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset[delayKey] || 0) * 100;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => obs.observe(el));
}

revealOnScroll('.skill-card');
revealOnScroll('.project-card');
revealOnScroll('.exp-card');

// Skill bars — animate widths after card is visible
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      if (bar) {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 300);
      }
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

// Tech badge images — fallback on error
document.querySelectorAll('.tech-badge img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
  });
});

// Smooth nav active state on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = '#6366f1';
        active.style.background = '#eef2ff';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
