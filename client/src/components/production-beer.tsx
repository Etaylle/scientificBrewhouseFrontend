import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import wienerLagerImg from "@/components/img/Wiener-Lager.jpg";
import { Loader2, Beer, Droplets, Gauge, ThermometerSun } from "lucide-react";

export function ProductionBeer() {
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
    status?: "production" | "finished";
    brewDate?: string;
    productionDay?: number;
    totalDays?: number;
  };

  const { data: beer, isLoading, isError } = useQuery<Beer>({
    queryKey: ["active-beer"],
    queryFn: async () => {
      const res = await fetch("/api/beer/active");
      if (!res.ok) throw new Error("Fehler beim Laden des Bieres");
      return res.json();
    },
    retry: false,
    staleTime: 30000,
  });

  // Platzhalter-Bier wenn keine Daten verfügbar sind
  const placeholderBeer: Beer = {
    name: "Wiener Lager",
    type: "Vienna Lager",
    abv: 5.2,
    ibu: 22,
    og: 1.052,
    fg: 1.012,
    description: "Ein klassisches Wiener Lager mit malzigem Charakter und ausgewogener Bitterkeit. Kupfergoldene Farbe mit cremigem Schaum.",
    ingredients: ["Wiener Malz", "Hopfen Saaz", "Lagerhefe", "Wasser"],
    imageUrl: wienerLagerImg,
    status: "production",
    brewDate: new Date().toISOString().split("T")[0],
    productionDay: 8,
    totalDays: 21,
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4 animate-pulse">
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  // Bei Fehler oder fehlenden Daten: Platzhalter verwenden
  const displayBeer = beer || placeholderBeer;
  const isPlaceholder = !beer || isError;
  const isProduction = displayBeer.status === "production";

  // Berechne Fortschritt
  const progress = displayBeer.productionDay && displayBeer.totalDays 
    ? (displayBeer.productionDay / displayBeer.totalDays) * 100 
    : 0;

  return (
    <Card className={`${isPlaceholder ? "opacity-95" : ""} overflow-hidden border-0 bg-gradient-to-br from-card/95 to-card shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}>
      <CardHeader className="pb-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              {t("beer.currentBeer") || "Aktuelles Bier"}
            </CardTitle>
            <p className="text-xs text-muted-foreground">Live Produktionsstatus</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {isPlaceholder && (
              <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-600 dark:text-amber-400">
                Beispieldaten
              </Badge>
            )}
            {isProduction ? (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center gap-1.5 animate-pulse shadow-lg shadow-green-500/50 px-3 py-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                In Produktion
              </Badge>
            ) : (
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center gap-1.5 shadow-lg shadow-blue-500/50 px-3 py-1">
                <Beer className="w-3.5 h-3.5" />
                Fertig
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Bild */}
        <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10 group">
          {displayBeer.imageUrl ? (
            <>
              <img
                src={displayBeer.imageUrl}
                alt={displayBeer.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {isProduction && displayBeer.productionDay && displayBeer.totalDays && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-md p-4">
                  <div className="flex justify-between items-center text-white text-sm font-medium mb-2">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Tag {displayBeer.productionDay} von {displayBeer.totalDays}
                    </span>
                    <span className="text-green-400 font-bold">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 h-2.5 rounded-full transition-all duration-500 shadow-lg shadow-green-500/50"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-muted-foreground">
              {t("beer.noImage") ?? "Kein Bild verfügbar"}
            </div>
          )}
        </div>

        {/* Bier Info */}
        <div className="space-y-2 px-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            {displayBeer.name}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">{displayBeer.type}</p>
        </div>

        {/* Brauwerte als Grid */}
        <div className="grid grid-cols-2 gap-3 px-1">
          <div className="flex items-center gap-3 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-3 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <ThermometerSun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground font-medium">{t("beer.abv") || "Alkohol"}</div>
              <div className="text-base font-bold text-foreground">{displayBeer.abv}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-3 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Droplets className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground font-medium">{t("beer.ibu") || "IBU"}</div>
              <div className="text-base font-bold text-foreground">{displayBeer.ibu}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Gauge className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground font-medium">{t("beer.og") || "OG"}</div>
              <div className="text-base font-bold text-foreground">{displayBeer.og}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Gauge className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground font-medium">{t("beer.fg") || "FG"}</div>
              <div className="text-base font-bold text-foreground">{displayBeer.fg}</div>
            </div>
          </div>
        </div>

        {/* Beschreibung */}
        <div className="space-y-3 px-1">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
            {t("beer.description") || "Beschreibung"}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed pl-3">
            {displayBeer.description}
          </p>
        </div>

        {/* Zutaten */}
        <div className="space-y-3 px-1">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
            {t("beer.ingredients") || "Zutaten"}
          </h4>
          <div className="flex flex-wrap gap-2 pl-3">
            {displayBeer.ingredients.map((ingredient, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gradient-to-r from-muted to-muted/50 text-foreground border border-border/50 hover:border-amber-500/50 transition-all duration-200 px-3 py-1"
              >
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>

        {/* Braudatum */}
        {displayBeer.brewDate && (
          <div className="text-xs text-muted-foreground pt-3 mt-2 border-t border-border/50 flex items-center gap-2 px-1">
            <Beer className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium">Braudatum:</span>
            <span>{new Date(displayBeer.brewDate).toLocaleDateString("de-DE")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
