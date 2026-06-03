// HeroStage.tsx — Fondo animado del hero: mesh gradient teal que respira +
// dos blobs que siguen el cursor con parallax suave. Solo transform/opacity.
// Respeta prefers-reduced-motion.
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function HeroStage() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x1 = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const y1 = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });
  const x2 = useSpring(mx, { stiffness: 30, damping: 25, mass: 1 });
  const y2 = useSpring(my, { stiffness: 30, damping: 25, mass: 1 });

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      mx.set(cx / rect.width);
      my.set(cy / rect.height);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Mesh gradient que respira */}
      <motion.div
        className="absolute -top-1/3 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Blob 1 — sigue al mouse rápido */}
      <motion.div
        className="absolute top-[8%] right-[-10%] h-[700px] w-[700px] rounded-full"
        style={{
          x: reduce ? 0 : (x1 as unknown as number),
          y: reduce ? 0 : (y1 as unknown as number),
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.22), transparent 70%)",
          filter: "blur(60px)",
          translateX: reduce ? undefined : undefined,
        }}
      />
      {/* Blob 2 — sigue al mouse lento, contrario */}
      <motion.div
        className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full"
        style={{
          x: reduce ? 0 : (x2 as unknown as number),
          y: reduce ? 0 : (y2 as unknown as number),
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.14), transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      {/* Grain sutil con líneas — refuerza profundidad */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Reveal palabra-por-palabra para el headline. Stagger marcado. */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "div";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Stagger container para entradas con carácter (translateY 60 + scale 0.9). */
export const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const heroItem = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

/** Pill / badge con spring rebote. */
export const springPill = {
  hidden: { opacity: 0, scale: 0.6, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 14 },
  },
};

/** Form panel: entra desde la derecha con delay. */
export const formPanel = {
  hidden: { opacity: 0, x: 80, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE, delay: 0.45 },
  },
};