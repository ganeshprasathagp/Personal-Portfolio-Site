/**
 * Main JavaScript for Ganesh Prasath's Portfolio Website
 */

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    /**
     * Navbar Scroll Effect and Active Link
     */
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links');
    const sections = document.querySelectorAll('section');
    
    const scrollProgress = document.querySelector('.scroll-progress');

    function updateNavbar() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${Math.min(progress, 100)}%`;
      }
      
      // Update active nav link based on scroll position
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Call on initial load
    
    /**
     * Mobile Menu Toggle
     */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        const bars = this.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
          bars[0].style.transform = 'translateY(8px) rotate(45deg)';
          bars[1].style.opacity = '0';
          bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      });
    }
    
    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-links').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
          
          const bars = menuToggle.querySelectorAll('.bar');
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      });
    });
    
    /**
     * Typing Effect
     */
    if (typeof Typed !== 'undefined') {
      new Typed('.typing', {
        strings: [
          'Software Engineer',
          'AI Enthusiast',
          'Startup Founder',
          'Business Strategist',
          'Data Scientist'
        ],
        typeSpeed: 80,
        backSpeed: 40,
        loop: true
      });
    }
    
    // Skill Tab Functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
      const tabContainer = this.closest('.tabs-container');
      const tabTarget = this.getAttribute('data-tab');
      
      // Remove active class from all buttons in this container
      tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all tab content in this container
      tabContainer.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Show the target content
      document.getElementById(tabTarget).classList.add('active');
      
    });
  });
  
   // Achievement Tabs
const achievementTabs = document.querySelectorAll('.achievement-tab');
const achievementContents = document.querySelectorAll('.achievement-content');

achievementTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const tabTarget = this.getAttribute('data-tab');
    
    // Remove active class from all tabs
    achievementTabs.forEach(t => {
      t.classList.remove('active');
    });
    
    // Add active class to clicked tab
    this.classList.add('active');
    
    // Hide all content
    achievementContents.forEach(content => {
      content.classList.remove('active');
    });
    
    // Show the target content
    document.getElementById(tabTarget).classList.add('active');
  });
});

    
    // Project Filtering + Search
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectSearchInput = document.getElementById('project-search');
const projectsResults = document.getElementById('projects-results');

let activeFilter = 'all';

function updateProjectResults(visibleCount) {
  if (!projectsResults) return;

  if (projectSearchInput && projectSearchInput.value.trim()) {
    projectsResults.textContent = `Found ${visibleCount} matching project${visibleCount === 1 ? '' : 's'}`;
  } else {
    projectsResults.textContent = activeFilter === 'all'
      ? `Showing all ${visibleCount} projects`
      : `Showing ${visibleCount} ${activeFilter} project${visibleCount === 1 ? '' : 's'}`;
  }
}

function applyProjectFilters() {
  const query = projectSearchInput ? projectSearchInput.value.trim().toLowerCase() : '';
  let visibleCount = 0;

  projectCards.forEach(card => {
    const categories = card.getAttribute('data-category') || '';
    const cardText = card.textContent.toLowerCase();
    const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesQuery = !query || cardText.includes(query);

    if (matchesFilter && matchesQuery) {
      card.style.display = 'block';
      visibleCount += 1;
    } else {
      card.style.display = 'none';
    }
  });

  updateProjectResults(visibleCount);
}

filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    activeFilter = this.getAttribute('data-filter');

    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    this.classList.add('active');
    applyProjectFilters();
  });
});

if (projectSearchInput) {
  projectSearchInput.addEventListener('input', applyProjectFilters);

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && document.activeElement !== projectSearchInput) {
      event.preventDefault();
      projectSearchInput.focus();
    }

    if (event.key === 'Escape' && document.activeElement === projectSearchInput) {
      projectSearchInput.value = '';
      applyProjectFilters();
      projectSearchInput.blur();
    }
  });
}

applyProjectFilters();

    /**
     * "View All" Buttons
     */
    document.querySelectorAll('.primary-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        // Check if the button is a link to another page (has href attribute)
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#')) {
          e.preventDefault();
          
          // Add loading animation
          this.classList.add('loading');
          
          // Simulate page transition
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    });
    
    /**
     * Stats Counter Animation
     */
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            stat.textContent = target;
            clearInterval(counter);
          } else {
            stat.textContent = Math.floor(current);
          }
        }, 16);
      });
    }
    
    // Use Intersection Observer to trigger counter animation when visible
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(statsContainer);
    }
    
    /**
     * Progress Bar Animation
     */
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
      progressBars.forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
          bar.style.width = target;
        }, 100);
      });
    }
    
    // Use Intersection Observer for progress bars
    const skillsSections = document.querySelectorAll('.skills-grid');
    
    skillsSections.forEach(section => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      if (section) {
        observer.observe(section);
      }
    });
    
    /**
     * Contact Form with Email Functionality
     */
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formStatus = document.querySelector('.form-status');
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const subject = this.querySelector('input[name="subject"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
          showFormStatus('Please fill in all fields', 'error');
          return;
        }
        
        // Simple email validation
        if (!validateEmail(email)) {
          showFormStatus('Please enter a valid email address', 'error');
          return;
        }
        
        // Show loading status
        showFormStatus('Sending your message...', 'loading');
        
        // Prepare form data for submission
        const formData = new FormData(this);
        
        // Add additional data for email formatting
        formData.append('_subject', `Portfolio Contact: ${subject}`);
        formData.append('_format', 'plain');
        formData.append('_template', 'table');
        
        // Submit to Formspree (or EmailJS alternative)
        fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            showFormStatus('Your message has been sent successfully!', 'success');
            contactForm.reset();
          } else {
            response.json().then(data => {
              let errorMsg = 'Oops! There was a problem sending your message.';
              if (data && data.error) {
                errorMsg = data.error;
              }
              showFormStatus(errorMsg, 'error');
            }).catch(() => {
              showFormStatus('Oops! There was a problem sending your message.', 'error');
            });
          }
        })
        .catch(error => {
          showFormStatus('Oops! There was a problem sending your message.', 'error');
          console.error('Error:', error);
        });
      });
    }
    
    // EmailJS alternative setup (uncomment to use instead of Formspree)
    /*
    if (contactForm && typeof emailjs !== 'undefined') {
      emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formStatus = document.querySelector('.form-status');
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const subject = this.querySelector('input[name="subject"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
          showFormStatus('Please fill in all fields', 'error');
          return;
        }
        
        // Simple email validation
        if (!validateEmail(email)) {
          showFormStatus('Please enter a valid email address', 'error');
          return;
        }
        
        // Show loading status
        showFormStatus('Sending your message...', 'loading');
        
        // Prepare template parameters
        const templateParams = {
          name: name,
          email: email,
          subject: subject,
          message: message
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
          .then(() => {
            showFormStatus('Your message has been sent successfully!', 'success');
            contactForm.reset();
          }, (error) => {
            showFormStatus('Oops! There was a problem sending your message.', 'error');
            console.error('Error:', error);
          });
      });
    }
    */
    
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    function showFormStatus(message, type) {
      const formStatus = document.querySelector('.form-status');
      
      if (!formStatus) return;
      
      formStatus.textContent = message;
      formStatus.style.display = 'block';
      
      // Remove all classes first
      formStatus.classList.remove('form-success', 'form-error');
      
      // Add appropriate class
      if (type === 'success') {
        formStatus.classList.add('form-success');
      } else if (type === 'error') {
        formStatus.classList.add('form-error');
      }
      
      // Auto hide after 5 seconds
      if (type !== 'loading') {
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    }
    
    /**
     * Back to Top Button
     */
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 700) {
          backToTopBtn.classList.add('active');
        } else {
          backToTopBtn.classList.remove('active');
        }
      });

      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    const copyEmailBtn = document.querySelector('.copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', async function() {
        const email = this.getAttribute('data-email');

        try {
          await navigator.clipboard.writeText(email);
          this.textContent = 'Copied!';
        } catch {
          this.textContent = email;
        }

        setTimeout(() => {
          this.textContent = 'Copy Email';
        }, 1800);
      });
    }
    
    /**
     * Smooth Scrolling for Anchor Links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
          e.preventDefault();
          
          const target = document.querySelector(this.getAttribute('href'));
          
          if (target) {
            const targetPosition = target.offsetTop - 80;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    /**
     * Image Lazy Loading Enhancement
     */
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        // Add fade-in effect when image loads
        img.addEventListener('load', function() {
          this.classList.add('loaded');
        });
      });
    } else {
      // Fallback for browsers that don't support native lazy loading
      // Load a lazy loading library like lozad.js if needed
      console.log('Native lazy loading not supported');
    }
    
    /**
     * Analytics Tracking (anonymous)
     */
    function trackPageView() {
      if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname
        });
      }
    }
  




    const currentYear = document.getElementById('current-year');
    const lastUpdated = document.getElementById('last-updated');

    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }

    if (lastUpdated) {
      lastUpdated.textContent = new Date(document.lastModified).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    // Track page view on load
    trackPageView();
    
    // Track all link clicks
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (typeof gtag === 'function') {
          gtag('event', 'link_click', {
            link_url: this.href,
            link_text: this.textContent.trim()
          });
        }
      });
    });
  });
  
