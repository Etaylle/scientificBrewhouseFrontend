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
import { BeerRatingDisplay } from "@/components/beer-rating-display";
import BierImage from "@/components/img/Bier.png";
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

  // Für "Fertige Biere" aus dem normalen Container ausbrechen
  const isFinishedBeer = post.category === "Fertige Biere";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900">
      {/* Back Button - immer im normalen Container */}
      <div className={isFinishedBeer ? "max-w-7xl mx-auto px-4 py-8" : ""}>
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
      </div>

      {/* "Fertige Biere" - EXTRA BREITES LAYOUT (2x so breit wie normal) */}
      {isFinishedBeer ? (
        <div className="max-w-[1800px] mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-0 items-stretch">
            {/* Linke Spalte - Gelber Foam-Hintergrund (GENAU SO HOCH wie Content-Spalte) */}
            <div className="relative bg-[#F7DC6F] rounded-l-2xl shadow-2xl overflow-hidden">
              {/* Foam Bubbles Animation - über die GESAMTE Höhe */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Multiple foam bubbles with different sizes and delays */}
                <div className="foam-bubble" style={{ left: '15%', width: '30px', height: '30px', animationDelay: '0s', animationDuration: '5s' }}></div>
                <div className="foam-bubble" style={{ left: '35%', width: '20px', height: '20px', animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
                <div className="foam-bubble" style={{ left: '55%', width: '25px', height: '25px', animationDelay: '0.8s', animationDuration: '5.5s' }}></div>
                <div className="foam-bubble" style={{ left: '75%', width: '18px', height: '18px', animationDelay: '2s', animationDuration: '4s' }}></div>
                <div className="foam-bubble" style={{ left: '85%', width: '22px', height: '22px', animationDelay: '1s', animationDuration: '4.8s' }}></div>
                <div className="foam-bubble" style={{ left: '10%', width: '28px', height: '28px', animationDelay: '2.5s', animationDuration: '5.2s' }}></div>
                <div className="foam-bubble" style={{ left: '45%', width: '24px', height: '24px', animationDelay: '1.2s', animationDuration: '4.3s' }}></div>
                <div className="foam-bubble" style={{ left: '65%', width: '26px', height: '26px', animationDelay: '3s', animationDuration: '5s' }}></div>
                <div className="foam-bubble" style={{ left: '25%', width: '20px', height: '20px', animationDelay: '0.5s', animationDuration: '4.7s' }}></div>
                <div className="foam-bubble" style={{ left: '90%', width: '23px', height: '23px', animationDelay: '2.8s', animationDuration: '4.5s' }}></div>
              </div>
              
              {/* Beer Bottle Image - Fixed position, folgt dem Scroll im Viewport */}
              <div className="h-full min-h-[600px]">
                <div className="fixed top-1/2 -translate-y-1/2 w-[450px] flex items-center justify-center p-12 pointer-events-none">
                  <img
                    src={BierImage}
                    alt={post.title[language]}
                    className="w-full h-auto max-h-[600px] object-contain drop-shadow-2xl pointer-events-auto"
                  />
                </div>
              </div>
            </div>

            {/* Rechte Spalte - Content (behält normale Breite, wird NICHT schmaler) */}
            <article className="bg-white dark:bg-gray-800 rounded-r-2xl shadow-2xl border-l-0 border border-amber-200 dark:border-amber-800 overflow-hidden">
              <div className="p-6 md:p-12 space-y-6">
                <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-200">{post.title[language]}</h1>
                <div className="text-gray-600 dark:text-gray-300 flex items-center gap-4 flex-wrap">
                  <span><User className="inline w-4 h-4 mr-1" /> {post.author}</span>
                  <span><Calendar className="inline w-4 h-4 mr-1" /> {formatDate(post.date)}</span>
                  <span><Clock className="inline w-4 h-4 mr-1" /> {post.readTime}</span>
                </div>

                {/* Brewing Data Info */}
                {post.brewingData && (
                  <div className="grid grid-cols-3 gap-4 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {post.brewingData.abv}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Alcohol
                      </div>
                    </div>
                    <div className="text-center border-l-2 border-r-2 border-amber-200 dark:border-amber-800">
                      <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {post.brewingData.ibu}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        IBU
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {post.brewingData.srm}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        SRM
                      </div>
                    </div>
                  </div>
                )}

                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]} 
                  >
                    {post.content[language]}
                  </ReactMarkdown>
                </div>

                {/* Rating Display for Finished Beers */}
                {post.ratings && (
                  <div className="mt-8">
                    <BeerRatingDisplay post={post} />
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      ) : (
        /* Standard Layout für andere Kategorien - bleibt UNVERÄNDERT */
        <div>
          <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-amber-200 dark:border-amber-800 overflow-hidden">
            <div className="p-6 md:p-12 space-y-6">
              <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-200">{post.title[language]}</h1>
              <div className="text-gray-600 dark:text-gray-300 flex items-center gap-4">
                <span><User className="inline w-4 h-4 mr-1" /> {post.author}</span>
                <span><Calendar className="inline w-4 h-4 mr-1" /> {formatDate(post.date)}</span>
                <span><Clock className="inline w-4 h-4 mr-1" /> {post.readTime}</span>
              </div>

              {post.images && post.images.length > 0 && (
                <div className="w-full">
                  <img
                    src={post.images[0]}  
                    alt={post.title[language] || "Blog Post Image"}
                    className="w-full h-auto rounded-xl shadow-md object-cover"
                    style={{ maxHeight: '500px' }}  
                    onError={(e) => (e.currentTarget.src = "/images/fallback.jpg")}
                  />
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]} 
                >
                  {post.content[language]}
                </ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Foam Animation CSS - Exactly like BeerTasting.com */}
      <style>{`
        @keyframes foamRise {
          0% {
            bottom: -10%;
            opacity: 0;
            transform: translateX(0) scale(0.5);
          }
          10% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(15px) scale(1.3);
          }
        }

        .foam-bubble {
          position: absolute;
          background: radial-gradient(circle at 35% 35%, 
            rgba(255, 255, 255, 0.95), 
            rgba(255, 255, 255, 0.7) 40%,
            rgba(255, 255, 255, 0.4) 70%,
            transparent
          );
          border-radius: 50%;
          animation: foamRise linear infinite;
          filter: blur(1px);
          box-shadow: 
            0 0 8px rgba(255, 255, 255, 0.6),
            inset -2px -2px 6px rgba(255, 255, 255, 0.8),
            inset 2px 2px 6px rgba(0, 0, 0, 0.1);
        }

        .foam-bubble::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 20%;
          width: 35%;
          height: 35%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
          border-radius: 50%;
          filter: blur(2px);
        }

        .foam-bubble::after {
          content: '';
          position: absolute;
          bottom: 20%;
          right: 15%;
          width: 25%;
          height: 25%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.7), transparent);
          border-radius: 50%;
          filter: blur(1px);
        }
      `}</style>
    </div>
  );
}
