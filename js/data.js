const getImagePath = () => {
  return '/src/';
};

const appData = {
  navigation: {
    logo: {
      src: `${getImagePath()}logo.png`,
      alt: "Superbrain Elites Logo",
      title: "Superbrain"
    },
    menuItems: [
      { text: "Home", href: "#home" },
      { text: "Features", href: "#features" },
      { text: "Programs", href: "#programs" },
      { text: "Reviews", href: "#testimonials" },
      { text: "Contact", href: "#contact" }
    ],
    cta: { text: "Start", href: "#register" }
  },
  
  hero: {
    title: "Unlock Your Child's Mathematical Genius",
    description: "Transform your child's relationship with math and coding through our personalized, AI-enhanced tutoring platform. Join families who've seen remarkable improvements.",
    stats: [
      { value: "85%", label: "Grade Improvement" },
      { value: "100+", label: "Happy Students" },
      { value: "8+", label: "Expert Tutors" }
    ],
    floatingCards: [
      { icon: "fa-calculator", title: "Advanced Math", description: "Algebra to Calculus" },
      { icon: "fa-code", title: "Coding Skills", description: "Python, JavaScript & More" },
      { icon: "fa-brain", title: "Critical Thinking", description: "Problem-Solving Mastery" }
    ],
    buttons: [
      { text: "Start Free Trial", href: "#register", icon: "fa-rocket", className: "btn-primary" },
      { text: "View Programs", href: "#programs", className: "btn-secondary" }
    ]
  },
  
  programsCarousel: {
    subtitle: "Featured Programs",
    title: "Our Latest Offerings",
    description: "Discover our newest programs designed to inspire and educate.",
    programs: [
    {
      title: "Math Olympiad Prep",
      description: "Advanced problem solving for competitions",
      icon: "fa-trophy"
    },
    {
      title: "Python for Beginners",
      description: "Start coding with Python basics",
      icon: "fa-python"
    },
    {
      title: "Algebra Bootcamp",
      description: "Master algebraic concepts in 4 weeks",
      icon: "fa-square-root-alt"
    },
    {
      title: "Robotics Club",
      description: "Hands-on robotics projects",
      icon: "fa-robot"
    }]
  },
  
  trustSection: {
    title: "Trusted by Leading Educational Institutions",
    items: [
      { icon: "fa-school", text: "200+ Schools" },
      { icon: "fa-award", text: "Award Winning" },
      { icon: "fa-certificate", text: "Certified Tutors" },
      { icon: "fa-shield-alt", text: "Safe & Secure" }
    ]
  },
  
  features: {
    subtitle: "Why Choose Us",
    title: "Revolutionary Learning Experience",
    description: "Our cutting-edge approach combines personalized instruction with advanced technology to deliver unparalleled educational outcomes.",
    features: [
    {
      icon: "fa-user-graduate",
      title: "1-on-1 Expert Tutoring",
      description: "Personalized attention from PhD-qualified tutors who adapt their teaching style to your child's unique learning preferences and pace."
    },
    {
      icon: "fa-robot",
      title: "AI-Powered Learning",
      description: "Advanced algorithms analyze learning patterns to identify strengths and weaknesses, creating targeted lesson plans for maximum efficiency."
    },
    {
      icon: "fa-chart-line",
      title: "Real-Time Progress Tracking",
      description: "Comprehensive analytics dashboard for parents to monitor progress, view detailed reports, and celebrate milestones."
    },
    {
      icon: "fa-gamepad",
      title: "Gamified Learning",
      description: "Interactive games and challenges make learning fun while reinforcing key concepts and maintaining student engagement."
    },
    {
      icon: "fa-clock",
      title: "Flexible Scheduling",
      description: "Book sessions that fit your family's schedule with 24/7 availability and easy rescheduling options."
    },
    {
      icon: "fa-medal",
      title: "Guaranteed Results",
      description: "We're so confident in our methods that we guarantee grade improvement within 3 months or your money back."
    }]
  },
  
  programs: {
    subtitle: "Our Programs",
    title: "Choose Your Learning Path",
    description: "Comprehensive programs designed for students and educators, from foundational skills to advanced concepts.",
    programs: [
    {
      title: "Coding & Robotics",
      description: "Develop future-ready skills through hands-on programming and robotics projects that make learning fun and practical.",
      features: [
        "Scratch, Python, and JavaScript",
        "Robotics with LEGO Mindstorms/Arduino",
        "Game development fundamentals",
        "AI and machine learning basics",
        "Competition team preparation"
      ],
      price: "View Price",
      period: "/month",
      icon: "fa-robot",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      link: "./forms/child/child.html"
    },
    {
      title: "Mental Math Mastery",
      description: "Unlock your child's potential with our powerful mental math techniques that boost calculation speed, memory, and analytical thinking.",
      features: [
        "Abacus training for visualization skills",
        "Vedic Math shortcuts for rapid calculations",
        "Speed math tricks and techniques",
        "Memory enhancement exercises",
        "Competition preparation and mock tests"
      ],
      price: "View Price",
      period: "/month",
      badge: "Most Popular",
      icon: "fa-brain",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      link: "./forms/child/child.html"
    },
    {
      title: "Elementary Math",
      description: "Build a rock-solid foundation in mathematics with our engaging, concept-based approach for young learners.",
      features: [
        "Number sense and basic operations",
        "Fractions, decimals, and percentages",
        "Measurement and geometry fundamentals",
        "Word problem solving strategies",
        "Interactive math games and activities"
      ],
      price: "View Price",
      period: "/month",
      icon: "fa-plus",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      link: "./forms/child/child.html"
    },
    {
      title: "High School Mathematics",
      description: "Master advanced mathematical concepts with our comprehensive curriculum designed for academic success.",
      features: [
        "Algebra I & II comprehensive coverage",
        "Geometry and trigonometry mastery",
        "Pre-calculus and calculus preparation",
        "SAT/ACT math test prep",
        "Competition math training"
      ],
      price: "View Price",
      period: "/month",
      badge: "Advanced",
      icon: "fa-square-root-alt",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      link: "/forms/child/child.html"
    },
    {
      title: "Teacher Training (Individual)",
      description: "Elevate your teaching skills with our comprehensive professional development program for educators.",
      features: [
        "Modern pedagogical techniques",
        "Classroom management strategies",
        "Curriculum development training",
        "Student engagement methods",
        "Assessment and evaluation systems",
        "Certification upon completion"
      ],
      price: "View Price",
      period: "/course",
      badge: "Professional",
      icon: "fa-chalkboard-teacher",
      gradient: "linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)",
      link: ".forms/teacher/teacher.html"
    },
    {
      title: "School Teacher Training",
      description: "Transform your school's teaching staff with our institutional training programs tailored to your needs.",
      features: [
        "Customized training programs",
        "Whole-school professional development",
        "Leadership training for administrators",
        "Subject-specific methodology workshops",
        "Ongoing support and mentoring",
        "Accreditation assistance"
      ],
      price: "Custom Pricing",
      period: "/program",
      badge: "Institutional",
      icon: "fa-school",
      gradient: "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      link: ".forms/teacher/teacher.html"
    }, ]
  },
  
  testimonials: {
    subtitle: "Success Stories",
    title: "What Parents & Students Say",
    description: "Hear from families worldwide who have transformed their learning journey with Superbrain Elites.",
    testimonials: [
    {
      quote: "My son's mental math skills improved dramatically! From counting on fingers to solving complex calculations mentally in just 4 months. Now he helps me with market calculations for our family business in Lagos.",
      author: "Adebisi Ogunlesi",
      role: "Parent of Adebowale, Grade 5 (Nigeria - Yoruba)",
      initials: "AO"
    },
    {
      quote: "After just 6 weeks, my daughter designed our church's anniversary brochure in CorelDraw completely on her own! The design skills she gained are professional quality.",
      author: "Nomvula Mkhize",
      role: "Parent of Sipho, Grade 10 (South Africa - Zulu)",
      initials: "NM"
    },
    {
      quote: "The coding transformation was unbelievable! My son went from game player to game creator, building his first mobile app before his 12th birthday.",
      author: "Emma Patel",
      role: "Parent of Rohan, Grade 7 (UK)",
      initials: "EP"
    },
    {
      quote: "My daughter improved her SAT math score by 250 points! The targeted tutoring approach addressed her exact weaknesses.",
      author: "Thomas Williams",
      role: "Parent of Sophia, Grade 11 (USA)",
      initials: "TW"
    },
    {
      quote: "The mental math techniques are revolutionary! My son now calculates faster than me, his accountant father.",
      author: "Nomalanga Tshabalala",
      role: "Parent of Lwandle, Grade 6 (South Africa - Xhosa)",
      initials: "NT"
    },
    {
      quote: "My child's problem-solving skills blossomed. She now approaches complex math homework with confidence instead of frustration.",
      author: "Chinwe Nwachukwu",
      role: "Parent of Ifeanyi, Grade 8 (Nigeria - Igbo)",
      initials: "CN"
    }]
  },
  
  cta: {
    title: "Ready to Transform Your Child's Future?",
    description: "Join thousands of families who have unlocked their children's potential with our proven tutoring methods. Start your free trial today and see the difference expert guidance can make.",
    buttons: [
      { text: "Start Free Trial Now", href: "#", icon: "fa-rocket", className: "btn-primary", onClick: "startFreeTrial()" },
      { text: "Schedule Consultation", href: "#contact", className: "btn-secondary" }
    ]
  },
  
  footer: {
    about: {
      title: "Superbrain Elites",
      description: "Empowering the next generation through exceptional math and coding education. Transform your child's learning journey with our personalized tutoring approach.",
      social: [
        { icon: "fa-facebook-f", href: "#" },
        { icon: "fa-twitter", href: "#" },
        { icon: "fa-instagram", href: "#" },
        { icon: "fa-linkedin-in", href: "#" },
        { icon: "fa-youtube", href: "#" }
      ]
    },
    links: {
      programs: [
        { text: "Elementary Math", href: "#programs" },
        { text: "Middle School Math", href: "#programs" },
        { text: "High School Math", href: "#programs" },
        { text: "Coding & Programming", href: "#programs" },
        { text: "Test Preparation", href: "#programs" },
        { text: "Summer Camps", href: "#programs" }
      ],
      company: [
        { text: "About Us", href: "#features" },
        { text: "Success Stories", href: "#testimonials" },
        { text: "Our Tutors", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Press", href: "#" }
      ],
      support: [
        { text: "Help Center", href: "#" },
        { text: "Contact Support", href: "#" },
        { text: "Parent Resources", href: "#" },
        { text: "Student Portal", href: "#" },
        { text: "Privacy Policy", href: "#" },
        { text: "Terms of Service", href: "#" }
      ]
    },
    contact: {
      phone: "+2348110535447",
      email: "mathetactics@gmail.com",
      hours: "Mon-Fri: 8AM-8PM\nSat-Sun: 10AM-6PM"
    },
    copyright: "© 2024 Superbrain Elites. All rights reserved. | Designed with ❤ for learners everywhere."
  }
};

export default appData;