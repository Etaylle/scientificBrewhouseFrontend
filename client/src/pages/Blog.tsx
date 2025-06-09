import { blogPosts } from "@/components/blogPosts/blogPosts";
import { BlogCard } from "@/components/ui/BlogCard";
import { useLanguage } from "@/components/language-provider";

export default function BlogPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        {t("blog.title") ?? "Bier Blog"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
