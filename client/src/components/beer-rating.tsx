import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Star } from "lucide-react";

interface BeerRatingData {
  biername: string;
  anzahl: number;
  durchschnitt: string;
}
const API_BASE_URL = "/api";
export function BeerRating() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const { data: activeBeer } = useQuery({
    queryKey: [`${API_BASE_URL}/beer/active`],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/beer/active`);
      if (!res.ok) throw new Error("Fehler beim Laden des aktiven Bieres");
      return res.json();
    }
  });


  const { data: ratingData, isLoading } = useQuery({
    queryKey: ["review", activeBeer?.name],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/review/${activeBeer?.name}`);
      if (!res.ok) throw new Error("Fehler beim Laden der Bewertungen");
      return res.json();
    },
    enabled: !!activeBeer,
  });

  // Platzhalter-Bewertungsdaten
  const placeholderRating: BeerRatingData = {
    biername: "Beispiel Bier",
    anzahl: 42,
    durchschnitt: "4.2"
  };

  const displayRating = ratingData || placeholderRating;
  const isPlaceholder = !ratingData;



  const submitRatingMutation = useMutation({
    mutationFn: async (data: { sterne: number }) => {
      const res = await fetch(`${API_BASE_URL}/review/${activeBeer?.name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sterne: data.sterne }),
      });
      if (!res.ok) throw new Error("Fehler beim Senden der Bewertung");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", activeBeer?.name] });
      setUserRating(0);
      toast({
        title: "Bewertung gesendet",
        description: "Vielen Dank für dein Feedback!",
      });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Bewertung konnte nicht gesendet werden. Bitte versuche es erneut.",
        variant: "destructive",
      });
    },
  });

  const handleSubmitRating = () => {
    if (userRating === 0) {
      toast({
        title: "Fehler",
        description: "Bitte wähle eine Bewertung aus",
        variant: "destructive",
      });
      return;
    }

    submitRatingMutation.mutate({
      sterne: userRating,
    });

  };

  const renderStars = (rating: number, size = "w-5 h-5") => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`${size} ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-300 dark:text-slate-600"
        }`}
      />
    ));
  };

  const renderInteractiveStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          index < (hoverRating || userRating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-300 dark:text-slate-600 hover:text-yellow-400"
        }`}
        onClick={() => setUserRating(index + 1)}
        onMouseEnter={() => setHoverRating(index + 1)}
        onMouseLeave={() => setHoverRating(0)}
      />
    ));
  };

  if (isLoading) {
    return (
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted dark:bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted dark:bg-muted rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
    );
  }

  return (
      <Card className={`bg-card dark:bg-card border-border dark:border-border ${isPlaceholder ? "opacity-75" : ""}`}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground dark:text-foreground flex items-center justify-between">
            <span>{t("rating.title")}</span>
            {isPlaceholder && (
              <Badge variant="outline" className="text-xs">
                Beispieldaten
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
      <CardContent>
        {/* Overall Rating Display */}
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold text-[hsl(var(--chart-1))] mb-2">
            {displayRating.durchschnitt}
          </div>

          <div className="flex justify-center mb-2">
            {renderStars(Math.round(Number(displayRating.durchschnitt)))}
          </div>
          <p className="text-sm text-muted-foreground">
            {t("rating.basedOn")} {displayRating.anzahl} {t("rating.reviews")}
          </p>
        </div>

        {/* User Rating Form */}
        <div className="border-t border-border dark:border-border pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
              {t("rating.yourRating")}
            </label>
            <div className="flex gap-1">
              {renderInteractiveStars()}
            </div>
          </div>

          <Button
              onClick={handleSubmitRating}
              disabled={submitRatingMutation.isPending || userRating === 0}
              className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] dark:bg-[hsl(var(--primary))] dark:hover:bg-[hsl(var(--primary)/0.7)] text-white"
          >
            {submitRatingMutation.isPending ? "Bewertung wird gesendet..." : t("rating.submit")}
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}
