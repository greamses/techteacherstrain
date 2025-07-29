import appData from './data.js'

const renderFooter = () => {
  const footer = document.getElementById('footer');
  footer.className = 'footer';
  footer.id = 'footer';
  footer.innerHTML = `
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>${appData.footer.about.title}</h3>
                            <p>${appData.footer.about.description}</p>
                            <div class="social-links">
                                ${appData.footer.about.social.map(social => `
                                    <a href="${social.href}"><i class="fab ${social.icon}"></i></a>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Programs</h3>
                            ${appData.footer.links.programs.map(link => `
                                <a href="${link.href}">${link.text}</a>
                            `).join('')}
                        </div>
                        
                        <div class="footer-section">
                            <h3>Company</h3>
                            ${appData.footer.links.company.map(link => `
                                <a href="${link.href}">${link.text}</a>
                            `).join('')}
                        </div>
                        
                        <div class="footer-section">
                            <h3>Support</h3>
                            ${appData.footer.links.support.map(link => `
                                <a href="${link.href}">${link.text}</a>
                            `).join('')}
                        </div>
                        
                        <div class="footer-section">
                            <h3>Contact Info</h3>
                            <p><i class="fas fa-phone"></i> ${appData.footer.contact.phone}</p>
                            <p><i class="fas fa-envelope"></i> ${appData.footer.contact.email}</p>
                            <p><i class="fas fa-clock"></i> ${appData.footer.contact.hours.replace('\n', '<br>')}</p>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>${appData.footer.copyright}</p>
                    </div>
                </div>
            `;
};

export default renderFooter