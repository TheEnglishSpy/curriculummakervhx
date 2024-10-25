// Tab functionality
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const contentId = tab.getAttribute('data-tab');
      document.getElementById(contentId).classList.add('active');
    });
  });
}

// Sidebar functionality
class Sidebar {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    this.sections = document.querySelectorAll('h2');
    this.init();
  }

  init() {
    this.setupSectionIds();
    this.setupClickHandlers();
    this.setupScrollHandler();
  }

  setupSectionIds() {
    this.sections.forEach(section => {
      if (!section.id) {
        section.id = section.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
    });
  }

  setupClickHandlers() {
    this.sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActiveLink(link);
        this.scrollToSection(link.getAttribute('href').slice(1));
      });
    });
  }

  setupScrollHandler() {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      let currentSection = '';

      this.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop - 100) {
          currentSection = section.id;
        }
      });

      this.updateActiveLink(currentSection);
    });
  }

  setActiveLink(activeLink) {
    this.sidebarLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  updateActiveLink(currentSection) {
    this.sidebarLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').slice(1) === currentSection);
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  new Sidebar();
});