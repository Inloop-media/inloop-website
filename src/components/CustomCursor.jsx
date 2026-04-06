"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Multiple spring dots for the trail
  const dotsCount = 8;
  const dots = Array.from({ length: dotsCount }).map((_, i) => ({
    x: useSpring(0, { damping: 25 + i * 2, stiffness: 300 - i * 20, mass: 0.1 + i * 0.05 }),
    y: useSpring(0, { damping: 25 + i * 2, stiffness: 300 - i * 20, mass: 0.1 + i * 0.05 }),
  }));

  useEffect(() => {
    const mouseMove = (e) => {
      dots.forEach((dot) => {
        dot.x.set(e.clientX - 4); // Center smaller dots
        dot.y.set(e.clientY - 4);
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "a" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [dots]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body, a, button { cursor: none !important; }
      `}} />
      
      {/* Principal Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dots[0].x,
          y: dots[0].y,
          translateX: "-12px",
          translateY: "-12px",
          backgroundColor: "white"
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Trail Dots */}
      {dots.slice(1).map((dot, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9998] bg-white/40"
          style={{
            x: dot.x,
            y: dot.y,
            scale: 1 - i * 0.1,
            opacity: 0.5 - i * 0.05
          }}
        />
      ))}
    </>
  );
}
