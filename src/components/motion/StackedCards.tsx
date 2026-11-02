// StackedCards.tsx — Estilo creme.digital: paneles grandes redondeados que se
// apilan al hacer scroll (sticky), con halo de color y mockup a la derecha.
// Solo transform/opacity. Respeta prefers-reduced-motion.
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface StackStep {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  icon: LucideIcon;
}

export default function StackedCards({ steps }: { steps: StackStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {steps.map((s, i) => (
        <Card key={i} step={s} index={i} total={steps.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function Card({
  step,
  index,
  total,
  progress,
}: {
  step: StackStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const start = index / total;
  // A medida que llegan las siguientes cards, esta se encoge y se oscurece
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const Icon = step.icon;

  return (
    <div className="sticky flex h-screen items-center justify-center px-4" style={{ top: index * 24 }}>
      <motion.div
        style={{ scale: reduce ? 1 : scale }}
        className="relative w-full max-w-6xl origin-top"
        initial={reduce ? false : { opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Halo de color detrás de la card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 30%, hsl(var(--primary) / 0.45), transparent 70%), radial-gradient(50% 50% at 10% 90%, hsl(var(--accent) / 0.25), transparent 70%)",
          }}
        />
        <div className="relative grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/20 md:grid-cols-2 min-h-[440px]">
          {/* Glow interior lado derecho */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-2/3"
            style={{
              background:
                "radial-gradient(70% 70% at 90% 20%, hsl(var(--primary) / 0.18), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col justify-center p-8 md:p-12">
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-muted-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </span>
              {step.eyebrow}
            </span>
            <h3 className="mb-5 text-3xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
              {step.title}
            </h3>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{step.body}</p>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 left-8 select-none font-display text-[120px] font-bold leading-none text-primary/10"
            >
              0{index + 1}
            </span>
          </div>
          <div className="relative flex items-center justify-end p-6 md:p-10 md:pr-0">
            <div className="group w-full overflow-hidden rounded-l-2xl rounded-r-2xl border border-border bg-background shadow-xl md:rounded-r-none">
              <img
                src={step.image}
                alt={step.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
