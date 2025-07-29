import appData from './data.js'

const renderFeatures = () => {
  const section = document.getElementById('features');
  section.className = 'features';
  section.innerHTML = `
                <div class="container">
                    <div class="section-header fade-in">
                        <p class="section-subtitle">${appData.features.subtitle}</p>
                        <h2 class="section-title">${appData.features.title}</h2>
                        <p class="section-description">${appData.features.description}</p>
                    </div>
                    
                    <div class="features-grid">
                        ${appData.features.features.map(feature => `
                            <div class="feature-card fade-in">
                                <div class="feature-icon">
                                    <i class="fas ${feature.icon}"></i>
                                </div>
                                <h3 class="feature-title">${feature.title}</h3>
                                <p class="feature-text">${feature.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
};

export default renderFeatures