
import Lenis from '@studio-freight/lenis';

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Add scroll event listener for scroll-triggered animations
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
    // Trigger animations based on scroll position
    const elements = document.querySelectorAll('[data-scroll]');
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !element.classList.contains('animated')) {
        element.classList.add('animated');
        const animationType = element.getAttribute('data-scroll');
        
        switch (animationType) {
          case 'fade':
            element.classList.add('animate-fadeIn');
            break;
          case 'slide-up':
            element.classList.add('animate-slideUp');
            break;
          case 'slide-left':
            element.classList.add('animate-slideInLeft');
            break;
          case 'slide-right':
            element.classList.add('animate-slideInRight');
            break;
          case 'scale':
            element.classList.add('animate-scaleIn');
            break;
        }
      }
    });
  });

  return lenis;
}

export function scrollTo(target: string | number, options?: any) {
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(target, options);
  }
}
