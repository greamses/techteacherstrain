  async function sendEmailNotification(data) {
    const emailBody = `
New Teacher Training Registration

Registration Type: ${data.registrationType === 'individual' ? 'Individual Teacher' : 'School Registration'}
Name: ${data.participantName}
${data.schoolName ? `School Name: ${data.schoolName}` : ''}
${data.participantCount ? `Number of Teachers: ${data.participantCount}` : ''}
Email: ${data.email}
Phone: ${data.phone}
Organization: ${data.organization || 'N/A'}
Teaching Experience: ${data.experience}
Subjects: ${data.subjects || 'N/A'}
Tech Level: ${data.techLevel}

Selected Courses:
${data.selectedCourses.map(course => `- ${course.title} (${course.duration}) - ₦${course.price.toLocaleString()}`).join('\n')}

Total Price: ₦${data.totalPrice.toLocaleString()}

Expectations: ${data.expectations || 'N/A'}
Additional Notes: ${data.additionalNotes || 'N/A'}

Registration submitted on: ${data.submissionDate}
  `;
    
    // EmailJS configuration - Replace with your actual service details
    const templateParams = {
      to_email: 'eemadanyel@gmail.com',
      from_name: data.participantName,
      from_email: data.email,
      subject: 'New Teacher Training Registration',
      message: emailBody,
      reply_to: data.email
    };
    
    try {
      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
      const response = await emailjs.send('service_fk7ui3s', 'template_zvcfy68', templateParams);
      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }
  
  // Initialize EmailJS (You'll need to replace with your actual keys)
  emailjs.init("w9rRZJsEvSDePwpIp"); // Replace with your EmailJS public key
  
  document.addEventListener('DOMContentLoaded', () => {
    const courses = [
    {
      id: 'video-animation',
      title: 'Video and Animation Classes',
      duration: '8 hours',
      teacherPrice: 20000,
      schoolPrice: 150000,
      description: 'Learn to create engaging educational videos and animations'
    },
    {
      id: 'ai-integration',
      title: 'AI Integration in Education',
      duration: '6 hours',
      teacherPrice: 15000,
      schoolPrice: 100000,
      description: 'Discover how to integrate AI tools into your teaching'
    },
    {
      id: 'digital-tools',
      title: 'Digital Tools Exploration',
      duration: '6 hours',
      teacherPrice: 15000,
      schoolPrice: 100000,
      description: 'Explore essential digital tools for modern teaching'
    },
    {
      id: 'course-design',
      title: 'Course Design & Digital Class Management',
      duration: '4 hours',
      teacherPrice: 10000,
      schoolPrice: 80000,
      description: 'Master course design and digital classroom management'
    },
    {
      id: 'powerpoint',
      title: 'PowerPoint Presentation Mastery',
      duration: '4 hours',
      teacherPrice: 10000,
      schoolPrice: 80000,
      description: 'Create compelling and interactive presentations'
    }];
    
    const courseGrid = document.getElementById('courseGrid');
    const totalPriceElement = document.getElementById('totalPrice');
    const selectedCoursesDiv = document.getElementById('selectedCoursesDiv');
    const selectedCoursesList = document.getElementById('selectedCoursesList');
    const registrationTypeInputs = document.querySelectorAll('input[name="registrationType"]');
    const schoolInfo = document.getElementById('schoolInfo');
    const participantCountInput = document.getElementById('participantCount');
    const paymentInfo = document.getElementById('paymentInfo');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    
    let selectedCourses = [];
    let currentRegistrationType = 'individual';
    let registrationData = null;
    
    // Format price in Naira
    function formatPrice(price) {
      return `₦${price.toLocaleString()}`;
    }
    
    // Show status message
    function showStatus(message, type) {
      statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
      setTimeout(() => {
        statusMessage.innerHTML = '';
      }, 5000);
    }
    
    // Create course cards
    function createCourseCards() {
      courseGrid.innerHTML = courses.map(course => `
      <div class="course-card" data-course="${course.id}">
        <input type="checkbox" name="selectedCourses" value="${course.id}">
        <div class="course-title">${course.title}</div>
        <div class="course-duration">Duration: ${course.duration}</div>
        <div class="course-price" data-teacher-price="${course.teacherPrice}" data-school-price="${course.schoolPrice}">
          ${formatPrice(course.teacherPrice)}
        </div>
      </div>
    `).join('');
      
      // Add click handlers to course cards
      document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
          const checkbox = card.querySelector('input[type="checkbox"]');
          checkbox.checked = !checkbox.checked;
          
          if (checkbox.checked) {
            card.classList.add('selected');
            const course = courses.find(c => c.id === card.dataset.course);
            selectedCourses.push(course);
          } else {
            card.classList.remove('selected');
            selectedCourses = selectedCourses.filter(c => c.id !== card.dataset.course);
          }
          
          updateSelectedCoursesList();
          updateTotalPrice();
          updatePaymentInfo();
        });
      });
    }
    
    // Update course pricing display
    function updateCoursePricing() {
      document.querySelectorAll('.course-card').forEach(card => {
        const priceElement = card.querySelector('.course-price');
        const teacherPrice = parseInt(priceElement.dataset.teacherPrice);
        const schoolPrice = parseInt(priceElement.dataset.schoolPrice);
        
        if (currentRegistrationType === 'individual') {
          priceElement.textContent = formatPrice(teacherPrice);
        } else {
          priceElement.textContent = formatPrice(schoolPrice);
        }
      });
      
      updateTotalPrice();
    }
    
    // Update payment info visibility
    function updatePaymentInfo() {
      if (selectedCourses.length > 0) {
        paymentInfo.style.display = 'block';
      } else {
        paymentInfo.style.display = 'none';
      }
    }
    
    // Update selected courses list
    function updateSelectedCoursesList() {
      if (selectedCourses.length === 0) {
        selectedCoursesDiv.style.display = 'none';
        return;
      }
      
      selectedCoursesDiv.style.display = 'block';
      selectedCoursesList.innerHTML = selectedCourses.map(course => {
        const price = currentRegistrationType === 'individual' ? course.teacherPrice : course.schoolPrice;
        return `<li>• ${course.title} - ${formatPrice(price)} (${course.duration})</li>`;
      }).join('');
    }
    
    // Update total price display
    function updateTotalPrice() {
      if (selectedCourses.length === 0) {
        totalPriceElement.textContent = 'Select courses to see pricing';
        return;
      }
      
      let totalPrice = selectedCourses.reduce((sum, course) => {
        return sum + (currentRegistrationType === 'individual' ? course.teacherPrice : course.schoolPrice);
      }, 0);
      
      if (currentRegistrationType === 'school') {
        const participantCount = parseInt(participantCountInput.value) || 1;
        totalPriceElement.textContent = `Total Price: ${formatPrice(totalPrice)} (for ${participantCount} teacher${participantCount > 1 ? 's - all inclusive' : ''}), in your school. Please Note: Max is 10 teachers`;
      } else {
        totalPriceElement.textContent = `Total Price: ${formatPrice(totalPrice)} (${selectedCourses.length} course${selectedCourses.length > 1 ? 's' : ''})`;
      }
    }
    
   function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Set colors
  const primaryColor = '#200038';
  const secondaryColor = '#3f0071';
  const accentColor = '#f63fb5';
  const textColor = '#333333';
  const lightGray = '#f5f5f5';
  
