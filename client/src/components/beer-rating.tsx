import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Star } from "lucide-react";

interface BeerRatingData {
  biername: string;
  anzahl: number;
  durchschnitt: string;
}

export function BeerRating() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const { data: activeBeer } = useQuery({
    queryKey: ["/api/beer/active"],
  });

  const { data: ratingData, isLoading } = useQuery({
    queryKey: ["/api/review", activeBeer?.name],
    queryFn: async () => {
      const res = await fetch(`/api/review/${activeBeer?.name}`);
      if (!res.ok) throw new Error("Fehler beim Laden der Bewertungen");
      return res.json();
    },
    enabled: !!activeBeer,
  });


  const submitRatingMutation = useMutation({
    mutationFn: async (data: { sterne: number }) => {
      const res = await fetch(`/api/review/${activeBeer?.name}`, {
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
      queryClient.invalidateQueries({ queryKey: ["/api/review", activeBeer?.name] });
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
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {t("rating.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overall Rating Display */}
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-2">
            {ratingData?.durchschnitt || "0.0"}          </div>
          <div className="flex justify-center mb-2">
            {renderStars(Math.round(Number(ratingData?.durchschnitt) || 0))}          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("rating.basedOn")} {ratingData?.anzahl || 0} {t("rating.reviews")}          </p>
        </div>

        {/* User Rating Form */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">
              {t("rating.yourRating")}:
            </label>
            <div className="flex gap-1">
              {renderInteractiveStars()}
            </div>
          </div>

          <Button
            onClick={handleSubmitRating}
            disabled={submitRatingMutation.isPending || userRating === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
          >
            {submitRatingMutation.isPending ? "Bewertung wird gesendet..." : t("rating.submit")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
