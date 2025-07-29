import appData from './data.js'

const renderCTA = () => {
  const section = document.createElement('section');
  section.className = 'cta';
  section.id = 'cta';
  section.innerHTML = `
                <div class="container">
                    <div class="cta-content">
                        <h2>${appData.cta.title}</h2>
                        <p>${appData.cta.description}</p>
                        <div class="hero-buttons">
                            ${appData.cta.buttons.map(button => `
                                <a href="${button.href}" class="${button.className}" ${button.onClick ? `onclick="${button.onClick}"` : ''}>
                                    ${button.icon ? `<i class="fas ${button.icon}"></i>` : ''}
                                    ${button.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
  document.body.insertBefore(section, document.getElementById('footer'));
};

export default renderCTA