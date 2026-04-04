"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    num: "01",
    title: "Reddit Foundation",
    description: "Reddit is where real people talk. It's the most trusted place to build your brand's reputation before scaling.",
  },
  {
    num: "02",
    title: "The AI Secret Sauce",
    description: "AI models like ChatGPT learn from Reddit. We make sure they read about your brand and recommend you.",
  },
  {
    num: "03",
    title: "Google Search Power",
    description: "Reddit threads dominate Google. We capture that high-intent traffic and funnel it to your website.",
  },
  {
    num: "04",
    title: "High-Authority Assets",
    description: "Aged, high-karma Reddit accounts ensure your brand's presence is permanently respected.",
  },
  {
    num: "05",
    title: "Competitor Tracking",
    description: "We watch your competitors 24/7. Know their exact moves before they make them.",
  },
  {
    num: "06",
    title: "Multi-Platform Scale",
    description: "Once we win Reddit, we replicate that momentum across X, LinkedIn, and YouTube for total dominance.",
  }
];

export default function Features() {
  return (
    <section id="strategy" className="py-16 md:py-24 bg-[#050505] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 mb-16 md:mb-24 w-full">
          <div className="md:w-1/3 w-full">
            <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3 md:mb-4">
              System Architecture
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-wrap">
              The Engine.
            </h2>
          </div>
          <div className="md:w-2/3 w-full">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-2xl text-wrap">
              We engineer deep community trust on Reddit, creating the permanent dataset that AI models and search engines use to define your authority.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16 w-full">
          {capabilities.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col border-t border-white/10 pt-4 sm:pt-6 group w-full"
            >
              <div className="flex items-start justify-between mb-6 sm:mb-8 w-full">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full" />
                 </div>
                 <div className="font-mono text-[8px] sm:text-[10px] tracking-widest text-white/30">
                   [{feature.num}]
                 </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3 sm:mb-4 group-hover:pl-2 transition-all text-wrap">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-sm sm:text-base text-wrap">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
