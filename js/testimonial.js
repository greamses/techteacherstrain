import appData from './data.js'

const renderTestimonials = () => {
  const section = document.getElementById('testimonials');
  section.className = 'testimonials';
  section.innerHTML = `
                <div class="container">
                    <div class="section-header fade-in">
                        <p class="section-subtitle">${appData.testimonials.subtitle}</p>
                        <h2 class="section-title">${appData.testimonials.title}</h2>
                        <p class="section-description">${appData.testimonials.description}</p>
                    </div>
                    
                    <div class="testimonials-carousel">
                        ${appData.testimonials.testimonials.map(testimonial => `
                            <div class="testimonial-card">
                                <i class="fas fa-quote-right quote-icon"></i>
                                <p class="testimonial-quote">"${testimonial.quote}"</p>
                                <div class="testimonial-author">
                                    <div class="author-avatar">${testimonial.initials}</div>
                                    <div class="author-info">
                                        <h4>${testimonial.author}</h4>
                                        <p>${testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
};

export default renderTestimonials