import { notFound } from "next/navigation";
import CaseStudyClient from "@/components/CaseStudyClient";
import { CASE_STUDIES, getCaseStudy } from "@/data/caseStudies";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return { title: `${c.name} | Inloop Media`, description: c.headline };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  return <CaseStudyClient slug={slug} />;
}
