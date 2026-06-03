// useScrollReveal.ts
// Activa la clase .reveal -> .is-visible (ya definida en tu index.css)
// cuando el elemento entra al viewport. Cero dependencias.
//
// Uso simple en cualquier seccion:
//   const ref = useScrollReveal<HTMLDivElement>();
//   <div ref={ref} className="reveal">...</div>
//
// Para stagger entre hijos, ver useScrollRevealGroup mas abajo.

import { useEffect, useRef } from "react";

interface Options {
  threshold?: number;   // 0-1, cuanto del elemento debe verse
  rootMargin?: string;  // adelanta/atrasa el disparo
  once?: boolean;       // animar solo una vez
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true }: Options = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respeta prefers-reduced-motion: muestra directo sin animar
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

// Version para contenedores: aplica .is-visible a todos los hijos con clase
// .reveal, escalonando con un delay incremental (efecto stagger tipo creme.digital).
//
// Uso:
//   const ref = useScrollRevealGroup<HTMLDivElement>(0.1);
//   <div ref={ref} className="grid ...">
//     <div className="reveal">card 1</div>
//     <div className="reveal">card 2</div>
//   </div>
export function useScrollRevealGroup<T extends HTMLElement = HTMLDivElement>(
  staggerSeconds = 0.1,
  { threshold = 0.15, rootMargin = "0px 0px -10% 0px" }: Options = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.querySelectorAll<HTMLElement>(".reveal"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      children.forEach((c) => c.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              child.style.animationDelay = `${i * staggerSeconds}s`;
              child.classList.add("is-visible");
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [staggerSeconds, threshold, rootMargin]);

  return ref;
}
