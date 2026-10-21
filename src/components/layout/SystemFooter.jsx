"use client";

import Link from "next/link";
import { EMAIL, PHONES } from "@/data/team";
import { SOCIALS } from "@/components/layout/socials";
import { BrandMark } from "@/components/layout/Header";

const SYSTEM = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const CAPABILITIES = [
  { label: "Branding", href: "/services/branding" },
  { label: "Social Media", href: "/services/social-media" },
  { label: "Website & Tech", href: "/services/website" },
  { label: "Performance", href: "/services/performance" },
  { label: "AI Creative", href: "/services/ai" },
];

const label = "text-[12px] font-medium leading-[18px] tracking-[0.8px] uppercase text-[var(--brand)]";
const link = "text-[15px] leading-[22.5px] tracking-[0.6px] text-white hover:text-[var(--brand)] transition-colors";

export default function SystemFooter() {
  return (
    <footer className="bg-[#000000] pt-[100px] pb-10">
      <div className="gs-wrap">
        <div className="grid grid-cols-2 lg:grid-cols-[36%_1fr_1fr_236px] gap-y-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block"><BrandMark size="footer" /></Link>
            <p className="mt-8 max-w-[222px] text-[15px] leading-6 text-white">
              Strategy, creative, performance and AI automation for brands built to scale.
            </p>
          </div>

          <div>
            <div className={label}>System</div>
            <ul className="mt-6 flex flex-col gap-4">
              {SYSTEM.map((l) => (
                <li key={l.label}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className={label}>Capabilities</div>
            <ul className="mt-6 flex flex-col gap-4">
              {CAPABILITIES.map((l) => (
                <li key={l.label}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <div className={label}>Contact</div>
            <ul className="mt-6 flex flex-col gap-4">
              <li><a href={`mailto:${EMAIL}`} className={link}>{EMAIL}</a></li>
              {PHONES.map((p) => (
                <li key={p.tel}><a href={`tel:${p.tel}`} className={link}>{p.label}</a></li>
              ))}
            </ul>
            <div className={`${label} mt-10`}>Location</div>
            <p className="mt-6 text-[15px] leading-[22.5px] tracking-[0.6px] text-white">Noida, Uttar Pradesh, India</p>
            <div className={`${label} mt-10`}>Markets</div>
            <p className="mt-6 text-[15px] leading-[22.5px] tracking-[0.6px] text-white">
              India <span className="text-[var(--brand)] mx-1">{"//"}</span> Global <span className="text-[var(--brand)] mx-1">{"//"}</span> Remote
            </p>
          </div>
        </div>

        <div className="mt-20 h-px bg-white/10" />

        <div className="mt-20 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-7">
            {SOCIALS.map(({ label: l, href, Icon }) => (
              <a
                key={l}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={l}
                className="text-white hover:text-[var(--brand)] transition-colors"
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
          <div className="text-[13px] leading-[19.5px] text-white">© 2026 Inloop Media. All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
