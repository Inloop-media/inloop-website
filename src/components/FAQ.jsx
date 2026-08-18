"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50 border-t border-black/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 w-full">

        <div className="lg:col-span-1 w-full flex flex-col justify-start">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-black uppercase mb-3 md:mb-4">
            Knowledge Base
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 max-w-xs text-wrap text-black">
            Query & Resolve
          </h2>
        </div>

        <div className="lg:col-span-2 w-full">
          <Accordion className="w-full">
            <AccordionItem value="item-1" className="border-black/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-black font-light tracking-tight uppercase hover:text-black transition-colors">
                What exactly does INNOWORQ do?
              </AccordionTrigger>
              <AccordionContent className="text-black leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                INNOWORQ is an enterprise IT service provider offering NOC, SOC, Cloud Migration, and SLA-based hardware lifecycle management globally.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-black/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-black font-light tracking-tight uppercase hover:text-black transition-colors">
                Do you provide 24/7 Support?
              </AccordionTrigger>
              <AccordionContent className="text-black leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                Yes. Our Global Network Operations Center operates 24/7/365 to provide continuous monitoring and immediate L1/L2/L3 support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-black/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-black font-light tracking-tight uppercase hover:text-black transition-colors">
                Do you support multi-vendor environments?
              </AccordionTrigger>
              <AccordionContent className="text-black leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                Absolutely. We offer OEM-agnostic SLA coverage for HPE, Dell, Cisco, Lenovo, and other enterprise vendors, including End-of-Service-Life hardware.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-black/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-black font-light tracking-tight uppercase hover:text-black transition-colors">
                How do you guarantee uptime?
              </AccordionTrigger>
              <AccordionContent className="text-black leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                We provide stringent, contract-backed SLAs guaranteeing up to 99.999% uptime for mission-critical infrastructure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-transparent py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-black font-light tracking-tight uppercase hover:text-black transition-colors">
                Cloud Migration?
              </AccordionTrigger>
              <AccordionContent className="text-black leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                Yes. We specialize in migrating legacy on-premise infrastructure to AWS, Azure, and GCP with zero business disruption.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
