// Results (metric, channels, category) come from the Inloop Media site.
// The overview / problem / goal / solution narrative is a draft written around those results — review before launch.
export const CASE_STUDIES = [
  {
    slug: "apploft",
    name: "Apploft",
    category: "App · Social + Paid Ads",
    tag: "Performance Marketing",
    headline: "Scaled installs with a social-first paid engine.",
    meta: "Consumer app, India · Social media, paid ads, creative testing",
    metric: { value: 3.2, decimals: 1, suffix: "x", label: "Installs in 60 days" },
    bars: [18, 26, 24, 38, 46, 58, 72, 100],
    media: "/videos/ai-saas.mp4",
    overview:
      "Apploft needed installs that would keep compounding after launch — not a one-off spike from a burst of spend. We built a social-first paid engine that paired always-on content with performance campaigns, so every creative that worked organically could be scaled with paid.",
    problem:
      "Installs were flat and expensive. Ads ran in isolation from the brand's social presence, creative was refreshed rarely, and there was no clear read on which hooks actually drove downloads.",
    goal:
      "Grow installs fast inside a fixed 60-day window, while bringing cost per install down and building a creative system the team could keep running after launch.",
    solution:
      "We set up a weekly creative testing loop — multiple hooks per angle, UGC-style videos alongside polished brand ads — and fed the winners into simplified paid campaigns. Budgets scaled in steady steps only on proven ad sets, with tracking tying every install back to its creative.",
    scope: "Social media, paid ads, creative strategy",
    timeline: "60 days",
  },
  {
    slug: "luxe-apparel",
    name: "Luxe Apparel",
    category: "Fashion · Web + UI/UX + Social",
    tag: "Website & Social",
    headline: "A redesign and social system built to convert.",
    meta: "Fashion & apparel, India · Website redesign, UI/UX, social media",
    metric: { value: 40, prefix: "+", suffix: "%", label: "Conversion rate lift" },
    bars: [30, 32, 31, 34, 52, 60, 66, 74],
    media: "/videos/ai-fashion.mp4",
    overview:
      "Luxe Apparel had a premium product and a store that didn't feel like one. We redesigned the shopping experience around how people actually buy on mobile, and rebuilt their social presence to send warmer, better-qualified traffic into it.",
    problem:
      "Most shoppers landed straight on product pages from social and ads, and those pages were slow to answer the basics — fit, price, delivery and trust. Traffic was there; conversion wasn't.",
    goal:
      "Lift conversion rate without raising acquisition spend, and give the brand a consistent premium look from first scroll to checkout.",
    solution:
      "A redesign and social system built to convert: sharper product pages with photos, video and reviews near add-to-cart, a cleaner checkout, and a social content system — lookbooks and try-on hooks — that matched the new store visually and kept the brand consistent across every touchpoint.",
    scope: "Website redesign, UI/UX, social media",
    timeline: "Redesign + ongoing social",
  },
  {
    slug: "fmcg-health-brand",
    name: "FMCG Health Brand",
    category: "FMCG Health · Influencer + Meta Ads",
    tag: "Influencer & Paid Media",
    headline: "Creator-led demand at profitable ROAS.",
    meta: "FMCG health & wellness, India · Influencer marketing, Meta ads",
    metric: { value: 4.3, decimals: 1, suffix: "x", label: "ROAS in month one" },
    bars: [12, 22, 35, 41, 55, 63, 80, 92],
    media: "/videos/ai-beauty.mp4",
    overview:
      "An FMCG health brand wanted demand that paid for itself from the very first month. We combined creators whose audiences genuinely trusted them with Meta ads that scaled the content that was already converting.",
    problem:
      "Earlier influencer work had chased reach over fit — big follower counts, little trust, and no way to tell which creators actually drove sales.",
    goal:
      "Reach profitable ROAS in month one and build a repeatable creator-led acquisition engine.",
    solution:
      "We shortlisted creators on audience fit, real engagement and past performance, briefed them on the message rather than scripting them, and tracked every creator with unique codes and links. The best-performing creator content was whitelisted and scaled through Meta ads.",
    scope: "Influencer marketing, Meta ads, creative",
    timeline: "Month one",
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
