import appData from './data.js'

const renderTrustSection = () => {
  const section = document.getElementById('trust-section');
  section.className = 'trust-section';
  section.innerHTML = `
                <div class="container">
                    <p class="trust-title">${appData.trustSection.title}</p>
                    <div class="trust-logos">
                        ${appData.trustSection.items.map(item => `
                            <div class="trust-item">
                                <i class="fas ${item.icon} trust-icon"></i>
                                <span class="trust-text">${item.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
};

export default renderTrustSection