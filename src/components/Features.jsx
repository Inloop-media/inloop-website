"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const capabilities = [
  {
    num: "01",
    title: "IT Datacenter Management",
    description: "Hardware lifecycle, continuous server maintenance, and hypervisor administration for high availability.",
  },
  {
    num: "02",
    title: "Hybrid Cloud Operations",
    description: "AWS, Azure, GCP infrastructure, seamless migrations, and continuous cloud cost optimization.",
  },
  {
    num: "03",
    title: "Cybersecurity & Zero-Trust",
    description: "Vulnerability assessment, next-gen firewalls, SOC monitoring, and endpoint security.",
  },
  {
    num: "04",
    title: "24×7 NOC & Managed Support",
    description: "Continuous uptime monitoring, proactive alarm handling, and L1/L2/L3 sysadmin dispatch.",
  },
  {
    num: "05",
    title: "DevOps & IaC Automation",
    description: "Elimination of manual IT operations through Terraform, Ansible, and CI/CD pipeline orchestration.",
  },
  {
    num: "06",
    title: "Multi-Vendor SLA Support",
    description: "Cost-effective, multi-vendor support SLA coverage for active and End-of-Service-Life (EOSL) hardware.",
  }
];

export default function Features() {
  return (
    <section id="services" className="py-16 md:py-24 bg-neutral-50 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16 md:mb-24 w-full">
          <div className="md:w-1/3 w-full">
            <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black/40 uppercase mb-3 md:mb-4">
              Core Services
            </div>
            <AnimatedText
              text="Our Expertise"
              className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-left text-black"
            />
          </div>
          <div className="md:w-2/3 w-full flex items-end md:pl-12 lg:pl-24">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-black/60 leading-relaxed text-left">
              We deliver end-to-end SLA-bound IT management, hybrid cloud operations, and zero-trust cybersecurity to empower global enterprises.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16 w-full">
          {capabilities.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex flex-col border-t border-black/10 pt-4 sm:pt-6 group w-full"
            >
              <div className="flex items-start justify-between mb-6 sm:mb-8 w-full">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                 </div>
                 <div className="font-mono text-[8px] sm:text-[10px] tracking-widest text-black/30">
                   [{feature.num}]
                 </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3 sm:mb-4 group-hover:pl-2 transition-all text-wrap text-black">{feature.title}</h3>
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
