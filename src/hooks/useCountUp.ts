// useCountUp.ts
// Cuenta de 0 al valor final cuando el elemento entra al viewport.
// Cero dependencias.
//
// Uso:
//   const { ref, value } = useCountUp(50);
//   <span ref={ref}>{value}+</span>

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, durationMs = 1500) {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / durationMs, 1);
              const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
              setValue(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return { ref, value };
}
