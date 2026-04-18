/* ─────────────────────────────────────────────
   EVERLASTING FOCUS · script.js
───────────────────────────────────────────── */

/* ── NAV scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Burger menu ── */
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Hero slideshow ── */
const slides = document.querySelectorAll('.hero-slide');
let current = 0;
function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}
setInterval(nextSlide, 5500);

/* ── Lightbox ── */
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lb-img');
const lbCaption  = document.getElementById('lb-caption');
const lbClose    = document.querySelector('.lb-close');
const lbPrev     = document.querySelector('.lb-prev');
const lbNext     = document.querySelector('.lb-next');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
let lbIndex = 0;

function openLightbox(index) {
  lbIndex = index;
  const item = galleryItems[index];
  lbImg.src = item.dataset.src;
  lbImg.alt = item.dataset.caption;
  lbCaption.textContent = item.dataset.caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function showLb(index) {
  lbIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[lbIndex];
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = item.dataset.src;
    lbImg.alt = item.dataset.caption;
    lbCaption.textContent = item.dataset.caption;
    lbImg.style.opacity = '1';
  }, 180);
}

lbImg.style.transition = 'opacity 0.18s ease';

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => showLb(lbIndex - 1));
lbNext.addEventListener('click', () => showLb(lbIndex + 1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showLb(lbIndex - 1);
  if (e.key === 'ArrowRight')  showLb(lbIndex + 1);
});

/* ── Testimonials ── */
const testimonials = document.querySelectorAll('.testimonial');
const dots         = document.querySelectorAll('.dot');
let tIndex = 0;
let tTimer;

function showTestimonial(index) {
  testimonials[tIndex].classList.remove('active');
  dots[tIndex].classList.remove('active');
  tIndex = (index + testimonials.length) % testimonials.length;
  testimonials[tIndex].classList.add('active');
  dots[tIndex].classList.add('active');
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(tTimer);
    showTestimonial(i);
    startTTimer();
  });
});

function startTTimer() {
  tTimer = setInterval(() => showTestimonial(tIndex + 1), 6000);
}
startTTimer();

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Add reveal classes dynamically ── */
function addReveal(selector, delay = 0) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    if (delay) el.style.transitionDelay = `${i * delay}s`;
  });
}
addReveal('#about .about-images');
addReveal('#about .about-text');
addReveal('#gallery .container');
addReveal('.service-card', 0.1);
addReveal('#testimonials .container');
addReveal('#contact .contact-info');
addReveal('#contact .contact-form-wrap');
// Re-observe after adding classes
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Contact form ── */
const form     = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', e => {
  e.preventDefault();
  feedback.className = 'form-feedback';
  feedback.textContent = '';

  const name  = form.querySelector('#f-name').value.trim();
  const email = form.querySelector('#f-email').value.trim();
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    feedback.textContent = 'Please enter your name.';
    feedback.classList.add('error');
    return;
  }
  if (!email || !emailRx.test(email)) {
    feedback.textContent = 'Please enter a valid email address.';
    feedback.classList.add('error');
    return;
  }

  /* Simulate send */
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    feedback.textContent = '✓ Thank you! We'll be in touch soon to start planning your story.';
    feedback.classList.add('success');
    form.reset();
    btn.textContent = 'Send Enquiry';
    btn.disabled = false;
  }, 1400);
});
