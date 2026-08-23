const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  siteNav.classList.toggle('is-open', !isExpanded);

  if (!isExpanded && isMobile()) {
    document.querySelectorAll('.nav-dropdown').forEach((d) => d.classList.remove('is-open'));
  }
});

siteNav.querySelectorAll('a:not(.dropdown-toggle):not(.dropdown-menu a)').forEach((link) => {
  link.addEventListener('click', () => {
    if (isMobile()) {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
      document.querySelectorAll('.nav-dropdown').forEach((d) => d.classList.remove('is-open'));
    }
  });
});

document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    const dropdown = toggle.parentElement;
    const isOpen = dropdown.classList.contains('is-open');

    document.querySelectorAll('.nav-dropdown').forEach((d) => d.classList.remove('is-open'));

    if (isOpen) {
      return;
    }

    event.preventDefault();
    dropdown.classList.add('is-open');
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      dropdown.classList.remove('is-open');
    });
  }
});