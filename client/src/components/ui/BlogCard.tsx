import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { 
  Beer, 
  FlaskConical, 
  Grape, 
  Award, 
  Clock, 
  Eye, 
  User, 
  Calendar, 
  Tag,
  ExternalLink,
  Star
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen(!isOpen);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


const getCategoryIcon = (category: string) => {
  const icons: Record<string, JSX.Element> = {
    Brauprojekt: <Beer className="w-4 h-4" />,
    Universitätsforschung: <FlaskConical className="w-4 h-4" />,
    Lager: <Beer className="w-4 h-4" />,
    IPA: <FlaskConical className="w-4 h-4" />,
    Saison: <Grape className="w-4 h-4" />,
    Weissbier: <Award className="w-4 h-4" />,
  };
  return icons[category] || <Beer className="w-4 h-4" />;
};


  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-800 rounded-2xl overflow-hidden hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden flex-shrink-0" onClick={toggleDialog}>
        <img
  src={post.images?.[0] || "/images/fallback"}
  alt={post.title[language]}
  className="w-full h-full object-cover"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/fallback.jpg";
  }}
/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {post.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500/90 text-yellow-900 border-yellow-400 px-3 py-1">
              <Award className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full">
            {getCategoryIcon(post.category)}
          </div>
        </div>
        
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="outline"
              className="bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
            >
              {post.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 min-h-[3.5rem]">
            {post.title[language]}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col">
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">
            {post.excerpt[language]}
          </p>
          
          {/* Rating for Finished Beers */}
          {post.category === "Fertige Biere" && post.ratings && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(post.ratings!.overall)
                        ? "fill-amber-500 text-amber-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {post.ratings.overall.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({post.ratings.count} {t("blog.rating.reviews")})
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              {post.author} • {formatDate(post.date)}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={toggleDialog}
                size="sm"
                variant="outline"
                className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
              >
                <Eye className="w-3 h-3 mr-1" />
                {t("blog.preview") || "Vorschau"}
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl"
              >
                <Link to={`/blog/${post.slug}`}>
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {t("blog.read") || "Lesen"}
                </Link>
              </Button>
            </div>
          </div>
          
          {(post.tags || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-800">
          {/* Dialog Header with Image */}
          <div className="relative h-64 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500">
            <img
  src={post.images?.[0] || "/images/fallback.jpg"}
  alt={post.title[language]}
  className="w-full h-full object-cover"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/fallback.jpg";
  }}
/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {getCategoryIcon(post.category)}
                  <span className="text-sm font-medium">{post.category}</span>
                </div>
                {post.featured && (
                  <Badge className="bg-yellow-500/90 text-yellow-900 border-yellow-400 px-3 py-1">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                {post.title[language]}
              </h2>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brewing Data Section */}
          {post.brewingData && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-amber-900/20 p-6 border-b border-amber-200 dark:border-amber-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-amber-800 dark:text-amber-200">
                <FlaskConical className="w-5 h-5" />
                {t("blog.brewingData") || "Braudaten"}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: t("blog.originalGravity") || "Stammwürze", value: post.brewingData.originalGravity },
                  { label: t("blog.finalGravity") || "Endvergärung", value: post.brewingData.finalGravity },
                  { label: t("blog.abv") || "Alkohol", value: `${post.brewingData.abv}%` },
                  { label: t("blog.ibu") || "IBU", value: post.brewingData.ibu },
                  { label: t("blog.srm") || "SRM", value: post.brewingData.srm },
                  { label: t("blog.efficiency") || "Effizienz", value: `${post.brewingData.efficiency}%` }
                ].map((item, index) => (
                  <div key={index} className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-1">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-6">
            {/* Tags */}
            {(post.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 px-3 py-1"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-amber-800 dark:prose-headings:text-amber-200 prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-strong:text-amber-700 dark:prose-strong:text-amber-300 mb-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content[language]}
              </ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-amber-200 dark:border-amber-800">
              <Button
                onClick={toggleDialog}
                variant="outline"
                className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
              >
                {t("blog.close") || "Schließen"}
              </Button>
              <Button
                asChild
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Link to={`/blog/${post.slug}`}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("blog.readFull") || "Vollständig lesen"}
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}