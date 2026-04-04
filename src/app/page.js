import Hero from "@/components/Hero";
import TrustTicker from "@/components/TrustTicker";
import Features from "@/components/Features";
import DashboardPreview from "@/components/DashboardPreview";
import MockThread from "@/components/MockThread";
import ProcessGallery from "@/components/ProcessGallery";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <Features />
      <DashboardPreview />
      <MockThread />
      <ProcessGallery />
      <ComparisonTable />
      <FAQ />
      <CTA />
    </>
  );
}
