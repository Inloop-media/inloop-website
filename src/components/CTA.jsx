"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealLines } from "@/components/home/SectionHead";
import { SERVICES } from "@/data/services";
import { EMAIL } from "@/data/team";

const EASE = [0.16, 1, 0.3, 1];

const BUDGETS = ["Under ₹50K / month", "₹50K to ₹2L / month", "₹2L to ₹5L / month", "₹5L+ / month", "Not sure yet"];

function Select({ name, placeholder, options }) {
  return (
    <div className="relative">
      <select name={name} required defaultValue="" aria-label={placeholder} className="gs-field">
        <option value="" disabled>{placeholder} *</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
        <option value="Not sure / open to recommendation">Not sure / open to recommendation</option>
      </select>
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--brand)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export default function CTA({ id = "contact" }) {
  const [sent, setSent] = useState(false);

  // No backend yet: hand the enquiry to the visitor's email client, addressed to Inloop
  const onSubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries());
    const subject = `New enquiry — ${d.company || `${d.firstName} ${d.lastName}`}`;
    const body = [
      `Name: ${d.firstName} ${d.lastName}`,
      `Phone: ${d.phone}`,
      `Email: ${d.email}`,
      `Company / Organization: ${d.company}`,
      `Country: ${d.country}`,
      `Service interest: ${d.service}`,
      `Estimated budget: ${d.budget}`,
      `Newsletter: ${d.newsletter ? "Yes" : "No"}`,
      "",
      d.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id={id} className="bg-[#050505] py-[100px]">
      <div className="gs-wrap grid grid-cols-1 lg:grid-cols-[264px_1fr] gap-14 lg:gap-[11.5vw] 2xl:gap-[226px]">
        <div>
          <RevealLines lines={["Lets Get in", "Touch"]} className="gs-h2" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="mt-6 h-[2px] w-[200px] bg-[var(--brand)] origin-left"
          />
          <p className="mt-6 text-[16px] font-light leading-[1.6] text-white">
            Most engagements begin within a week of enquiry, and we would love to hear about your brand.
          </p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 lg:mr-[15px]"
        >
          <input name="firstName" required placeholder="First Name *" aria-label="First Name" className="gs-field" />
          <input name="lastName" required placeholder="Last Name *" aria-label="Last Name" className="gs-field" />
          <input name="phone" type="tel" required placeholder="Contact Number *" aria-label="Contact Number" className="gs-field sm:col-span-2" />
          <input name="email" type="email" required placeholder="Email Address *" aria-label="Email Address" className="gs-field sm:col-span-2" />
          <input name="company" required placeholder="Company / Organization *" aria-label="Company / Organization" className="gs-field" />
          <input name="country" required placeholder="Country *" aria-label="Country" className="gs-field" />
          <Select name="service" placeholder="Service Interest" options={SERVICES.map((s) => s.tag)} />
          <Select name="budget" placeholder="Estimated Budget" options={BUDGETS} />
          <textarea name="message" required rows={2} placeholder="Describe Your Project... *" aria-label="Describe Your Project" className="gs-field sm:col-span-2 resize-none min-h-[69px]" />

          <label className="sm:col-span-2 flex items-center gap-3 w-fit cursor-pointer text-[14px] font-bold text-white">
            <input type="checkbox" name="newsletter" className="w-[18px] h-[18px] accent-[var(--brand)] cursor-pointer" />
            Subscribe to Newsletter
          </label>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
            <button
              type="submit"
              className="h-12 px-8 bg-[var(--brand)] text-white text-[12px] uppercase tracking-[0.6px] hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Submit Message
            </button>
            {sent && <span className="text-[13px] text-white/70">Opening your email app — just hit send.</span>}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
