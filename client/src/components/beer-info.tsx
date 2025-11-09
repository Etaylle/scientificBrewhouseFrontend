import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import wienerLagerImg from "@/components/img/Wiener-Lager.jpg";
import { Loader2 } from "lucide-react";

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
  };

  const { data: beer, isLoading, isError } = useQuery<Beer>({
    queryKey: ["active-beer"],
    queryFn: async () => {
      const res = await fetch("/api/beer/active");
      if (!res.ok) throw new Error("Fehler beim Laden des Bieres");
      return res.json();
    },
  });

  if (isLoading) {
    return (
        <Card>
          <CardContent className="pt-6 space-y-4 animate-pulse">
            <div className="h-48 bg-muted rounded-lg"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardContent>
        </Card>
    );
  }

  if (isError) {
    return (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-red-500">
              {t("beer.loadError")}
            </p>
          </CardContent>
        </Card>
    );
  }

  // Platzhalter-Bier wenn keine Daten verfügbar sind
  const placeholderBeer: Beer = {
    name: "Beispiel Craft Beer",
    type: "India Pale Ale (IPA)",
    abv: 6.5,
    ibu: 45,
    og: 1.065,
    fg: 1.012,
    description: "Ein ausgewogenes Craft Beer mit fruchtigen Hopfennoten und malziger Süße. Perfekt für jeden Bierliebhaber.",
    ingredients: ["Wasser", "Gerstenmalz", "Hopfen", "Hefe"],
    imageUrl: wienerLagerImg
  };

  const displayBeer = beer || placeholderBeer;
  const isPlaceholder = !beer;

  return (
      <Card className={isPlaceholder ? "opacity-75" : ""}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            <div className="flex items-center justify-between">
              <span>{t("beer.currentBeer")}</span>
              <div className="flex items-center gap-2">
                {isPlaceholder && (
                  <Badge variant="outline" className="text-xs">
                    Beispieldaten
                  </Badge>
                )}
                <Badge className="bg-green-500 text-white flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Aktuell in Produktion
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Obere Flexbox: Infos links, Bild rechts */}
          <div className="flex flex-row gap-6 items-stretch">
            <div className="flex-[2] space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-[hsl(var(--chart-1))]">
                  {displayBeer.name}
                </h3>
                <p className="text-sm text-muted-foreground">{displayBeer.type}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.abv")}</span>
                  <span>{displayBeer.abv}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.ibu")}</span>
                  <span>{displayBeer.ibu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.og")}</span>
                  <span>{displayBeer.og}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.fg")}</span>
                  <span>{displayBeer.fg}</span>
                </div>
              </div>
            </div>

            {displayBeer.imageUrl ? (
                <div className="flex-[1] flex">
                  <img
                      src={displayBeer.imageUrl}
                      alt={displayBeer.name}
                      className="w-full h-full object-cover"
                  />
                </div>
            ) : (
                <div className="flex-1 bg-muted rounded-lg flex items-center justify-center text-muted-foreground max-h-96">
                  {t("beer.noImage") ?? "Kein Bild verfügbar"}
                </div>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-2 text-foreground">{t("beer.description")}</h4>
            <p className="text-sm text-muted-foreground">{displayBeer.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2 text-foreground">{t("beer.ingredients")}</h4>
            <div className="flex flex-wrap gap-2">
              {displayBeer.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="bg-muted text-foreground">
                    {ingredient}
                  </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
