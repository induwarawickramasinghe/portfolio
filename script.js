// script.js

// Smooth scrolling for navbar links
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Scroll reveal animation
const revealSections = document.querySelectorAll('section');

function revealOnScroll() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  revealSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top + scrollY;

    if (scrollY + windowHeight > sectionTop + 100) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Initial animation on load
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
});

// Optional: Animated glow for name (for more advanced glow logic)
/*
const nameElement = document.querySelector('.name-animation');
setInterval(() => {
  nameElement.style.textShadow = `0 0 10px #00ff88, 0 0 20px #00ff88`;
  setTimeout(() => {
    nameElement.style.textShadow = 'none';
  }, 1000);
}, 2000);
*/

// Animated count-up
const counters = document.querySelectorAll('.count');

const runCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const increment = target /100;
  let count = 0;

  const updateCount = () => {
    count += increment;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
};

// Trigger when visible
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      observer.unobserve(entry.target); // Run only once
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => {
  observer.observe(counter);
});

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});