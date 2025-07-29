import appData from './data.js'

const renderPrograms = () => {
  const section = document.getElementById('programs');
  section.className = 'programs';
  section.innerHTML = `
                <div class="container">
                    <div class="section-header fade-in">
                        <p class="section-subtitle">${appData.programs.subtitle}</p>
                        <h2 class="section-title">${appData.programs.title}</h2>
                        <p class="section-description">${appData.programs.description}</p>
                    </div>
                    
                    <div class="programs-grid">
                        ${appData.programs.programs.map(program => `
                            <div class="program-card fade-in">
                                <div class="program-image" style="background: ${program.gradient}; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas ${program.icon}" style="font-size: 4em; color: white; opacity: 0.8;"></i>
                                </div>
                                ${program.badge ? `<div class="program-badge">${program.badge}</div>` : ''}
                                <div class="program-content">
                                    <h3 class="program-title">${program.title}</h3>
                                    <p class="program-description">${program.description}</p>
                                    <ul class="program-features">
                                        ${program.features.map(feature => `
                                            <li>${feature}</li>
                                        `).join('')}
                                    </ul>
                                    <div class="program-price">
                                        <span class="price-amount">${program.price}</span>
                                        <span class="price-period">${program.period}</span>
                                    </div>
                                    <a href="${program.link}" class="btn-full">${program.badge === 'Professional' || program.badge === 'Institutional' ? 'Enroll Now' : 'Start Free Trial'}</a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
};

export default renderPrograms