import appData from './data.js'

const renderProgramsCarousel = () => {
    const section = document.createElement('section');
    section.className = 'programs-carousel';
    section.id = 'programs-carousel';
    section.innerHTML = `
        <div class="container">
            <div class="section-header fade-in">
                <p class="section-subtitle">${appData.programsCarousel.subtitle}</p>
                <h2 class="section-title">${appData.programsCarousel.title}</h2>
                <p class="section-description">${appData.programsCarousel.description}</p>
            </div>
            
            <div class="carousel-container">
                <div class="programs-slider">
                    ${appData.programsCarousel.programs.map(program => `
                        <div class="program-slide">
                            <i class="fas ${program.icon}"></i>
                            <h3>${program.title}</h3>
                            <p>${program.description}</p>
                        </div>
                    `).join('')}
                </div>
                
                <button class="carousel-prev" aria-label="Previous program">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-next" aria-label="Next program">
                    <i class="fas fa-chevron-right"></i>
                </button>
                
                <div class="carousel-dots">
                    ${appData.programsCarousel.programs.map((_, index) => `
                        <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Insert before trust-section
    const trustSection = document.getElementById('trust-section');
    if (trustSection) {
        document.body.insertBefore(section, trustSection);
    } else {
        document.body.appendChild(section);
    }
};

export default renderProgramsCarousel