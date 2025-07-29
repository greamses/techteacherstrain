import renderCTA from './cta.js'
import renderFeatures from './features.js'
import renderHero from './hero.js'
import renderNavigation from './navigation.js'
import renderFooter from './footer.js'
import renderProgramsCarousel from './programCarousel.js'
import renderPrograms from './programs.js'
import renderTestimonials from './testimonial.js'
import renderTrustSection from './trust.js'


const initApp = () => {
  renderNavigation();
  renderHero();
  renderProgramsCarousel();
  renderTrustSection();
  renderFeatures();
  renderPrograms();
  renderTestimonials();
  renderCTA();
  renderFooter();
};

document.addEventListener('DOMContentLoaded', initApp);