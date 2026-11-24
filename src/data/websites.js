// Websites Inloop Media designed and built for clients (shown on the Work page), and our own product.
//   img   the first screen;  full  the whole page (scrolls inside the card);  did  what we did on it

export const WEBSITES = [
  { name: "Transform", category: "Performance energy drink · D2C store", url: "https://transform-demo-delta.vercel.app/", img: "/images/websites/transform.webp", full: "/images/websites/full/transform.webp", did: ["UI/UX design", "Development", "D2C store", "Product storytelling"] },
  { name: "House of Rayve", category: "Eyewear · E-commerce", url: "https://house-of-rayve-website.vercel.app/", img: "/images/websites/rayve.webp", full: "/images/websites/full/rayve.webp", did: ["UI/UX design", "Development", "E-commerce", "Try-on experience"] },
  { name: "Monèshrey", category: "Beauty & cosmetics · E-commerce", url: "https://moneshrey-inloop.vercel.app/", img: "/images/websites/monshrey.webp", full: "/images/websites/full/monshrey.webp", did: ["Brand website", "E-commerce", "Shade finder", "Development"] },
  { name: "Shankara Build Pro", category: "Building materials · Corporate & store", url: "https://www.shankarabuildpro.com/", img: "/images/websites/shankara.webp", full: "/images/websites/full/shankara.webp", did: ["Corporate website", "Investor pages", "Online store", "Development"] },
  { name: "Atmosfere Spaces", category: "Interior design & build · Brand site", url: "https://www.atmosfere.in/spaces", img: "/images/websites/atmosfere-spaces.webp", full: "/images/websites/full/atmosfere-spaces.webp", did: ["Brand website", "Project portfolio", "UI/UX design", "Development"] },
  { name: "Atmosfere Hospitality", category: "Hospitality advisory & design · Brand site", url: "https://www.atmosfere.in/hospitality", img: "/images/websites/atmosfere-hospitality.webp", full: "/images/websites/full/atmosfere-hospitality.webp", did: ["Brand website", "Case studies", "UI/UX design", "Development"] },
  { name: "Travel Teasing", category: "Travel & community trips · Booking site", url: "https://www.travelteasing.com/", img: "/images/websites/travelteasing.webp", full: "/images/websites/full/travelteasing.webp", did: ["Website design", "Trip booking", "Search & filters", "Development"] },
  { name: "Summit Calling", category: "Himalayan treks & tours · Booking site", url: "https://www.summitcalling.com/", img: "/images/websites/summitcalling.webp", full: "/images/websites/full/summitcalling.webp", did: ["Website design", "Trek listings", "Booking & enquiries", "Development"] },
  { name: "TwoHiigh", category: "Streetwear · E-commerce", url: "https://twohiigh.com/", img: "/images/websites/twohiigh.webp", full: "/images/websites/full/twohiigh.webp", did: ["E-commerce store", "Drops & collections", "UI/UX design"] },
  { name: "5feet11", category: "Fashion & apparel · E-commerce", url: "https://www.5feet11.com/", img: "/images/websites/5feet11.webp", full: "/images/websites/full/5feet11.webp", did: ["E-commerce store", "Lookbook", "UI/UX design"] },
  { name: "Feminista", category: "Lifestyle brand · E-commerce", url: "https://www.feminista.co.in/", img: "/images/websites/feminista.webp", full: "/images/websites/full/feminista.webp", did: ["E-commerce store", "Brand storytelling", "UI/UX design"] },
];

/** A product we built and run ourselves — shown as its own showcase on the Work page. */
export const PRODUCT = {
  name: "Inloop CRM",
  kicker: "Our SaaS product",
  headline: "One place that tracks everything — from the first enquiry to the final approved post.",
  body: "Most CRMs stop at the sale. Ours runs the whole agency: sales, proposals, content calendars, production, reviews and client sign-off, with every step on record.",
  url: "https://inloop-crm.vercel.app/",
  img: "/images/websites/inloop-crm.webp",
  flow: ["Lead", "Discovery call", "Proposal", "Onboarding", "Content calendar", "Task", "Raw shoot", "Review", "Ready for client", "Approved"],
  modules: [
    {
      tag: "Content calendar",
      title: "Every post, every brand, every month.",
      text: "Set each brand's monthly deliverables, plan every post on a calendar and see at a glance what's approved, with the client, in progress or not assigned yet.",
      points: ["Monthly targets per brand", "Status of every post, one tap away", "Locked calendars once they're signed off"],
      img: "/images/websites/crm-calendar.webp",
    },
    {
      tag: "Brand plans",
      title: "All your clients on one screen.",
      text: "Posts planned against target, assigned to the team and done — for every brand. The ones falling behind float to the top, so nothing slips at month-end.",
      points: ["Planned vs. target for each brand", "Brands behind on posts flagged in red", "One click into any brand's calendar"],
      img: "/images/websites/crm-plans.webp",
    },
    {
      tag: "Tasks & reviews",
      title: "Tasks that can't fall through the cracks.",
      text: "A progress line from to-do to approved. Team leads review, the CBO shares with the client, changes go straight back as revisions — and raw shoots from production land right inside the task.",
      points: ["Reviews, revisions and holds with a reason", "Raw photos and footage from production", "Every file, link and note by version"],
      img: "/images/websites/crm-task.webp",
    },
  ],
  features: [
    { t: "Live updates", d: "Everyone sees changes the moment they happen — no refreshing." },
    { t: "Phone notifications", d: "New tasks, reviews, approvals and raw files ping the right person." },
    { t: "Sales pipeline", d: "Leads, clash-free meeting slots, proposals and follow-ups." },
    { t: "Brand libraries", d: "Logos, fonts, photos and Drive links in folders for every brand." },
    { t: "Roles that fit the team", d: "Admin, CBOs, managers, team leads and makers each see what they need." },
    { t: "Dashboards for everyone", d: "What's late, what needs you and how every brand is doing this month." },
  ],
};

/** "www.atmosfere.in/" → "atmosfere.in" */
export const domainOf = (url) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
