import React, { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-animate ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation;