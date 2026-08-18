"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Infrastructure Audit",
    description: "We analyze your network topologies, identify performance bottlenecks, and map out scalable cloud environments.",
  },
  {
    number: "02",
    title: "Zero-Trust Architecture",
    description: "We secure your perimeter using zero-trust protocols, multi-factor authentication, and advanced encryption standards.",
  },
  {
    number: "03",
    title: "Continuous Resilience",
    description: "As workloads migrate, our 24/7 NOC continuously monitors infrastructure health, ensuring 99.999% SLA uptime.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white text-balance">
              The Framework For <br /> IT Excellence
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              We don&apos;t just maintain hardware. We architect scalable, secure, and resilient IT ecosystems.
            </p>
            <button className="text-white border-b border-white hover:text-indigo-400 hover:border-indigo-400 transition-colors pb-1 flex items-center gap-2">
              See detailed methodology
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-8 bottom-8 w-px bg-white/10" />
            
            <div className="space-y-12 relative z-10">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="flex gap-8 relative"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400 shrink-0 bg-black">
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
