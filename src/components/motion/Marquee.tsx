// Marquee.tsx — Cinta infinita de proyectos/logos. Pausa en hover.
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={`flex flex-wrap justify-center gap-8 ${className}`}>{children}</div>;
  }

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max gap-8"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
        whileHover={{}}
      >
        <div className="flex shrink-0 gap-8">{children}</div>
        <div className="flex shrink-0 gap-8" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}
