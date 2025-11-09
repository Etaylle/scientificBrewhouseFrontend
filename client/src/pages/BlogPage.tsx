import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/ui/BlogCard";
import { Beer, Award, Search, Filter } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { blogPosts } from "@/components/blogPosts/blogPosts";
import { ScrollToAnchor } from "@/components/ScrollToAnchor";


export default function BlogPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const categories = [
    t("blog.categories.all") || "Alle",
    t("blog.categories.finishedBeers") || "Fertige Biere",
    t("blog.categories.history") || "Geschichte",
    t("blog.categories.research") || "Forschung & Entwicklung", 
    t("blog.categories.beerTypes") || "Biersorten",
    t("blog.categories.events") || "Veranstaltungen",
    t("blog.categories.news") || "Neuigkeiten"
  ];
  useEffect(() => {
    let filtered = blogPosts;
  
    if (selectedCategory !== (t("blog.categories.all") || "Alle")) {
      filtered = filtered.filter((post) => {
        // Map translated category back to original category key
        const categoryMap = {
          [t("blog.categories.finishedBeers") || "Fertige Biere"]: "Fertige Biere",
          [t("blog.categories.history") || "Geschichte"]: "Geschichte",
          [t("blog.categories.research") || "Forschung & Entwicklung"]: "Forschung & Entwicklung",
          [t("blog.categories.beerTypes") || "Biersorten"]: "Biersorten", 
          [t("blog.categories.events") || "Veranstaltungen"]: "Veranstaltungen",
          [t("blog.categories.news") || "Neuigkeiten"]: "Neuigkeiten"
        };
        
        const originalCategory = categoryMap[selectedCategory] || selectedCategory;
        return post.category === originalCategory;
      });
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
  }, [selectedCategory, searchTerm, language, t]);
  
  const getDynamicGridClass = (itemCount: number) => {
    if (itemCount === 1) return "grid-cols-1 justify-items-center max-w-2xl mx-auto";
    if (itemCount === 2) return "grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto";
    if (itemCount === 3) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";
  };

  const getCardWrapper = (itemCount: number) => {
    return "w-full";
  };

  return (
    <>
      <ScrollToAnchor />
      {/* Header mit Logo - aus BrewhouseLayout */}
      <header className="bg-background dark:bg-background relative z-50 drop-shadow shadow-lg transition-colors duration-300">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <a href="/">
                <svg className="h-10 w-auto text-foreground m-0 p-0" fill="currentColor" id="Ebene_1"
                     data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.13 83.05">
                  <title>Scientific Brewhouse Logo</title>
                  <path className="cls-1"
                        d="M79.35,85.25a39.83,39.83,0,0,1-8.5-.92V79.49a43.59,43.59,0,0,0,7.76.88c3,0,5.62-1.2,5.62-4.69,0-3.21-3.11-4.18-5.53-5-5-1.67-8-3.3-8-9.25,0-5.16,3-9.81,11.29-9.81a31.64,31.64,0,0,1,7.16.75v4.74a38.58,38.58,0,0,0-6.09-.51c-2.09,0-5.53.6-5.53,4.37,0,3.06,3.25,4,5.85,4.69l.42.09c4.79,1.4,7.35,3.91,7.35,9.07C91.16,81.72,86.18,85.25,79.35,85.25Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M116.16,84.33a36.91,36.91,0,0,1-8,.92c-9.48,0-14.08-5.76-14.08-16.82s4.6-16.83,14.08-16.83a33.66,33.66,0,0,1,8,1v4.65a37.31,37.31,0,0,0-5.9-.56c-5.58,0-9.11,1.53-9.11,11.67s3.53,11.8,9.11,11.8a37.53,37.53,0,0,0,5.9-.56Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1" d="M119.28,84.7V52.16h6.46V84.7Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M132.06,84.7V52.16h18.26v5H138.56v8.41h8.19v5h-8.19v9.15h12v5Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M170.78,84.7,160.64,59.6H160V84.7h-5.58V52.16h9.39l10.13,24.91h.6V52.16h5.58V84.7Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1" d="M197.18,57.32V84.7h-6.51V57.32h-7.86V52.16H205v5.16Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1" d="M207.77,84.7V52.16h6.46V84.7Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1" d="M227.06,57.37v9h8.6V71.5h-8.6V84.7h-6.5V52.16H239v5.21Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1" d="M241.61,84.7V52.16h6.46V84.7Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M275.07,84.33a36.89,36.89,0,0,1-7.94.92c-9.49,0-14.09-5.76-14.09-16.82s4.6-16.83,14.09-16.83a33.63,33.63,0,0,1,7.94,1v4.65a37.31,37.31,0,0,0-5.9-.56c-5.58,0-9.11,1.53-9.11,11.67s3.53,11.8,9.11,11.8a37.53,37.53,0,0,0,5.9-.56Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M84.23,125.61H72V93.08H83.35c3.07,0,9.76,0,9.76,8.5,0,4.84-3.63,6.56-6,7v.79l.37.1c2.09.41,6.41,1.3,6.41,7.53C93.85,124.64,88,125.61,84.23,125.61Zm-2-28.16H78.47v9.34h3.9c.93,0,3.77-.05,3.81-4.65S83.44,97.45,82.28,97.45Zm.18,13.9h-4v9.8H83c3.62,0,3.76-3.2,3.76-4.88C86.74,112,84.37,111.35,82.46,111.35Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M114.49,125.61l-5.44-12.36h-3.62v12.36H99.06V93.08H109.7c3.63,0,10.69.56,10.69,9.2,0,3.77-.93,7.62-4.92,9l-.28.56,6.55,13.8Zm-5.49-28h-3.57v11h3.71c.93,0,4.33,0,4.33-5.49S110.26,97.59,109,97.59Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M125.09,125.61V93.08h18.26v5H131.59v8.41h8.18v5h-8.18v9.16h12v5Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M177.61,125.61h-8l-4.78-23.7h-.7l-4.51,23.7h-8.18l-7.2-32.53h7l4.1,24.82H156l4.88-24.82h8.14l4.6,24.82h.69l4.47-24.82h5.9Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M204.38,125.61V111.44H194.29v14.17h-6.41V93.08h6.41v13.25h10.09V93.08h6.46v32.53Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M229.39,126.31c-8.88,0-13.58-5.72-13.58-17s4.7-17,13.58-17S243,98.1,243,109.35,238.26,126.31,229.39,126.31Zm0-28.95c-5.48,0-6.6,5.29-6.6,12s1.12,11.9,6.6,11.9S236,116,236,109.3,234.87,97.36,229.34,97.36Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M259.13,126.13c-7.9,0-11.15-3.26-11.15-10.88V93.08h6.5v22.4c0,3.44.47,5.67,4.7,5.67s4.6-2.23,4.6-5.67V93.08h6v22.17C269.82,123.06,267.31,126.13,259.13,126.13Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M283.35,126.17a39,39,0,0,1-8.51-.93v-4.83a44.58,44.58,0,0,0,7.76.88c3,0,5.63-1.21,5.63-4.69,0-3.21-3.12-4.19-5.53-5-5-1.68-8-3.3-8-9.25,0-5.16,3-9.81,11.3-9.81a31.61,31.61,0,0,1,7.15.75V98a38.31,38.31,0,0,0-6.08-.51c-2.1,0-5.53.6-5.53,4.36,0,3.07,3.25,4,5.85,4.7l.42.09c4.79,1.4,7.34,3.91,7.34,9.06C295.15,122.64,290.18,126.17,283.35,126.17Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1" d="M299.48,125.61V93.08h18.26v5H306v8.41h8.18v5H306v9.16h12v5Z"
                        transform="translate(-70.71 -43.26)"/>
                  <path className="cls-1"
                        d="M379.46,51.2c-.29-4.91-10.55-6.47-21.47-6.88-.1,0-.22-.4-.22-.4l1.14-.07,0-.59h-8l0,.59,1.14.07s-.12.39-.23.4c-10.91.41-21.18,2-21.46,6.88,0,0-3,.66-3.38,1.7V87.8l1.47,1.94,1.58,2.08v33.8a8,8,0,0,0,3,.44,11.77,11.77,0,0,0,3.14-.47l0-25.77,2.19,2.89,11.5,15.13a7.35,7.35,0,0,0,10.31,0l11.49-15.13,2.33-3.06,0,25.95a12.34,12.34,0,0,0,3.19.46,7.27,7.27,0,0,0,2.82-.37V91.76l1.53-2,1.47-1.94V52.9C382.5,51.86,379.46,51.2,379.46,51.2Zm-2.63,34.58-5.58,7.35-4.52,6-11.87,14.84L343,99.08l-4.52-6-5.58-7.35v-29l3.1-.67.2-3.42c1.26-.64,5.11-2,15.77-2.38h5.8c10.66.41,14.51,1.74,15.77,2.38l.2,3.42,3.1.67Z"
                        transform="translate(-70.71 -43.26)"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900 min-h-screen">
        {/* Hero Section - Modern & Elegant */}
        <div className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white pt-32 pb-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-black/10 z-10"></div>
          <div className="absolute inset-0 opacity-20 z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container mx-auto px-6 text-center relative z-20 max-w-7xl">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-2xl">
              <Beer className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              {t("blog.title") || "Scientific Brewhouse Blog"}
            </h1>
            <p className="text-xl md:text-2xl text-amber-50 max-w-4xl mx-auto leading-relaxed font-light">
              {t("blog.description") || "Discover our brewing projects, scientific insights, and the art of beer making"}
            </p>
            
            {/* Stats Bar */}
            <div className="mt-12 flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{blogPosts.length}</div>
                <div className="text-amber-100 text-sm font-medium mt-1">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{blogPosts.filter(p => p.category === "Fertige Biere").length}</div>
                <div className="text-amber-100 text-sm font-medium mt-1">Finished Beers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{categories.length - 1}</div>
                <div className="text-amber-100 text-sm font-medium mt-1">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls - Enhanced */}
        <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border-y border-amber-200 dark:border-amber-800 py-8 sticky top-0 z-30">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Enhanced Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-amber-500 w-6 h-6" />
                <Input
                  placeholder={t("blog.searchPlaceholder") || "Search beers, projects, research..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-6 h-14 bg-white dark:bg-gray-700 border-2 border-amber-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 text-lg shadow-lg transition-all"
                />
              </div>
              
              {/* Category Pills */}
              <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Filter className="w-5 h-5" />
                  <span className="font-medium text-sm">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg border-0 px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105"
                          : "border-2 border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/30 px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105"
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

        {/* Main Content - Wider Layout */}
        <div className="container mx-auto px-6 py-16 max-w-[1800px]">
          {/* Featured Posts - Enhanced Grid */}
          {selectedCategory === "Alle" && filteredPosts.some((post) => post.featured) && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {t("blog.featured") || "Featured Brewing Projects"}
                </h2>
              </div>
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

          {/* All Posts - Enhanced Grid */}
          <div>
            <h2 className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-200">
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

          {/* No Posts Found - Enhanced */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-24 bg-white/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full mb-8 shadow-xl">
                <Beer className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {t("blog.noPosts") || "No Brewing Projects Found"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xl max-w-md mx-auto">
                {t("blog.noPostsMessage") || "Try different search terms or categories."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
}