import HomeHero, { LogoStrip } from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeFlipCards from "@/components/home/HomeFlipCards";
import HomeWork from "@/components/home/HomeWork";
import HomeServices from "@/components/home/HomeServices";
import HomeTeam from "@/components/home/HomeTeam";
import HomeMethod from "@/components/home/HomeMethod";
import HomeArticle from "@/components/home/HomeArticle";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <HomeHero />
      {/* The next sections slide up over the pinned film, as on GreySpace */}
      <div className="relative z-10 -mt-[300px]">
        <div className="bg-gradient-to-b from-transparent via-[#000000]/60 to-[#000000]">
          <LogoStrip />
        </div>
        <HomeIntro />
        <HomeFlipCards />
        <HomeWork />
        <HomeServices />
        <HomeTeam />
        <HomeMethod />
        <HomeArticle />
        <CTA />
      </div>
    </>
  );
}
