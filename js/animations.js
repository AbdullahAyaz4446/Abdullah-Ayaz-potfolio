// ===== Typing Effect =====
const typingTexts = [
  'React Native Developer',
  'Mobile App Builder',
  'Cross-Platform Expert',
  'UI/UX Enthusiast',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentText.length) {
    speed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    speed = 500; // Pause before next word
  }

  setTimeout(typeEffect, speed);
}

// Start typing when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 800);
});

// ===== Scroll Reveal Animations =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== SVG Circular Progress Animation =====
function animateSkillCircles() {
  const skillItems = document.querySelectorAll('.skill-item[data-percent]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percent = parseInt(entry.target.getAttribute('data-percent'));
          const progressCircle = entry.target.querySelector('.progress-circle');
          if (progressCircle) {
            // circumference = 2 * PI * r = 2 * 3.14159 * 35 ≈ 220
            const circumference = 220;
            const offset = circumference - (percent / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillItems.forEach((item) => {
    observer.observe(item);
  });
}

document.addEventListener('DOMContentLoaded', animateSkillCircles);

// ===== Staggered Project Card Animations =====
function staggerProjectCards() {
  const cards = document.querySelectorAll('.project-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', staggerProjectCards);

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.05)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.transform = 'translateY(0)';
  }
});

// ===== Parallax effect on hero section =====
window.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image');
  const heroText = document.querySelector('.hero-text');

  if (heroImage && heroText) {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
      heroText.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
  }
});
