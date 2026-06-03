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
            active={active === i}
            onActive={() => setActive(i)}
          />
        ))}
      </div>

      {/* Derecha: imagen sticky con cross-fade */}
      <div className="hidden md:block">
        <div className="sticky top-24 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={steps[active].image}
              src={steps[active].image}
              alt={steps[active].title}
              className="h-full w-full object-cover"
              initial={reduce ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
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

function StepBlock({ step, active, onActive }: { step: Step; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      onViewportEnter={onActive}
      viewport={{ amount: 0.6, margin: "-25% 0px -25% 0px" }}
      className={`flex min-h-[55vh] flex-col justify-center transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-35"
      }`}
    >
      <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
        {step.eyebrow}
      </span>
      <h3 className="mb-4 text-2xl font-bold text-foreground md:text-4xl">{step.title}</h3>
      <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{step.body}</p>
      {/* En mobile la imagen va inline */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border md:hidden">
        <img src={step.image} alt={step.title} className="w-full" />
      </div>
    </motion.div>
  );
}
