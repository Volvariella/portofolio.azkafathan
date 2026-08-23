const projects = [
  {
    title: 'Daily Frame',
    category: 'photography',
    year: '2026',
    summary: 'Editorial portraits for a culture magazine rollout.',
    description:
      'A portrait series exploring tenderness, rhythm, and the textures of everyday cities. The project blends portrait work, location scouting, and subtle post-production to create a cinematic, confident editorial mood.',
    tools: ['Canon R5', 'Adobe Lightroom', 'Studio Lighting'],
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Northlight Motion',
    category: 'motion-picture',
    year: '2025',
    summary: 'A short-form campaign film for a hospitality brand.',
    description:
      'This directional film paired atmospheric sound design with layered motion graphics to build a story around movement, texture, and destination identity. The result is a polished visual narrative designed for digital storytelling.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Identity Atlas',
    category: 'graphic-design',
    year: '2024',
    summary: 'Brand identity system for a boutique consultancy.',
    description:
      'A strategic visual identity built around clarity, confidence, and a restrained palette. The work includes brand guidelines, bespoke typography direction, and a flexible toolkit across print and digital channels.',
    tools: ['Figma', 'Illustrator', 'Brand Strategy'],
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Quiet Terrain',
    category: 'photography',
    year: '2025',
    summary: 'Landscapes with a documentary lens and tactile color stories.',
    description:
      'A visual study of coastlines, wind, and stillness that focuses on calm composition and subtle tonal shifts. The collection balances documentary realism with an expressive art direction.',
    tools: ['Sony A7 IV', 'Capture One', 'Photoshop'],
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Signal House',
    category: 'motion-picture',
    year: '2023',
    summary: 'Launch film and social cutdowns for a product studio.',
    description:
      'A launch campaign focused on product reveal storytelling, pace, and environmental atmosphere. The film system was developed to work across teaser ads, landing pages, and short social placements.',
    tools: ['Cineform', 'After Effects', 'Sound Design'],
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Form & Motion',
    category: 'graphic-design',
    year: '2026',
    summary: 'Campaign art direction and visual system for a startup launch.',
    description:
      'A design-driven launch package built around modular composition and experimental typography. The project included a landing page direction, ad toolkit, and campaign framework for multi-channel rollout.',
    tools: ['Figma', 'Photoshop', 'After Effects'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
  }
];

const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-button');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const modalYear = document.getElementById('modalYear');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTools = document.getElementById('modalTools');
const prevProjectButton = document.getElementById('prevProject');
const nextProjectButton = document.getElementById('nextProject');
const closeModalButton = document.querySelector('.lightbox__close');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

let activeFilter = 'all';
let filteredProjects = [...projects];
let currentProjectIndex = 0;

function formatCategory(category) {
  const labels = {
    photography: 'Photography',
    'motion-picture': 'Motion Picture',
    'graphic-design': 'Graphic Design'
  };
  return labels[category] || category;
}

function getTabFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab && ['all', 'photography', 'motion-picture', 'graphic-design'].includes(tab)) {
    return tab;
  }
  return 'all';
}

function setActiveTab(filter) {
  activeFilter = filter;

  filterButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.filter === filter);
  });
}

function updateFilteredProjects() {
  filteredProjects =
    activeFilter === 'all'
      ? [...projects]
      : projects.filter((project) => project.category === activeFilter);

  if (filteredProjects.length === 0) {
    portfolioGrid.innerHTML = '<p class="empty-state">No projects match this filter yet.</p>';
    return;
  }

  portfolioGrid.innerHTML = filteredProjects
    .map(
      (project, index) => `
        <article class="project-card" tabindex="0" aria-label="Open ${project.title}" data-index="${index}" data-project="${project.title}">
          <div class="project-card__image">
            <img src="${project.image}" alt="${project.title} project preview" loading="lazy" />
          </div>
          <div class="project-card__body">
            <div class="project-card__meta">
              <span>${formatCategory(project.category)}</span>
              <span>${project.year}</span>
            </div>
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__summary">${project.summary}</p>
          </div>
        </article>
      `
    )
    .join('');

  portfolioGrid.querySelectorAll('.project-card').forEach((card) => {
    const handleOpen = () => openModal(Number(card.dataset.index));
    card.addEventListener('click', handleOpen);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOpen();
      }
    });
  });
}

function openModal(index) {
  currentProjectIndex = index;
  const project = filteredProjects[index];

  if (!project) {
    return;
  }

  modalImage.src = project.image;
  modalImage.alt = `${project.title} project detail preview`;
  modalCategory.textContent = formatCategory(project.category);
  modalYear.textContent = project.year;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTools.innerHTML = project.tools.map((tool) => `<li>${tool}</li>`).join('');

  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  modal.setAttribute('aria-hidden', 'true');
}

function updateNavigationButtons() {
  prevProjectButton.disabled = filteredProjects.length <= 1;
  nextProjectButton.textContent = filteredProjects.length > 1 ? 'Next' : 'Close';
}

function showPreviousProject() {
  if (filteredProjects.length === 0) {
    return;
  }

  currentProjectIndex = (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
  openModal(currentProjectIndex);
}

function showNextProject() {
  if (filteredProjects.length === 0) {
    return;
  }

  currentProjectIndex = (currentProjectIndex + 1) % filteredProjects.length;
  openModal(currentProjectIndex);
}

function switchTab(filter) {
  const url = new URL(window.location);
  if (filter === 'all') {
    url.searchParams.delete('tab');
  } else {
    url.searchParams.set('tab', filter);
  }
  window.history.pushState({}, '', url);
  setActiveTab(filter);
  updateFilteredProjects();
  currentProjectIndex = 0;
  updateNavigationButtons();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    switchTab(button.dataset.filter);
  });
});

window.addEventListener('popstate', () => {
  const tab = getTabFromUrl();
  setActiveTab(tab);
  updateFilteredProjects();
  currentProjectIndex = 0;
  updateNavigationButtons();
});

prevProjectButton.addEventListener('click', showPreviousProject);
nextProjectButton.addEventListener('click', () => {
  if (filteredProjects.length <= 1) {
    closeModal();
    return;
  }

  showNextProject();
});
closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-close-modal')) {
    closeModal();
  }
});
document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('is-open')) {
    return;
  }

  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'ArrowLeft') {
    showPreviousProject();
  }

  if (event.key === 'ArrowRight') {
    showNextProject();
  }
});

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  siteNav.classList.toggle('is-open', !isExpanded);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

const initialTab = getTabFromUrl();
setActiveTab(initialTab);
updateFilteredProjects();
updateNavigationButtons();
