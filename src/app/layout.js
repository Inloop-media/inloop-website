import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SystemFooter from "@/components/layout/SystemFooter";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Spotlight from "@/components/Spotlight";
import ScrollProgress from "@/components/ScrollProgress";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "ClearEcho | The Community Authority Engine",
  description: "We turn community trust into brand authority. Scale your presence from Reddit to the entire social web.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-white selection:text-black">
        <LenisProvider>
          <CustomCursor />
          <Spotlight />
          <ScrollProgress />
          {/* Cinematic Film Grain Overlay */}
          <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noise)"/%3E%3C/svg%3E')` }}></div>
          <Header />
          <main className="flex-1 pt-24 relative">{children}</main>
          <SystemFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
