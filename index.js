import renderNavigation from './js/navigation.js';
import {getImagePath} from './js/data.js'

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

function startFreeTrial() {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
            `;
  
  modalContent.innerHTML = `
                <button onclick="this.closest('.modal-overlay').remove()" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                ">&times;</button>
                <h3 style="color: var(--primary-color); margin-bottom: 20px; font-size: 1.8em;">Start Your Free Trial</h3>
                <p style="margin-bottom: 30px; color: var(--text-light);">Join over 1,000 families and see results in just 30 days!</p>
                <form onsubmit="submitTrialForm(event)">
                    <input type="text" placeholder="Parent's Name" required style="
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 15px;
                        border: 2px solid #e2e8f0;
                        border-radius: 8px;
                        font-size: 16px;
                    ">
                    <input type="email" placeholder="Email Address" required style="
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 15px;
                        border: 2px solid #e2e8f0;
                        border-radius: 8px;
                        font-size: 16px;
                    ">
                    <input type="tel" placeholder="Phone Number" required style="
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 15px;
                        border: 2px solid #e2e8f0;
                        border-radius: 8px;
                        font-size: 16px;
                    ">
                    <select required style="
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 20px;
                        border: 2px solid #e2e8f0;
                        border-radius: 8px;
                        font-size: 16px;
                    ">
                        <option value="">Select Student's Grade</option>
                        <option value="K-2">Kindergarten - 2nd Grade</option>
                        <option value="3-5">3rd - 5th Grade</option>
                        <option value="6-8">6th - 8th Grade</option>
                        <option value="9-12">9th - 12th Grade</option>
                    </select>
                    <button type="submit" style="
                        width: 100%;
                        padding: 15px;
                        background: linear-gradient(135deg, #200038 0%, #3f0071 50%, #6c5ce7 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Start Free Trial</button>
                </form>
            `;
  
  modal.className = 'modal-overlay';
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function submitTrialForm(event) {
  event.preventDefault();
  
  // Simulate form submission
  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.innerHTML = 'Processing...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    event.target.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 3em; color: #10b981; margin-bottom: 20px;"></i>
                        <h3 style="color: var(--primary-color); margin-bottom: 15px;">Welcome to Superbrain Elites!</h3>
                        <p style="color: var(--text-light); margin-bottom: 20px;">We'll contact you within 24 hours to schedule your first session.</p>
                        <button onclick="this.closest('.modal-overlay').remove()" style="
                            padding: 10px 20px;
                            background: var(--accent-color);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                        ">Close</button>
                    </div>
                `;
  }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`;
  });
});

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = counter.textContent;
    const isPercentage = target.includes('%');
    const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
    
    let current = 0;
    const increment = numericTarget / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        current = numericTarget;
        clearInterval(timer);
      }
      
      if (isPercentage) {
        counter.textContent = Math.floor(current) + '%';
      } else if (target.includes('+')) {
        counter.textContent = Math.floor(current) + '+';
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 50);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      animateCounters();
      entry.target.dataset.animated = 'true';
    }
  });
});

function initializeTestimonialCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  if (!carousel || testimonialCards.length === 0) return;
  
  let currentIndex = 0;
  const cardWidth = testimonialCards[0].offsetWidth + 30; // Width + margin
  const totalCards = testimonialCards.length;
  
  function autoScroll() {
    currentIndex = (currentIndex + 1) % totalCards;
    scrollToCard(currentIndex);
  }
  
  function scrollToCard(index) {
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  }
  
  carousel.addEventListener('scroll', () => {
    const scrollPosition = carousel.scrollLeft;
    const maxScroll = cardWidth * (totalCards - 1);
    
    // If at the end, reset to beginning without animation
    if (scrollPosition >= maxScroll) {
      setTimeout(() => {
        carousel.scrollTo({
          left: 0,
          behavior: 'instant'
        });
        currentIndex = 0;
      }, 1000);
    }
  });
  
  let autoScrollInterval = setInterval(autoScroll, 5000);
  
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(autoScroll, 5000);
  });
  
  window.addEventListener('resize', () => {
    // Recalculate card width on resize
    const newCardWidth = testimonialCards[0].offsetWidth + 30;
    if (newCardWidth !== cardWidth) {
      scrollToCard(currentIndex);
    }
  });
}

function initializeProgramsCarousel() {
  const slider = document.querySelector('.programs-slider');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (!slider) return;
  
  const programs = [
  {
    title: "Junior Coders and Robotics World Bootcamp",
    description: "Introduction to programming for ages 8-12 with Scratch and Python basics. Hands-on robotics projects with LEGO Mindstorms and Arduino.",
    image: "coding.jpg",
    color: "#4facfe55"
  },
  {
    title: "Creative Math Art",
    description: "Combine math and art through geometric patterns and fractals.",
    image: "creative.jpg",
    color: "#ff9a9e55"
  },
  {
    title: "Financial Literacy",
    description: "Practical money management skills for teens and young adults.",
    image: "finance.jpg",
    color: "#5f2c8255"
  }];
  
  let currentIndex = 0;
  
  function createSlides() {
    slider.innerHTML = '';
    programs.forEach((program, index) => {
      const slide = document.createElement('div');
      slide.className = 'program-slide';
      slide.innerHTML = `
                <div class="program-slide-image" style="background-image: url('${getImagePath()}${program.image}');">
                    <div class="image-overlay" style="background: linear-gradient(135deg, ${program.color}80 0%, ${darkenColor(program.color, 20)}80 100%);"></div>
                </div>
                <div class="program-slide-content">
                    <h3>${program.title}</h3>
                    <p>${program.description}</p>
                    <a href="#programs" class="btn-secondary">Learn More</a>
                </div>
            `;
      slider.appendChild(slide);
    });
  }
  
  function createDots() {
    dotsContainer.innerHTML = '';
    programs.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
  }
  
  function darkenColor(color, percent) {
    // This is a simplified color darkening function
    return color.replace(/\d+/g, num => Math.max(0, parseInt(num) - percent));
  }
  
  function goToSlide(index) {
    currentIndex = index;
    const slideWidth = document.querySelector('.program-slide').offsetWidth + 30;
    slider.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth'
    });
    updateDots();
  }
  
  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % programs.length;
    goToSlide(currentIndex);
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + programs.length) % programs.length;
    goToSlide(currentIndex);
  }
  
  createSlides();
  createDots();
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Auto-advance
  let autoSlideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  });
  
  window.addEventListener('resize', () => {
    goToSlide(currentIndex);
  });
  console.log(slider)
}

const setupMobileMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
    });
  }

};

document.addEventListener('DOMContentLoaded', function() {
  initializeTestimonialCarousel()
  initializeProgramsCarousel()
  setupMobileMenu();
});