"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Dot follows the pointer exactly; ring trails on a spring and grows over interactive
// elements. Any element with data-cursor="Label" shows that label inside the ring.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest("[data-cursor]");
      if (labelled) {
        setVariant("label");
        setLabel(labelled.getAttribute("data-cursor"));
      } else if (target?.closest("a, button, [role='button'], input, select, textarea, label")) {
        setVariant("link");
        setLabel("");
      } else {
        setVariant("default");
        setLabel("");
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = variant === "label" ? 84 : variant === "link" ? 54 : 34;

  return (
    <>
      <style>{`@media (pointer: fine) { html, body, a, button, [role='button'], label, select { cursor: none !important; } }`}</style>
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: ringSize, height: ringSize, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={`fixed left-0 top-0 z-[9999] pointer-events-none rounded-full grid place-items-center ${
          variant === "label"
            ? "bg-[var(--brand)] border border-[var(--brand)]"
            : variant === "link"
              ? "border border-white/80 bg-white/10 backdrop-blur-[2px]"
              : "border border-white/40"
        }`}
      >
        {variant === "label" && (
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white">{label}</span>
        )}
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && variant !== "label" ? 1 : 0, scale: variant === "link" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="fixed left-0 top-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-white"
      />
    </>
  );
}
