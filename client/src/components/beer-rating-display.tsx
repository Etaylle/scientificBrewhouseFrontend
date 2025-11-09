import { Star, Eye, Grape, Droplet, Heart } from "lucide-react";
import { useLanguage } from "./language-provider";
import { BlogPost } from "./blogPosts/blogPosts";

interface BeerRatingDisplayProps {
  post: BlogPost;
}

export function BeerRatingDisplay({ post }: BeerRatingDisplayProps) {
  const { t, language } = useLanguage();

  if (!post.ratings) return null;

  const { overall, count, categories, distribution } = post.ratings;

  const ratingCategories = [
    {
      key: "appearance",
      labelDe: "Aussehen",
      labelEn: "Appearance",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: language === "de" ? "Farbe, Klarheit, Schaum" : "Color, clarity, foam"
    },
    {
      key: "aroma",
      labelDe: "Geruch",
      labelEn: "Aroma",
      icon: Grape,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: language === "de" ? "Hopfen, Malz, Frucht" : "Hops, malt, fruit"
    },
    {
      key: "taste",
      labelDe: "Geschmack",
      labelEn: "Taste",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      description: language === "de" ? "Geschmacksprofil" : "Flavor profile"
    },
    {
      key: "mouthfeel",
      labelDe: "Mundgefühl",
      labelEn: "Mouthfeel",
      icon: Droplet,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      description: language === "de" ? "Körper, Kohlensäure" : "Body, carbonation"
    },
    {
      key: "overall",
      labelDe: "Gesamt",
      labelEn: "Overall",
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      description: language === "de" ? "Gesamteindruck" : "Overall impression"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Rating Card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-8 rounded-2xl shadow-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {language === "de" ? "Gesamtbewertung" : "Overall Rating"}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 ${
                    star <= Math.round(overall)
                      ? "fill-white text-white"
                      : "text-white/40"
                  }`}
                />
              ))}
            </div>
            <p className="text-white/90 text-lg">
              {count} {language === "de" ? "Bewertungen" : "reviews"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-7xl font-bold leading-none">{overall.toFixed(1)}</div>
            <div className="text-xl text-white/90 mt-2">
              {language === "de" ? "von 5.0" : "out of 5.0"}
            </div>
          </div>
        </div>
      </div>

      {/* Category Ratings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {language === "de" ? "Bewertungskategorien" : "Rating Categories"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ratingCategories.map((category) => {
            const Icon = category.icon;
            const score = categories[category.key as keyof typeof categories];
            const percentage = (score / 5) * 100;

            return (
              <div
                key={category.key}
                className={`${category.bgColor} p-4 rounded-xl border-2 border-transparent hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`${category.color} bg-white dark:bg-gray-900 p-2 rounded-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">
                        {language === "de" ? category.labelDe : category.labelEn}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {score.toFixed(1)}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Stars */}
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(score)
                          ? `fill-amber-500 text-amber-500`
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {language === "de" ? "Bewertungsverteilung" : "Rating Distribution"}
        </h3>
        
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const ratingCount = distribution[rating as keyof typeof distribution];
            const percentage = count > 0 ? (ratingCount / count) * 100 : 0;

            return (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-24">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-4">
                    {rating}
                  </span>
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                
                <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-500 flex items-center justify-end pr-3"
                    style={{ width: `${percentage}%` }}
                  >
                    {percentage > 15 && (
                      <span className="text-xs font-bold text-white drop-shadow">
                        {percentage.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
                
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-12 text-right">
                  {ratingCount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
