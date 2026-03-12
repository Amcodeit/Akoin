/**
 * IDR - Institute of Digital Risk
 * Main JavaScript
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // DOM Elements
  // ═══════════════════════════════════════════════════════════════════════════

  const header = document.getElementById('site-header');
  const burger = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const fadeElements = document.querySelectorAll('.fade-up');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  // ═══════════════════════════════════════════════════════════════════════════
  // Sticky Header on Scroll
  // ═══════════════════════════════════════════════════════════════════════════

  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ═══════════════════════════════════════════════════════════════════════════
  // Mobile Menu Toggle
  // ═══════════════════════════════════════════════════════════════════════════

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Scroll-Triggered Fade-In Animation
  // ═══════════════════════════════════════════════════════════════════════════

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Contact Form Submit (Demo)
  // ═══════════════════════════════════════════════════════════════════════════

  function handleFormSubmit(event) {
    event.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(function () {
      formSuccess.style.display = 'block';
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Hide success message after 5 seconds
      setTimeout(function () {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 900);
  }

  contactForm.addEventListener('submit', handleFormSubmit);

  // ═══════════════════════════════════════════════════════════════════════════
  // Keyboard Accessibility
  // ═══════════════════════════════════════════════════════════════════════════

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

})();
