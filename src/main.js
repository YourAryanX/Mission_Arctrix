import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  

  // Preloader & Initial Animations
  const tl = gsap.timeline();
  
  tl.to('.loader-letter', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power4.out',
    delay: 0.2
  })
  .to('.progress-bar', {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut'
  }, '-=0.5')
  .to('#preloader', {
    yPercent: -100,
    duration: 1.2,
    ease: 'power4.inOut',
    delay: 0.2
  })
  // Hero entry sequence
  .fromTo('.navbar', 
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
    '-=0.5'
  )
  .fromTo('.hero-badge',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
    '-=0.8'
  )
  .fromTo('.hero-title',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
    '-=0.6'
  )
  .fromTo('.hero-subtitle',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '-=1'
  )
  .fromTo('.hero-cta',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '-=0.8'
  )
  // Video container fade in
  .fromTo('.hero-visual',
    { opacity: 0 },
    { opacity: 1, duration: 1.5, ease: 'power3.out' },
    '-=1'
  );


  // 3D Tilt Effect on Product Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on cursor position relative to center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg
      const rotateY = ((x - centerX) / centerX) * 8;
      
      gsap.to(inner, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // Scroll Animations
  gsap.fromTo('.section-header', 
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.products-section',
        start: 'top 80%',
      }
    }
  );

  gsap.fromTo('.product-card',
    { y: 150, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.products-grid',
        start: 'top 85%',
      }
    }
  );

  // Parallax Text Reveal for About Section
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
    }
  });

  aboutTl.fromTo('.about-title',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
  )
  .fromTo('.about-divider',
    { width: 0 },
    { width: 100, duration: 0.8, ease: 'power2.out' },
    '-=0.6'
  )
  .fromTo('.about-lead',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '-=0.4'
  )
  .fromTo('.about-details',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
    '-=0.6'
  );

  // Stardust Canvas Effect
  const canvas = document.getElementById('stardust');
  const ctx = canvas.getContext('2d');
  let width, height, stars = [];

  function initStardust() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1
      });
    }
  }

  function drawStardust() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      
      star.x += star.vx;
      star.y += star.vy;
      
      // Wrap around
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;
    });
    
    requestAnimationFrame(drawStardust);
  }

  initStardust();
  drawStardust();
  window.addEventListener('resize', initStardust);

  // DEBUG: Global click listener to verify hit targets
  document.addEventListener('click', (e) => {
    console.log('--- CLICK REGISTERED ---');
    console.log('Target element:', e.target);
    console.log('Target classes:', e.target.className);
    
    // Check if the click happened inside the product card
    const card = e.target.closest('.tilt-card');
    if (card) {
      console.log('Clicked inside product card!');
      // Explicitly try to open the URL if the natural <a> tag isn't working
      const link = card.querySelector('a.card-inner');
      if (link && link.href) {
         console.log('Attempting manual redirect to:', link.href);
         window.open(link.href, '_blank');
      }
    } else {
      console.log('Did NOT click inside product card.');
    }
  });

});
