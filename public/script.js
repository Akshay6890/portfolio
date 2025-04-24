document.addEventListener('DOMContentLoaded', function() {
    // Set dark theme by default
    document.body.setAttribute('data-theme', 'dark');

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navRight.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navRight.classList.remove('active');
        });
    });

    // Sticky Navigation
    const nav = document.querySelector('.main-nav');
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight * 0.8) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Animation on scroll (excluding about section)
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.work-card, .experience-item, .skill-icon');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Initialize elements as hidden (excluding about section)
    document.querySelectorAll('.work-card, .experience-item, .skill-icon').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
                const errorElement = group.querySelector('.form-error');
                if (errorElement) errorElement.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Name is required');
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value.trim())) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Message is required');
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just log it and show a success message

                var name = nameInput.value.trim();
                var email = emailInput.value.trim();
                var message = messageInput.value.trim();


                /*fetch('https://script.google.com/macros/s/AKfycbzUvDGNcKS4DMIoJF82KsVUofi0nn8JNUZm5Sgkciv7wX3Rze3DX5ova4HuSwutz7nF/exec', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      name: name,
                      email: email,
                      message: message
                    })
                  })
                  .then(res => res.json())
                  .then(data => {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                  })
                  .catch(err => {
                    console.error("Error sending data:", err);
                    alert("Failed to send message.");
                  });*/


                  fetch(`/.netlify/functions/send?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`)
                    .then(res => res.json())
                    .then(data => console.log("Success:", data))
                    .catch(err => console.error("Error:", err));

                  
            }
        });
        
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('error');
            
            let errorElement = formGroup.querySelector('.form-error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'form-error';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }
});