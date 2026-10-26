// Case studies from inloopmedia.com (Apploft, The Luxe Drop & DaLuxera, Snack Shack).
export const CASE_STUDIES = [
  {
    slug: "apploft",
    name: "Apploft",
    category: "Mobile Apps · Social + Google Ads",
    tag: "Social Media & Ads",
    headline: "From zero to 5M+ downloads.",
    meta: "Mobile app publisher · Instagram growth, Google App Campaigns",
    metric: { value: 5, suffix: "M+", label: "App downloads" },
    metric2: { value: 3.2, decimals: 1, suffix: "x", label: "Monthly installs in 60 days" },
    bars: [18, 26, 24, 38, 46, 58, 72, 100],
    media: "/videos/ai-saas.mp4",
    overview:
      "Apploft is a fast-growing mobile app publisher with a diverse portfolio of apps. We grew their Instagram from zero into a thriving brand presence and drove over 5 million app downloads through precision-targeted Google Ads campaigns — taking Apploft from a new name in the app industry to a recognised brand in its space.",
    problem:
      "Apploft's apps had strong potential, but the company had no organic social presence and no structured funnel for cost-efficient installs in a crowded market. Brand visibility and a sustainable user-acquisition strategy were both missing.",
    goal:
      "Build brand credibility from scratch and create a growth funnel that would not only maximise downloads, but also improve install-to-retention ratios and bring the cost per install down.",
    solution:
      "A dual approach. On Instagram, a content-first calendar established credibility, showcased Apploft's app ecosystem and nurtured engagement from zero. On Google, Universal App Campaigns ran with precision targeting, data-driven audience segmentation, tailored creatives and continuous A/B testing — every campaign monitored closely and scaled on data. The result: 5M+ installs across the portfolio, monthly installs up 3.2x in the first 60 days, and a lower CPI with better retention on every iteration.",
    scope: "Instagram growth, Google App Campaigns, creative testing",
    timeline: "Ongoing",
  },
  {
    slug: "luxe-apparel",
    name: "The Luxe Drop & DaLuxera",
    category: "Luxury Fashion · Social + Web + UI/UX",
    tag: "Website & Social",
    headline: "Curating luxury online.",
    meta: "Luxury fashion & accessories · UGC-led Instagram, luxury e-commerce website",
    metric: { value: 40, prefix: "+", suffix: "%", label: "Conversion rate lift" },
    bars: [30, 32, 31, 34, 52, 60, 66, 74],
    media: "/videos/ai-fashion.mp4",
    overview:
      "The Luxe Drop (TLD) and DaLuxera had access to high-end apparel and accessories, but not the digital presence to match. We built UGC-driven Instagram communities for both brands and a luxury-first, mobile-optimised website for DaLuxera — creating a seamless journey from discovery on Instagram to purchase on the site.",
    problem:
      "In luxury fashion, trust and perception decide whether a customer buys. Without consistent branding, content and a professional storefront, both brands risked losing buyers who demand authenticity and assurance before a high-value purchase.",
    goal:
      "Build trust and digital visibility for both brands, and give DaLuxera a storefront that works as both a sales driver and a credibility anchor.",
    solution:
      "On Instagram, curated calendars and consistent posting built around user-generated content — stories, reels and carousels of real people styling premium fashion — gave audiences social proof while staying true to a luxury aesthetic. For DaLuxera, we designed and built a sleek, responsive store with elegant design, intuitive navigation, product storytelling and fast checkout, lifting the conversion rate by 40%.",
    scope: "Instagram management, UGC content, website development, UI/UX",
    timeline: "Website build + ongoing social",
  },
  {
    slug: "fmcg-health-brand",
    name: "Snack Shack",
    category: "FMCG Health · Branding + Influencer + Meta Ads",
    tag: "Branding & Growth",
    headline: "From zero to crunch hero.",
    meta: "Healthy snacking, FMCG · Brand identity, packaging, influencer marketing, Meta ads",
    metric: { value: 4.3, decimals: 1, suffix: "x", label: "ROAS in month one" },
    bars: [12, 22, 35, 41, 55, 63, 80, 92],
    media: "/videos/ai-beauty.mp4",
    overview:
      "Snack Shack came to us as an idea for a healthy FMCG snacking brand. We built it from scratch — the entire brand identity, from logo to packaging — and then launched it with an end-to-end growth engine of influencer collaborations and Meta ad funnels.",
    problem:
      "A new brand entering a crowded FMCG shelf, with no name recognition, no visual identity and no audience — it had to look credible and earn trust from day one.",
    goal:
      "Create a brand identity that stands out on shelf and on screen, and reach profitable ROAS from the very first month of launch.",
    solution:
      "We designed Snack Shack's complete identity — logo, visual system and packaging — and took it to market with influencer collaborations to build trust and Meta ad funnels to turn that attention into sales. The launch achieved a 4.3x ROAS within the first month.",
    scope: "Brand identity, packaging, influencer marketing, Meta ads",
    timeline: "Brand build + launch",
  },
];

export const getCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug);

// Inloop's own AI video creative and ad dashboards, shown as "past projects"
export const PAST_PROJECTS = [
  { title: "Glow Kit — UGC Routine", type: "AI Video · Beauty & Wellness", media: { kind: "video", src: "/videos/ai-beauty.mp4" } },
  { title: "New Drop — AI Try-On", type: "AI Video · Fashion & Apparel", media: { kind: "video", src: "/videos/ai-fashion.mp4" } },
  { title: "3-Click Dashboard Demo", type: "AI Video · High-Tech & SaaS", media: { kind: "video", src: "/videos/ai-saas.mp4" } },
  { title: "Expert Breakdown Series", type: "AI Video · Professional Services", media: { kind: "video", src: "/videos/ai-services.mp4" } },
  { title: "360° Product Spotlight", type: "AI Video · D2C & E-commerce", media: { kind: "video", src: "/videos/ai-d2c.mp4" } },
  { title: "AI-Staged Walkthrough", type: "AI Video · Real Estate", media: { kind: "video", src: "/videos/ai-realestate.mp4" } },
  { title: "Google Ads — Campaign Overview", type: "Paid Media", media: { kind: "image", src: "/images/ad-1.webp" } },
  { title: "Google Ads — Search Performance", type: "Paid Media", media: { kind: "image", src: "/images/ad-2.webp" } },
  { title: "Meta Ads — Campaigns Manager", type: "Paid Media", media: { kind: "image", src: "/images/ad-4.webp" } },
  { title: "Meta Ads — Audience Insights", type: "Paid Media", media: { kind: "image", src: "/images/ad-5.webp" } },
  { title: "Microsoft Ads — Campaign Dashboard", type: "Paid Media", media: { kind: "image", src: "/images/ad-7.webp" } },
  { title: "TikTok Ads — Campaign Performance", type: "Paid Media", media: { kind: "image", src: "/images/ad-9.webp" } },
];