// Add header with logo and title
doc.setDrawColor(32, 0, 56); 
doc.setFillColor(255, 255, 255);
doc.rect(0, 0, 210, 40, 'F'); 
doc.rect(0, 40, 210, 1, 'F');
doc.addImage('logo.png', 'PNG', 20, 10, 30, 30);

  // Title
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('Teacher Training Registration', 105, 25, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 190, 15, { align: 'right' });
  
  // Main content container
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(15, 50, 180, 220, 3, 3, 'FD');
  
  // Registration details section
  let yPosition = 65;
  
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('Registration Details', 25, yPosition);
  
  // Add decorative line
  doc.setDrawColor(primaryColor);
  doc.line(25, yPosition + 3, 50, yPosition + 3);
  
  yPosition += 15;
  
  // Personal Information
  doc.setFontSize(11);
  doc.setTextColor(textColor);
  doc.setFont(undefined, 'normal');
  
  const personalInfo = [
    { label: 'Type', value: data.registrationType === 'individual' ? 'Individual Teacher' : 'School Registration' },
    { label: 'Name', value: data.participantName },
    ...(data.schoolName ? [{ label: 'School Name', value: data.schoolName }] : []),
    ...(data.participantCount ? [{ label: 'No of Teachers', value: data.participantCount }] : []),
    ...(data.organization ? [{ label: 'Organization', value: data.organization }] : []),
  ];
  
  // Create two columns viapersonal info
  let col1X = 25;
  let col2X = 110;
  let currentCol = col1X;
  
  personalInfo.forEach((info, index) => {
    if (index > 0 && index % 5 === 0) {
      currentCol = currentCol === col1X ? col2X : col1X;
      if (currentCol === col1X) yPosition += 35; // Add space when wrapping to new row
    }
    
    doc.setFont(undefined, 'bold');
    doc.text(`${info.label}:`, currentCol, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(info.value, currentCol + 30, yPosition);
    
    if (currentCol === col1X) {
      yPosition += 7;
    }
  });
  
  // Courses section
  yPosition += 15;
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('Selected Courses', 25, yPosition);
  doc.line(25, yPosition + 3, 50, yPosition + 3);
  
  yPosition += 10;
  
  // Course table header
  doc.setFillColor(lightGray);
  doc.rect(25, yPosition, 160, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('Course Title', 27, yPosition + 6);
  doc.text('Duration', 120, yPosition + 6);
  doc.text('Price', 170, yPosition + 6, { align: 'right' });
  
  yPosition += 10;
  
  // Course items
  data.selectedCourses.forEach((course, index) => {
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.setFont(undefined, 'normal');
    
    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245);
      doc.rect(25, yPosition - 2, 160, 8, 'F');
    }
    
    doc.text(course.title, 27, yPosition + 4);
    doc.text(course.duration, 120, yPosition + 4);
    doc.text(`₦${course.price.toLocaleString()}`, 170, yPosition + 4, { align: 'right' });
    
    yPosition += 8;
  });
  
  // Total amount
  yPosition += 10;
  doc.setFontSize(12);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('Total Amount:', 120, yPosition);
  doc.text(`₦${data.totalPrice.toLocaleString()}`, 170, yPosition, { align: 'right' });
  
  // Payment information
  yPosition += 15;
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('Payment Information', 25, yPosition);
  doc.line(25, yPosition + 3, 60, yPosition + 3);
  
  yPosition += 10;
  
  doc.setFontSize(11);
  doc.setTextColor(textColor);
  
  const paymentInfo = [
    { label: 'Account Name', value: 'Emmanuel Daniel Chima' },
    { label: 'Account Number', value: '0772808080' },
    { label: 'Bank', value: 'Access Bank Plc' },
    { label: 'Reference', value: `TT-${data.participantName.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` }
  ];
  
  paymentInfo.forEach(info => {
    doc.setFont(undefined, 'bold');
    doc.text(`${info.label}:`, 25, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(info.value, 60, yPosition);
    yPosition += 7;
  });
  
  // Footer
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for registering with SuperBrain Educonsults', 105, 285, { align: 'center' });
  doc.text('For inquiries: eemadanyel@gmail.com | +234 81 1053 5447', 105, 290, { align: 'center' });
  
  // Save the PDF
  doc.save(`MT_Training_${data.participantName.replace(/\s+/g, '_')}.pdf`);
}
    // Handle registration type change
    registrationTypeInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        currentRegistrationType = e.target.value;
        
        if (currentRegistrationType === 'school') {
          schoolInfo.classList.add('show');
          document.getElementById('schoolName').required = true;
          document.getElementById('participantCount').required = true;
        } else {
          schoolInfo.classList.remove('show');
          document.getElementById('schoolName').required = false;
          document.getElementById('participantCount').required = false;
        }
        
        updateCoursePricing();
        updateSelectedCoursesList();
      });
    });
    
    // Handle participant count change
    participantCountInput.addEventListener('input', updateTotalPrice);
    
    // Handle PDF download
    downloadPdfBtn.addEventListener('click', () => {
      if (registrationData) {
        generatePDF(registrationData);
      }
    });
    
    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (selectedCourses.length === 0) {
        showStatus('Please select at least one course.', 'error');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Submitting...';
      
      const formData = new FormData(e.target);
      const data = {};
      
      formData.forEach((value, key) => {
        if (key !== 'selectedCourses') {
          data[key] = value;
        }
      });
      
      // Add selected courses and pricing info
      data.selectedCourses = selectedCourses.map(course => ({
        id: course.id,
        title: course.title,
        duration: course.duration,
        price: currentRegistrationType === 'individual' ? course.teacherPrice : course.schoolPrice
      }));
      
      let totalPrice = selectedCourses.reduce((sum, course) => {
        return sum + (currentRegistrationType === 'individual' ? course.teacherPrice : course.schoolPrice);
      }, 0);
      
      data.totalPrice = totalPrice;
      data.registrationType = currentRegistrationType;
      data.submissionDate = new Date().toLocaleString();
      
      registrationData = data;
      
      try {
        await sendEmailNotification(data);
        showStatus('Registration submitted successfully! Check your email for confirmation and payment details.', 'success');
        downloadPdfBtn.style.display = 'block';
      } catch (error) {
        console.error('Email sending failed:', error);
        showStatus('Registration saved! Please note down the payment details above. Download your registration form below.', 'success');
        downloadPdfBtn.style.display = 'block';
      }
      
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Register';
    });
    
    // Initialize
    createCourseCards();
  });