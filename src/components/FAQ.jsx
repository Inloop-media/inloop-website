"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-[#050505] border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 w-full">
        
        <div className="lg:col-span-1 w-full flex flex-col justify-start">
          <div className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3 md:mb-4">
            Knowledge Base
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 max-w-xs text-wrap">
            Query & Resolve.
          </h2>
        </div>

        <div className="lg:col-span-2 w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-white/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-white font-light tracking-tight uppercase hover:text-white/70 transition-colors">
                What exactly is ClearEcho?
              </AccordionTrigger>
              <AccordionContent className="text-white/50 leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                ClearEcho is a specialized framework designed to help brands build authority on Reddit. We combine data interception with precision social engineering to ensure your brand is respected and cited as a top-tier solution.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-white font-light tracking-tight uppercase hover:text-white/70 transition-colors">
                How does this affect AI?
              </AccordionTrigger>
              <AccordionContent className="text-white/50 leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                AI models ingest massive amounts of data from Reddit to establish human consensus. By validating your brand on Reddit, these models start natively recommending you when users execute queries.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-white/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-white font-light tracking-tight uppercase hover:text-white/70 transition-colors">
                Is this automated?
              </AccordionTrigger>
              <AccordionContent className="text-white/50 leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                No. Reddit eliminates automation. Our intelligence platform identifies targets, but our operatives manually execute using high-authority assets to inject genuine value.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-white/10 py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-white font-light tracking-tight uppercase hover:text-white/70 transition-colors">
                How do you measure success?
              </AccordionTrigger>
              <AccordionContent className="text-white/50 leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                We use proprietary Visibility Scoring alongside hard performance metrics. You'll track your raw impression volume, direct conversion paths, and AI model recommendation rates.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border-transparent py-3 md:py-4">
              <AccordionTrigger className="text-left text-xl sm:text-2xl lg:text-3xl text-white font-light tracking-tight uppercase hover:text-white/70 transition-colors">
                Crisis Management?
              </AccordionTrigger>
              <AccordionContent className="text-white/50 leading-relaxed text-base sm:text-lg font-light pb-6 md:pb-8 pt-3 md:pt-4 max-w-2xl text-wrap">
                Yes. Traditional press releases fail during active crises. We deploy counter-narrative strategies directly onto the platforms dictating the public sentiment.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
