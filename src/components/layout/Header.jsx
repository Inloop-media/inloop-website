"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { SERVICES } from "@/data/services";
import { EMAIL } from "@/data/team";
import { SOCIALS } from "@/components/layout/socials";

const MENU_LINKS = [
  { name: "Work", path: "/work" },
  { name: "Services", dropdown: true },
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "/careers" },
  { name: "Contact Us", path: "/contact" },
  { name: "Insights", path: "/blog" },
];

const EASE = [0.16, 1, 0.3, 1];

export function BrandMark({ size = "nav" }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero-logo.webp" alt="Inloop" className={size === "nav" ? "w-[44px] h-auto" : "w-[56px] h-auto"} />
      <span className={`${size === "nav" ? "text-[19px]" : "text-[22px]"} font-semibold tracking-tight leading-none whitespace-nowrap`}>
        <span className="text-white">inloop</span> <span className="text-white/55">media</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const lastY = useRef(0);
  const lenis = useLenis();
  const pathname = usePathname();

  // Fresh page: show the bar and make sure the menu is closed
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setHidden(false);
    setIsOpen(false);
    setServicesOpen(false);
  }

  // Floating bar once scrolled; hide while scrolling down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 400 && y > lastY.current + 2);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the smooth-scrolled page while the menu is open
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) lenis.stop();
    else lenis.start();
  }, [isOpen, lenis]);

  const close = () => {
    setIsOpen(false);
    setServicesOpen(false);
  };

  const floating = scrolled && !isOpen;

  const bar = (n) => {
    const base = "absolute left-1 w-6 h-[2px] transition-all duration-300";
    const color = hover ? "bg-[var(--brand)]" : "bg-white";
    if (n === 1) return `${base} ${color} top-[9px] ${isOpen ? (hover ? "translate-y-[6.5px] rotate-[135deg]" : "translate-y-[6.5px] rotate-45") : hover ? "translate-x-[3px]" : ""}`;
    if (n === 2) return `${base} ${color} top-[15px] ${isOpen ? "opacity-0 rotate-45" : hover ? "-translate-x-[3px]" : ""}`;
    return `${base} ${color} top-[22px] ${isOpen ? (hover ? "-translate-y-[6.5px] rotate-45" : "-translate-y-[6.5px] -rotate-45") : hover ? "translate-x-[3px]" : ""}`;
  };

  return (
    <>
      <header
        style={{ transitionProperty: "width, top, padding, border-radius, background-color, border-color, transform, opacity" }}
        className={`fixed left-1/2 z-[120] flex items-center justify-between duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          floating
            ? "top-3 md:top-6 w-[calc(100%-40px)] md:w-[calc(100%-200px)] max-w-[1560px] rounded-[24px] px-5 py-3 bg-[rgba(20,20,20,0.4)] border border-white/[0.08] backdrop-blur-[16px]"
            : "top-0 w-full px-5 md:px-20 py-5 md:py-[30px] border border-transparent"
        } ${hidden && !isOpen ? "-translate-x-1/2 -translate-y-[150px] opacity-0 pointer-events-none" : "-translate-x-1/2 opacity-100"}`}
      >
        <Link href="/" onClick={close} className="flex items-center gap-5 shrink-0">
          <BrandMark />
          <span className="hidden md:block w-px h-10 bg-white/30" />
          <span className="hidden md:block text-[10px] font-light leading-[15px] tracking-[2px] uppercase text-white">
            AI-First<br />Marketing Agency
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/contact" onClick={close} className="liquid-btn liquid-btn-white liquid-btn-nav hidden md:inline-flex">
            <span>Contact Us</span>
          </Link>
          <Link href="/careers" onClick={close} className="liquid-btn liquid-btn-ghost liquid-btn-nav hidden md:inline-flex">
            <span>Careers</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="relative w-8 h-8 cursor-pointer"
          >
            <span className={bar(1)} />
            <span className={bar(2)} />
            <span className={bar(3)} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.3, ease: EASE } }}
            className="fixed inset-0 z-[110] bg-[#050505] overflow-y-auto"
            data-lenis-prevent
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[55%] left-1/2 w-[120vw] h-[40vh] -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] blur-[80px] bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.15)_0%,rgba(129,140,248,0)_60%)]" />
            </div>

            <div className="relative min-h-full grid grid-cols-1 md:grid-cols-[1fr_1px_auto] items-center px-6 md:px-[164px] pt-32 pb-16 gap-12 md:gap-0">
              <nav className="flex flex-col gap-4 md:gap-6">
                {MENU_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.3, delay: i * 0.04 } }}
                  >
                    {link.dropdown ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          aria-expanded={servicesOpen}
                          className="group flex items-start gap-1 text-[40px] md:text-[48px] font-normal leading-[1.1] tracking-[0.5px] text-white hover:text-[var(--brand)] transition-colors cursor-pointer"
                        >
                          {link.name}
                          <span className={`text-[20px] leading-none mt-1 transition-transform duration-300 ${servicesOpen ? "rotate-[135deg]" : "group-hover:rotate-[135deg]"}`}>↗</span>
                        </button>
                        <AnimatePresence initial={false}>
                          {servicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-3 pt-5 pb-2 max-w-3xl">
                                {SERVICES.map((s) => (
                                  <Link
                                    key={s.slug}
                                    href={`/services/${s.slug}`}
                                    onClick={close}
                                    className="text-[20px] md:text-[24px] font-light leading-[1.2] text-white hover:text-[var(--brand)] transition-colors"
                                  >
                                    {s.tag}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={close}
                        className="inline-block text-[40px] md:text-[48px] font-normal leading-[1.1] tracking-[0.5px] text-white hover:text-[var(--brand)] transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="hidden md:block w-px self-stretch bg-white/10 my-10" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4, ease: EASE } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3, delay: 0.1 } }}
                className="flex flex-col gap-4 md:pl-24"
              >
                <div className="text-[14px] tracking-[0.3px] text-[var(--brand)]">Follow Us</div>
                <a href={`mailto:${EMAIL}`} className="text-[14px] font-light text-white hover:text-[var(--brand)] transition-colors">{EMAIL}</a>
                <span className="text-[14px] font-light text-white">Noida, India</span>
                <div className="flex w-fit border border-[#5b5b5b] mt-4">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 grid place-items-center text-white hover:text-[var(--brand)] transition-colors"
                    >
                      <Icon className="w-[19px] h-[19px]" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
