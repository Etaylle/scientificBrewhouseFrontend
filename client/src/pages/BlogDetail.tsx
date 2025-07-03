// client/src/components/blog/BlogDetail.tsx
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Tag, Award, FlaskConical } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/types";
import { useParams } from "wouter";
import rehypeRaw from "rehype-raw";
export default function BlogDetail({ post }: { post: BlogPost }) {
  const { t, language } = useLanguage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      Brauprojekt: <FlaskConical className="w-4 h-4" />,
      Universitätsforschung: <FlaskConical className="w-4 h-4" />,
      Lager: <FlaskConical className="w-4 h-4" />,
      IPA: <FlaskConical className="w-4 h-4" />,
      Saison: <FlaskConical className="w-4 h-4" />,
      Weissbier: <FlaskConical className="w-4 h-4" />,
    };
    return icons[category] || <FlaskConical className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          asChild
          variant="outline"
          className="mb-8 group border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all duration-300"
        >
          <Link to="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t("blog.back") || "Back to Blog"}
          </Link>
        </Button>

        <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-800 overflow-hidden">
  <div className="p-6 md:p-12 space-y-6">
    <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-200">{post.title[language]}</h1>
    <div className="text-gray-600 dark:text-gray-300 flex items-center gap-4">
      <span><User className="inline w-4 h-4 mr-1" /> {post.author}</span>
      <span><Calendar className="inline w-4 h-4 mr-1" /> {formatDate(post.date)}</span>
      <span><Clock className="inline w-4 h-4 mr-1" /> {post.readTime}</span>
    </div>

    {post.images && post.images.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {post.images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index}`}
            className="rounded-xl shadow-md"
            onError={(e) => (e.currentTarget.src = "/images/fallback.jpg")}
          />
        ))}
      </div>
    )}

<div className="prose dark:prose-invert max-w-none">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]} // ➕ Damit HTML-Tags im Markdown funktionieren
  >
    {post.content[language]}
  </ReactMarkdown>
</div>


  </div>
</article>
      </div>
    </div>
  );
}
