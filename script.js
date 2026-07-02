// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});
(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top = ry - 18 + 'px';
  requestAnimationFrame(animateRing);
})();
document.querySelectorAll('a, button, .project-card, .blog-card, .skill-row').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    ring.style.transform = 'scale(0.6)';
    ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform = 'scale(1)';
    ring.style.opacity = '0.5';
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Skill bar animation
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        const w = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => { fill.style.width = w; }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#skills').forEach(el => skillObserver.observe(el));
