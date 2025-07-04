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
  };

  const { data: beer, isLoading, isError } = useQuery<Beer>({
    queryKey: ["active-beer"],
    queryFn: async () => {
      const res = await fetch("http://10.123.26.22/api/beer/active");
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

  if (!beer) {
    return (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">
              {t("beer.noActiveBeer")}
            </p>
          </CardContent>
        </Card>
    );
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            {t("beer.currentBeer")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Obere Flexbox: Infos links, Bild rechts */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Linker Bereich: Text-Infos */}
            <div className="flex-1 space-y-4">
              {/* Beer Name & Type */}
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-[hsl(var(--chart-1))]">
                  {beer.name}
                </h3>
                <p className="text-sm text-muted-foreground">{beer.type}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.abv")}</span>
                  <span>{beer.abv}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.ibu")}</span>
                  <span>{beer.ibu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.og")}</span>
                  <span>{beer.og}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t("beer.fg")}</span>
                  <span>{beer.fg}</span>
                </div>
              </div>
            </div>

            {/* Rechter Bereich: Bild */}
            {beer.imageUrl ? (
                <div className="flex-1">
                  <img
                      src={beer.imageUrl}
                      alt={beer.name}
                      className="w-full h-full max-h-96 object-cover rounded-lg shadow"
                  />
                </div>
            ) : (
                <div className="flex-1 bg-muted rounded-lg flex items-center justify-center text-muted-foreground max-h-96">
                  {t("beer.noImage") ?? "Kein Bild verfügbar"}
                </div>
            )}
          </div>

          {/* Beschreibung: Volle Breite */}
          <div>
            <h4 className="font-medium mb-2 text-foreground">{t("beer.description")}</h4>
            <p className="text-sm text-muted-foreground">{beer.description}</p>
          </div>

          {/* Ingredients: Volle Breite */}
          <div>
            <h4 className="font-medium mb-2 text-foreground">{t("beer.ingredients")}</h4>
            <div className="flex flex-wrap gap-2">
              {beer.ingredients.map((ingredient, index) => (
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
