import { useParams } from "wouter";
import { blogPosts } from "@/components/blogPosts/blogPosts";
import BlogDetail from "@/pages/BlogDetail";
import BrewhouseLayout from "@/components/layout/BrewhouseLayout";

export default function BlogDetailWrapper() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="p-12 text-center text-red-600 font-bold">Blogpost nicht gefunden</div>;
  }

  return (
  <BrewhouseLayout>
    <BlogDetail post={post} />
  </BrewhouseLayout>
)
}