import appData from './data.js'

const renderHero = () => {
  const hero = document.getElementById('home');
  hero.className = 'hero';
  hero.innerHTML = `
                <div class="hero-container">
                    <div class="hero-content">
                        <h1>${appData.hero.title}</h1>
                        <p>${appData.hero.description}</p>
                        
                        <div class="hero-stats">
                            ${appData.hero.stats.map(stat => `
                                <div class="stat">
                                    <span class="stat-number">${stat.value}</span>
                                    <span class="stat-label">${stat.label}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="hero-buttons">
                            ${appData.hero.buttons.map(button => `
                                <a href="${button.href}" class="${button.className}">
                                    ${button.icon ? `<i class="fas ${button.icon}"></i>` : ''}
                                    ${button.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="hero-visual">
                        <div class="floating-cards">
                            ${appData.hero.floatingCards.map(card => `
                                <div class="floating-card">
                                    <i class="fas ${card.icon}" style="font-size: 2em; margin-bottom: 10px;"></i>
                                    <h4>${card.title}</h4>
                                    <p>${card.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
};

export default renderHero