import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrewhouseLayout from "@/components/layout/BrewhouseLayout";
import { BlogCard } from "@/components/ui/BlogCard"; // Import your BlogCard component
import { Beer, Award, Search, Filter } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { blogPosts } from "@/components/blogPosts/blogPosts";
import { ScrollToAnchor } from "@/components/ScrollToAnchor";
const categories = ["Alle", "Brauprojekt", "Universitätsforschung", "Lager", "IPA", "Saison", "Weissbier"];
export default function BlogPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    let filtered = blogPosts;

    if (selectedCategory !== "Alle") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm, language]);

  const getDynamicGridClass = (itemCount: number) => {
    if (itemCount === 1) return "grid-cols-1 justify-items-center";
    if (itemCount === 2) return "grid-cols-1 md:grid-cols-2 justify-items-center";
    if (itemCount === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center";
  };

  const getCardWrapper = (itemCount: number) => {
    if (itemCount <= 2) return "w-full max-w-md";
    if (itemCount === 3) return "w-full max-w-sm";
    return "w-full max-w-sm";
  };

  return (
    
    <BrewhouseLayout>
    <>
        <ScrollToAnchor />
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900">
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-600 to-amber-900 text-white pt-24 pb-20">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-4">
              <Beer className="w-12 h-12 md:w-16 md:h-16" />
              {t("blog.title") || "Scientific Brewhouse Blog"}
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              {t("blog.description") || "Discover our brewing projects, scientific insights, and the art of beer making"}
            </p>
          </div>
        </div>

        {/* Search and Filter Controls - Full Width */}
        <div className="w-full bg-white dark:bg-gray-800 shadow-xl border-t border-b border-amber-200 dark:border-amber-800 py-8">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={t("blog.searchPlaceholder") || "Search brewing projects..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
                          : "border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/50"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Featured Posts */}
          {selectedCategory === "Alle" && filteredPosts.some((post) => post.featured) && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200 flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-500" />
                {t("blog.featured") || "Featured Brewing Projects"}
              </h2>
              <div className={`grid gap-8 ${getDynamicGridClass(filteredPosts.filter((post) => post.featured).length)}`}>
                {filteredPosts
                  .filter((post) => post.featured)
                  .map((post) => (
                    <div key={post.id} className={getCardWrapper(filteredPosts.filter((post) => post.featured).length)}>
                      <BlogCard post={post} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
              {selectedCategory === "Alle"
                ? t("blog.allPosts") || "All Brewing Projects"
                : `${selectedCategory} ${t("blog.projects") || "Projects"}`}
            </h2>
            <div className={`grid gap-8 ${getDynamicGridClass(filteredPosts.length)}`}>
              {filteredPosts.map((post) => (
                <div key={post.id} className={getCardWrapper(filteredPosts.length)}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* No Posts Found */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <Beer className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                {t("blog.noPosts") || "No Brewing Projects Found"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t("blog.noPostsMessage") || "Try different search terms or categories."}
              </p>
            </div>
          )}
        </div>
      </div>
         </>
    </BrewhouseLayout>
  );
  
}