import { notFound } from "next/navigation";
import PostClient from "@/components/PostClient";
import { POSTS, getPost } from "@/data/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { title: `${p.title} | Inloop Media`, description: p.excerpt };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();
  return <PostClient slug={slug} />;
}
