// StickyStory.tsx — El efecto estrella de creme.digital.
// El bloque de imagen queda STICKY mientras los pasos pasan a su lado,
// y la imagen activa cambia con cross-fade segun el scroll.
import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface Step {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
}

export default function StickyStory({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="relative grid gap-10 md:grid-cols-2 md:gap-16">
      {/* Izquierda: pasos */}
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <StepBlock
            key={i}
            step={step}
            index={i}
            active={active === i}
            onActive={() => setActive(i)}
          />
        ))}
      </div>

      {/* Derecha: imagen sticky con cross-fade */}
      <div className="hidden md:block">
        <div className="sticky top-24 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/20 ring-1 ring-primary/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={steps[active].image}
              src={steps[active].image}
              alt={steps[active].title}
              className="h-full w-full object-cover"
              initial={
                reduce
                  ? false
                  : { opacity: 0, scale: 1.15, clipPath: "inset(0 0 100% 0)" }
              }
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={reduce ? undefined : { opacity: 0, scale: 1.05, clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
          {/* Número gigante del paso activo, sobrepuesto */}
          <div className="pointer-events-none absolute top-4 left-6 select-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.85, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="block font-display text-[110px] leading-none font-bold text-primary-foreground mix-blend-difference"
              >
                0{active + 1}
              </motion.span>
            </AnimatePresence>
          </div>
          {/* Barra de progreso de pasos */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-8 bg-primary" : "w-4 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepBlock({ step, index, active, onActive }: { step: Step; index: number; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      onViewportEnter={onActive}
      viewport={{ amount: 0.6, margin: "-25% 0px -25% 0px" }}
      className={`relative flex min-h-[55vh] flex-col justify-center transition-all duration-500 ${
        active ? "opacity-100 scale-100" : "opacity-20 scale-[0.97]"
      }`}
    >
      {/* Número gigante semitransparente detrás del paso */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -left-2 -top-2 select-none font-display font-bold leading-none text-[180px] md:text-[220px] transition-colors duration-500 ${
          active ? "text-primary/10" : "text-foreground/5"
        }`}
      >
        0{index + 1}
      </span>
      <div className="relative">
      <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
        {step.eyebrow}
      </span>
      <h3 className="mb-4 text-2xl font-bold text-foreground md:text-4xl">{step.title}</h3>
      <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{step.body}</p>
      {/* En mobile la imagen va inline */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border md:hidden">
        <img src={step.image} alt={step.title} className="w-full" />
      </div>
      </div>
    </motion.div>
  );
}
