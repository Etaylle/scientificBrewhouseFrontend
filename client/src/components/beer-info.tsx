import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";

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
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-48 bg-muted dark:bg-muted rounded-lg"></div>
              <div className="h-4 bg-muted dark:bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted dark:bg-muted rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
    );
  }

  if (!beer) {
    return (
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              No active beer found
            </p>
          </CardContent>
        </Card>
    );
  }

  return (
      <div className="space-y-6">
        {/* Current Beer Card */}
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              {t("beer.currentBeer")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Beer Image */}
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="16" width="24" height="36" rx="4" fill="#facc15" stroke="#92400e" strokeWidth="2" />
              <g>
                <circle cx="24" cy="14" r="4" fill="#fff6b7">
                  <animate attributeName="cy" values="14;13;14" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="32" cy="12" r="5" fill="#fef3c7">
                  <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="14" r="4" fill="#fff6b7">
                  <animate attributeName="cy" values="14;15;14" dur="1.2s" repeatCount="indefinite" />
                </circle>
              </g>
              <circle cx="28" cy="48" r="1.5" fill="#fff">
                <animateTransform attributeName="transform" type="translate" values="0,0;0,-32" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="50" r="1" fill="#fff">
                <animateTransform attributeName="transform" type="translate" values="0,0;0,-36" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="4s" repeatCount="indefinite" />
              </circle>
              <rect x="20" y="52" width="24" height="4" rx="2" fill="#78350f" />
            </svg>

            {/* Beer Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--chart-1))]">
                  {beer.name}
                </h3>
                <p className="text-sm text-muted-foreground">
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
                <h4 className="font-medium mb-2 text-foreground">
                  {t("beer.description")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {beer.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-foreground">
                  {t("beer.ingredients")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {beer.ingredients.map((ingredient, index) => (
                      <Badge
                          key={index}
                          variant="secondary"
                          className="bg-muted text-foreground"
                      >
                        {ingredient}
                      </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
