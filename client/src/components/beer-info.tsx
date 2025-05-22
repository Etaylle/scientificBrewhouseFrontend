import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/components/language-provider";
import { Clock, Beaker, TrendingUp, Gauge } from "lucide-react";

export function BeerInfo() {
  const { t } = useLanguage();
  type Beer = {
    name: string;
    type: string;
    abv: number;
    ibu: number;
    og: number;
    fg: number;
    description: string;
    ingredients: string[];
    imageUrl: string;
    brewStartTime: string;
    brewStage: "mashing" | "hopBoiling" | "fermentation" | "conditioning";
    brewProgress: number;
  };

  const { data: beer, isLoading } = useQuery<Beer>({
    queryKey: ["active-beer"],
    queryFn: async () => {
      const res = await fetch("/api/beer/active");
      if (!res.ok) throw new Error("Fehler beim Laden des Bieres");
      return res.json();
    },
  });


  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!beer) {
    return (
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <p className="text-slate-600 dark:text-slate-400 text-center">
            No active beer found
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - startTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'mashing': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'hopBoiling': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'fermentation': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'conditioning': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Beer Card */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t("beer.currentBeer")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Beer Image */}

            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="16" width="24" height="36" rx="4" fill="#facc15" stroke="#92400e" stroke-width="2"/>
              <g>
                <circle cx="24" cy="14" r="4" fill="#fff6b7">
                  <animate attributeName="cy" values="14;13;14" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="32" cy="12" r="5" fill="#fef3c7">
                  <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="40" cy="14" r="4" fill="#fff6b7">
                  <animate attributeName="cy" values="14;15;14" dur="1.2s" repeatCount="indefinite"/>
                </circle>
              </g>
              <circle cx="28" cy="48" r="1.5" fill="#fff">
                <animateTransform attributeName="transform" type="translate" values="0,0;0,-32" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="36" cy="50" r="1" fill="#fff">
                <animateTransform attributeName="transform" type="translate" values="0,0;0,-36" dur="4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0" dur="4s" repeatCount="indefinite"/>
              </circle>
              <rect x="20" y="52" width="24" height="4" rx="2" fill="#78350f"/>
            </svg>

          {/* Beer Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                {beer.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {beer.type}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">ABV:</span>
                <span>{beer.abv}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">IBU:</span>
                <span>{beer.ibu}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">OG:</span>
                <span>{beer.og}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">FG:</span>
                <span>{beer.fg}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-slate-900 dark:text-slate-100">
                {t("beer.description")}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {beer.description}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-slate-900 dark:text-slate-100">
                {t("beer.ingredients")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {beer.ingredients.map((ingredient, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brewing Process Status */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Beaker className="w-5 h-5" />
            {t("process.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t("process.started")}:
              </span>
              <span className="font-medium">
                {beer.brewStartTime ? new Date(beer.brewStartTime).toLocaleString() : '-'}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t("process.duration")}:
              </span>
              <span className="font-medium">
                {beer.brewStartTime ? formatDuration(new Date(beer.brewStartTime)) : '-'}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                {t("process.stage")}:
              </span>
              <Badge className={getStageColor(beer.brewStage || '')}>
                {beer.brewStage ? t(`stage.${beer.brewStage}` as any) : '-'}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>{t("process.completion")}:</span>
              <span className="font-medium">{beer.brewProgress}%</span>
            </div>

            <div className="space-y-2">
              <Progress 
                value={beer.brewProgress || 0} 
                className="w-full h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
