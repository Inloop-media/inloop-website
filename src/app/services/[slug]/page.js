import { notFound } from "next/navigation";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { SERVICES, getService } from "@/data/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: `${s.tag} | Inloop Media`, description: s.description };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  if (!getService(slug)) notFound();
  return <ServiceDetailClient slug={slug} />;
}
