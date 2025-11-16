// Intersection Observer for about section animation
const aboutSection = document.getElementById('about');
const aboutImage = document.querySelector('.about-image img');

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('in-view');

        // Add a slight delay to sync with scroll
        setTimeout(() => {
          if (aboutImage) {
            aboutImage.style.animation = 'imageTransition 1.5s ease forwards';
          }
        }, 300);
      }
    });
  },
  { threshold: 0.3 }
);

aboutObserver.observe(aboutSection);

// Additional smooth transition for the entire page
document.querySelectorAll('section').forEach((section) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 1s ease';
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('section').forEach((section) => {
  sectionObserver.observe(section);
});

// Skill circles animation on scroll
const skillCircles = document.querySelectorAll('.skill-circle');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
          entry.target.style.animation = '';
        }, 600);
      }
    });
  },
  { threshold: 0.5 }
);

skillCircles.forEach((circle) => {
  skillObserver.observe(circle);
});

// Add pulse animation for skill circles
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// Initialize typing effect when hero section is in view
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const heroText = document.querySelector('.hero-text p');
        const originalText = heroText.textContent;

        // Reset and start typing effect
        heroText.style.borderRight = '2px solid var(--primary)';
        typeWriter(heroText, originalText);

        // Remove cursor after typing is done
        setTimeout(() => {
          heroText.style.borderRight = 'none';
        }, originalText.length * 50 + 500);

        // Unobserve after animation
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

heroObserver.observe(document.getElementById('hero'));

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bg-gradient);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
    scrollToTopBtn.style.transform = 'translateY(0)';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
    scrollToTopBtn.style.transform = 'translateY(20px)';
  }
});

// Add hover effect for scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.transform = 'translateY(0)';
  }
});
