import Hero from "@/components/Hero";
import TrustTicker from "@/components/TrustTicker";
import OEMLogos from "@/components/OEMLogos";
import Features from "@/components/Features";
import IntelligenceFlow from "@/components/IntelligenceFlow";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import DashboardPreview from "@/components/DashboardPreview";
import ProcessGallery from "@/components/ProcessGallery";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import AuthorityMeter from "@/components/AuthorityMeter";

export default function Home() {
  return (
    <>
      <AuthorityMeter />
      <Hero />
      <TrustTicker />
      <Features />
      <OEMLogos />
      <IntelligenceFlow />
      <CaseStudyGrid />
      <DashboardPreview />
      <ProcessGallery />
      <FAQ />
      <CTA />
    </>
  );
}
