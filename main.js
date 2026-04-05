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

const dividerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      dividerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.divider-deferred').forEach(el => dividerObserver.observe(el));

(function () {
  const target = new Date('2026-06-21T12:00:00Z'); // 2pm CEST (UTC+2)
  const el = document.getElementById('countdown-text');
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.textContent = '0 days, 0 hours, 0 mins, 0 secs';
      clearInterval(intervalId);
      return;
    }
    const days = Math.floor(diff / DAY);
    const hours = Math.floor((diff % DAY) / HOUR);
    const mins = Math.floor((diff % HOUR) / MINUTE);
    const secs = Math.floor((diff % MINUTE) / SECOND);
    el.textContent = `${days} days, ${hours} hours, ${mins} mins, ${secs} secs`;
  }

  update();
  const intervalId = setInterval(update, 1000);
})();
