// Get current exchange rate (you can update this or make it dynamic)
const EXCHANGE_RATE = 1550; // 1 USD = 1550 NGN (approximate)

function convertToUSD(nairaAmount) {
  return (nairaAmount / EXCHANGE_RATE).toFixed(2);
}

async function sendEmailNotification(data) {
  const selectedTimeSlots = data.timeSlots || [];
  const emailBody = `
New Tutoring Services Registration

CHILD INFORMATION:
Child's Name: ${data.childName}
Age: ${data.childAge} years
Current Grade: ${data.currentGrade}
Math Level: ${data.mathLevel}

PARENT/GUARDIAN INFORMATION:
Parent/Guardian: ${data.parentName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}

TUTORING OPTION:
${data.selectedPackage.id === 'group-classes' ? 'Group Classes Subscription (₦25,000/month)' : 
  `Package: ${data.selectedPackage ? data.selectedPackage.title : 'None selected'}
Duration: ${data.selectedPackage ? data.selectedPackage.duration : 'N/A'}`}
Sessions per Week: ${data.sessionsPerWeek}
Preferred Time Slots: ${selectedTimeSlots.join(', ')}

PRICING:
${data.selectedPackage.id === 'group-classes' ? 
  `Monthly Subscription: ₦25,000 ($${convertToUSD(25000)})` : 
  `Package Price: ₦${data.packagePrice ? data.packagePrice.toLocaleString() : '0'} ($${data.packagePrice ? convertToUSD(data.packagePrice) : '0'})
Weekly Total: ₦${data.totalPrice ? data.totalPrice.toLocaleString() : '0'} ($${data.totalPrice ? convertToUSD(data.totalPrice) : '0'})`}

ACADEMIC INFORMATION:
Strengths: ${data.strengths || 'Not specified'}
Areas to Improve: ${data.challenges || 'Not specified'}
Learning Goals: ${data.goals || 'Not specified'}
Additional Info: ${data.additionalInfo || 'None'}

Registration submitted on: ${data.submissionDate}
    `;
  
  const templateParams = {
    to_email: 'eemadanyel@gmail.com',
    from_name: data.parentName,
    from_email: data.email,
    subject: 'New Tutoring Services Registration',
    message: emailBody,
    reply_to: data.email
  };
  
  try {
    const response = await emailjs.send('service_fk7ui3s', 'template_zvcfy68', templateParams);
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

// Initialize EmailJS
emailjs.init("w9rRZJsEvSDePwpIp");

document.addEventListener('DOMContentLoaded', () => {
  const packages = [
    {
      id: 'math-only',
      title: 'Math Only',
      duration: '1 hour per session',
      price: 8000,
      description: 'Focused mathematics tutoring covering curriculum topics and problem-solving skills'
    },
    {
      id: 'math-coding',
      title: 'Math & Coding',
      duration: '1 hour 30 minutes per session',
      price: 12000,
      description: 'Mathematics plus introduction to coding and programming concepts'
    },
    {
      id: 'math-mental',
      title: 'Math & Mental Maths Plus',
      duration: '1 hour 30 minutes per session',
      price: 15000,
      description: 'Mathematics, mental math techniques, cubing, and chess analysis for cognitive development'
    },
    {
      id: 'group-classes',
      title: 'Group Classes',
      duration: '2 sessions per week',
      price: 25000,
      description: 'Join our small group classes for collaborative learning at a more affordable rate',
      isGroupClass: true
    }
  ];
  
  const courseGrid = document.getElementById('courseGrid');
  const totalPriceElement = document.getElementById('totalPrice');
  const selectedCoursesDiv = document.getElementById('selectedCoursesDiv');
  const selectedCoursesList = document.getElementById('selectedCoursesList');
  const paymentInfo = document.getElementById('paymentInfo');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const submitBtn = document.getElementById('submitBtn');
  const statusMessage = document.getElementById('statusMessage');
  const sessionsPerWeekSelect = document.getElementById('sessionsPerWeek');
  
  let selectedPackage = null;
  let registrationData = null;
  
  // Format price in Naira and USD
  function formatPrice(price) {
    const usdPrice = convertToUSD(price);
    return `₦${price.toLocaleString()} ($${usdPrice})`;
  }
  
  // Show status message
  function showStatus(message, type) {
    statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
    setTimeout(() => {
      statusMessage.innerHTML = '';
    }, 5000);
  }
  
  // Create package cards
  function createPackageCards() {
    courseGrid.innerHTML = packages.map(pkg => `
        <div class="course-card" data-package="${pkg.id}">
          <input type="radio" name="selectedPackage" value="${pkg.id}">
          <div class="course-title">${pkg.title}</div>
          <div class="course-duration">Duration: ${pkg.duration}</div>
          <div class="course-price">${formatPrice(pkg.price)}${pkg.isGroupClass ? '/month' : '/session'}</div>
          <div class="course-description">${pkg.description}</div>
        </div>
      `).join('');
    
    // Add click handlers to package cards
    document.querySelectorAll('.course-card').forEach(card => {
      card.addEventListener('click', () => {
        // Remove selection from all cards
        document.querySelectorAll('.course-card').forEach(c => c.classList.remove('selected'));
        
        // Select this card
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Update selected package
        selectedPackage = packages.find(p => p.id === card.dataset.package);
        
        updateSelectedPackageDisplay();
        updateTotalPrice();
        updatePaymentInfo();
      });
    });
  }
  
  // Update selected package display
  function updateSelectedPackageDisplay() {
    if (!selectedPackage) {
      selectedCoursesDiv.style.display = 'none';
      return;
    }
    
    selectedCoursesDiv.style.display = 'block';
    
    if (selectedPackage.isGroupClass) {
      selectedCoursesList.innerHTML = `
        <li>• ${selectedPackage.title} - ${formatPrice(selectedPackage.price)} per month</li>
        <li>• ${selectedPackage.description}</li>
      `;
    } else {
      selectedCoursesList.innerHTML = `
        <li>• ${selectedPackage.title} - ${formatPrice(selectedPackage.price)} per session (${selectedPackage.duration})</li>
      `;
    }
  }
  
  // Update total price display
  function updateTotalPrice() {
    if (!selectedPackage) {
      totalPriceElement.textContent = 'Select an option to see pricing';
      return;
    }
    
    if (selectedPackage.isGroupClass) {
      totalPriceElement.innerHTML = `
        <strong>Monthly Subscription: ${formatPrice(selectedPackage.price)}</strong><br>
        <small>${selectedPackage.description}</small>
      `;
    } else {
      const sessionsPerWeek = parseInt(sessionsPerWeekSelect.value) || 1;
      const weeklyTotal = selectedPackage.price * sessionsPerWeek;
      
      totalPriceElement.innerHTML = `
        <strong>Weekly Total: ${formatPrice(weeklyTotal)}</strong><br>
        <small>Per session: ${formatPrice(selectedPackage.price)} × ${sessionsPerWeek} session${sessionsPerWeek > 1 ? 's' : ''} per week</small>
      `;
    }
  }
  
  // Update payment info visibility
  function updatePaymentInfo() {
    if (selectedPackage) {
      paymentInfo.style.display = 'block';
    } else {
      paymentInfo.style.display = 'none';
    }
  }
  
  // Handle sessions per week change
  sessionsPerWeekSelect.addEventListener('change', updateTotalPrice);
  
  // Enhanced PDF generation function with logo and better styling
  function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Define colors
    const primaryColor = [32, 0, 56]; // #200038
    const secondaryColor = [63, 0, 113]; // #3f0071
    const grayColor = [102, 102, 102]; // #666666
    const lightGrayColor = [240, 240, 240]; // #f0f0f0
    
    // Helper function to add logo
    function addLogo() {
      const logoImg = document.querySelector('.logo');
      if (logoImg && logoImg.src) {
        try {
          // Create a canvas to convert the logo to base64
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const logoData = canvas.toDataURL('image/png');
            doc.addImage(logoData, 'PNG', 20, 15, 25, 25);
          };
          
          img.src = logoImg.src;
        } catch (error) {
          console.log('Could not add logo to PDF:', error);
        }
      }
    }
    
    // Helper function to add colored rectangle
    function addColoredRect(x, y, width, height, color) {
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(x, y, width, height, 'F');
    }
    
    // Helper function to add section header
    function addSectionHeader(text, yPos) {
      addColoredRect(20, yPos - 5, 170, 12, primaryColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(text, 25, yPos + 2);
      doc.setTextColor(0, 0, 0);
      return yPos + 15;
    }
    
    // Helper function to add field
    function addField(label, value, yPos, isMultiline = false) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text(label + ':', 25, yPos);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      if (isMultiline && value && value.length > 50) {
        const lines = doc.splitTextToSize(value, 120);
        doc.text(lines, 25, yPos + 7);
        return yPos + (lines.length * 5) + 10;
      } else {
        doc.text(value || 'Not specified', 25, yPos + 7);
        return yPos + 15;
      }
    }
    
    // Add logo
    addLogo();
    
    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Tutoring Services Registration', 55, 25);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('Superbrain Elites', 55, 32);
    
    // Registration date and ID
    doc.setFontSize(10);
    doc.text(`Registration Date: ${new Date().toLocaleDateString()}`, 55, 38);
    doc.text(`Registration ID: REG-${Date.now().toString().slice(-6)}`, 140, 38);
    
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(lightGrayColor[0], lightGrayColor[1], lightGrayColor[2]);
    doc.line(20, 45, 190, 45);
    
    let yPosition = 55;
    
    // Child Information Section
    yPosition = addSectionHeader('Child Information', yPosition);
    yPosition = addField('Full Name', data.childName, yPosition);
    yPosition = addField('Age', data.childAge + ' years', yPosition);
    yPosition = addField('Current Grade/Class', data.currentGrade, yPosition);
    yPosition = addField('Math Level', data.mathLevel, yPosition);
    yPosition += 5;
    
    // Parent/Guardian Information Section
    yPosition = addSectionHeader('Parent/Guardian Information', yPosition);
    yPosition = addField('Name', data.parentName, yPosition);
    yPosition = addField('Email', data.email, yPosition);
    yPosition = addField('Phone', data.phone, yPosition);
    yPosition = addField('Address', data.address, yPosition, true);
    yPosition += 5;
    
    // Check if we need a new page
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Package Information Section
    yPosition = addSectionHeader('Selected Option', yPosition);
    if (data.selectedPackage.isGroupClass) {
      yPosition = addField('Option', 'Group Classes Subscription', yPosition);
      yPosition = addField('Details', data.selectedPackage.description, yPosition);
      yPosition = addField('Sessions per Week', '2 sessions included', yPosition);
      
      // Highlight total price
      addColoredRect(20, yPosition - 3, 170, 10, [255, 248, 220]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`Monthly Subscription: ₦25,000 ($${convertToUSD(25000)})`, 25, yPosition + 3);
      yPosition += 15;
    } else {
      yPosition = addField('Option', data.selectedPackage.title, yPosition);
      yPosition = addField('Duration', data.selectedPackage.duration, yPosition);
      yPosition = addField('Sessions per Week', data.sessionsPerWeek, yPosition);
      yPosition = addField('Per Session Price', `₦${data.selectedPackage.price.toLocaleString()} ($${convertToUSD(data.selectedPackage.price)})`, yPosition);
      
      // Highlight total price
      addColoredRect(20, yPosition - 3, 170, 10, [255, 248, 220]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`Weekly Total: ₦${data.totalPrice.toLocaleString()} ($${convertToUSD(data.totalPrice)})`, 25, yPosition + 3);
      yPosition += 15;
    }
    yPosition += 5;
    
    // Time Slots Section
    yPosition = addSectionHeader('Preferred Time Slots', yPosition);
    if (data.timeSlots && data.timeSlots.length > 0) {
      const timeSlotLabels = {
        'morning_weekday': 'Weekday Morning (8:00 AM - 12:00 PM)',
        'afternoon_weekday': 'Weekday Afternoon (12:00 PM - 4:00 PM)',
        'evening_weekday': 'Weekday Evening (4:00 PM - 8:00 PM)',
        'morning_weekend': 'Weekend Morning (8:00 AM - 12:00 PM)',
        'afternoon_weekend': 'Weekend Afternoon (12:00 PM - 4:00 PM)',
        'evening_weekend': 'Weekend Evening (4:00 PM - 8:00 PM)'
      };
      
      data.timeSlots.forEach(slot => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`• ${timeSlotLabels[slot]}`, 25, yPosition);
        yPosition += 6;
      });
    }
    yPosition += 5;
    
    // Check if we need a new page
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Academic Information Section
    yPosition = addSectionHeader('Academic Information', yPosition);
    yPosition = addField('Strengths', data.strengths, yPosition, true);
    yPosition = addField('Areas to Improve', data.challenges, yPosition, true);
    yPosition = addField('Learning Goals', data.goals, yPosition, true);
    yPosition = addField('Additional Information', data.additionalInfo, yPosition, true);
    yPosition += 5;
    
    // Payment Information Section
    yPosition = addSectionHeader('Payment Information', yPosition);
    
    // Payment details box
    addColoredRect(20, yPosition - 3, 170, 25, [248, 249, 250]);
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.rect(20, yPosition - 3, 170, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Bank Account Details:', 25, yPosition + 3);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Account Name: Emmanuel Daniel Chima', 25, yPosition + 9);
    doc.text('Account Number: 0772808080', 25, yPosition + 15);
    doc.text('Bank: Access Bank Plc', 25, yPosition + 21);
    
    yPosition += 35;
    
    // Contact information
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('For payment confirmation, send proof via WhatsApp (+2348110535447) or email (eemadanyel@gmail.com)', 25, yPosition);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('This is a computer-generated document. No signature required.', 25, 285);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 130, 285);
    
    // Save PDF
    const fileName = `Tutoring_Registration_${data.childName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }
  
  // Handle PDF download
  downloadPdfBtn.addEventListener('click', () => {
    if (registrationData) {
      generatePDF(registrationData);
    }
  });
  
  // Handle form submission
  document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!selectedPackage) {
      showStatus('Please select a tutoring package.', 'error');
      return;
    }
    
    // For group classes, we don't need to check sessions per week (fixed at 2)
    if (!selectedPackage.isGroupClass) {
      const sessionsPerWeek = parseInt(sessionsPerWeekSelect.value);
      if (!sessionsPerWeek || isNaN(sessionsPerWeek)) {
        showStatus('Please select number of sessions per week.', 'error');
        return;
      }
    }
    
    // Check if at least one time slot is selected
    const selectedTimeSlots = Array.from(document.querySelectorAll('input[name="timeSlots"]:checked')).map(cb => cb.value);
    if (selectedTimeSlots.length === 0) {
      showStatus('Please select at least one preferred time slot.', 'error');
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Submitting...';
    
    const formData = new FormData(e.target);
    const data = {};
    
    formData.forEach((value, key) => {
      if (key !== 'timeSlots') {
        data[key] = value;
      }
    });
    
    // Add selected package and calculated pricing
    data.selectedPackage = selectedPackage;
    data.packagePrice = selectedPackage.price;
    
    if (selectedPackage.isGroupClass) {
      data.totalPrice = selectedPackage.price;
      data.sessionsPerWeek = 2; // Fixed for group classes
    } else {
      data.totalPrice = selectedPackage.price * parseInt(sessionsPerWeekSelect.value);
      data.sessionsPerWeek = sessionsPerWeekSelect.value;
    }
    
    data.timeSlots = selectedTimeSlots;
    data.submissionDate = new Date().toLocaleString();
    
    registrationData = data;
    
    try {
      await sendEmailNotification(data);
      showStatus('Registration submitted successfully! You will receive a confirmation email shortly.', 'success');
      downloadPdfBtn.style.display = 'block';
    } catch (error) {
      console.error('Email sending failed:', error);
      showStatus('Registration saved! Please note down the payment details above. You can download your registration form below.', 'success');
      downloadPdfBtn.style.display = 'block';
    }
    
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'Register for Tutoring';
  });
  
  // Initialize
  createPackageCards();
});