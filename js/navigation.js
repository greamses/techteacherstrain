import appData from './data.js'

const renderNavigation = () => {
  const nav = document.getElementById('navbar');
  nav.innerHTML = `
                <div class="nav-container">
                    <div class="nav-logo">
                        <img src="${appData.navigation.logo.src}" alt="${appData.navigation.logo.alt}">
                        <h1>${appData.navigation.logo.title}<div>Elites</div></h1>
                    </div>
                    <ul class="nav-menu">
                        ${appData.navigation.menuItems.map(item => `
                            <li><a href="${item.href}">${item.text}</a></li>
                        `).join('')}
                    </ul>
                    <a href="${appData.navigation.cta.href}" class="nav-cta">${appData.navigation.cta.text}</a>
                </div>
            `;
};

export default renderNavigation