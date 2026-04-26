/* main.js — shared across all pages */

// ── THEME TOGGLE ──────────────────────────────────────────────
(function(){
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
})();

function updateThemeIcon(theme){
  const btn = document.querySelector('.theme-toggle');
  if(btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

// ── HAMBURGER MENU ────────────────────────────────────────────
const ham = document.querySelector('.nav-ham');
const mobileMenu = document.querySelector('.mobile-menu');
if(ham && mobileMenu){
  ham.addEventListener('click', () => {
    const isOpen = ham.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── ACTIVE NAV LINK ───────────────────────────────────────────
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if(href === page || (page === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });
})();

// ── REVEAL ON SCROLL ──────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── SKILL BARS ────────────────────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.3 });
document.querySelectorAll('.sbar').forEach(el => barObs.observe(el));

// ── MODAL HELPERS ─────────────────────────────────────────────
function openModal(id){
  const m = document.getElementById(id);
  if(m){ m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id){
  const m = document.getElementById(id);
  if(m){ m.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if(e.target.classList.contains('modal-bg')){
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal-bg.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
