"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export default function CountUp({ to, decimals = 0, duration = 2, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
    </span>
  );
}
