window.addEventListener('load', function () {
  document.body.classList.add('loaded');
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

setTimeout(() => {
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
}, 2000);
