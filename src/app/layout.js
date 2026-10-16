import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import SystemFooter from "@/components/layout/SystemFooter";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";

// Overused Grotesk (SIL OFL 1.1, see src/fonts/OverusedGrotesk-LICENSE.txt)
const overused = localFont({
  src: "../fonts/OverusedGrotesk-VF.woff2",
  variable: "--font-overused",
  weight: "300 900",
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Inloop Media — AI-First Marketing Agency",
  description: "Inloop Media is an AI-first marketing agency combining creative, performance and automation to engineer measurable growth for modern brands.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${overused.variable} ${playfair.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#000000] text-white font-sans selection:bg-white selection:text-black">
        <LenisProvider>
          <CustomCursor />
          <Preloader />
          <BackToTop />
          <Header />
          <main className="flex-1 relative">{children}</main>
          <SystemFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
