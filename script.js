document.addEventListener('DOMContentLoaded', function() {
    // 1. Dynamic Year in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for user preference in local storage or system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    });

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Typewriter Effect for Introduction
    const introTextElement = document.getElementById('introText');
    // REMEMBER TO UPDATE THIS TEXT WITH YOUR ACTUAL INTRO
    const fullText = "Welcome to my portfolio. I'm a passionate web developer with a keen interest in crafting user-friendly and visually appealing web experiences. I enjoy solving complex problems and continuously learning new technologies to bring innovative ideas to life. Take a look around to see some of my work!";
    let charIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    function typeWriter() {
        if (charIndex < fullText.length) {
            introTextElement.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    // Start typewriter after a short delay
    setTimeout(typeWriter, 500);


    // 5. Scroll Reveal Animation (Intersection Observer)
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of section visible before animating
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Add hidden class initially
        observer.observe(section);
    });

    // 6. Simple Contact Form Submission (placeholder)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            alert('Thank you for your message! I will get back to you soon.');

            // Clear the form
            contactForm.reset();
        });
    }

    // 7. Show Contact Info Button and Pop-up Logic
    const showContactInfoBtn = document.getElementById('showContactInfoBtn');
    const contactDetailsPopup = document.getElementById('contactDetailsPopup');
    const closeContactInfoBtn = document.getElementById('closeContactInfoBtn');

    if (showContactInfoBtn && contactDetailsPopup && closeContactInfoBtn) {
        showContactInfoBtn.addEventListener('click', function() {
            contactDetailsPopup.classList.add('active');
        });

        closeContactInfoBtn.addEventListener('click', function() {
            contactDetailsPopup.classList.remove('active');
        });

        // Close popup if clicking outside it
        window.addEventListener('click', function(event) {
            if (event.target === contactDetailsPopup) {
                contactDetailsPopup.classList.remove('active');
            }
        });
    }
});