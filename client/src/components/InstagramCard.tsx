import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export function InstagramCard() {
  return (
    <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Folge uns!
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground">
          Bleibe auf dem Laufenden mit unseren neuesten Brauprojekten und Events
        </p>
        
        {/* Instagram Feed Preview */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg" />
          <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-lg" />
          <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg" />
          <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg" />
        </div>
        
        <Button
          className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-orange-500 hover:from-pink-600 hover:via-purple-700 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => window.open('https://www.instagram.com/scientific_brewhouse/', '_blank')}
        >
          <img src="/images/scientific_brewhouse_icon.png" className="w-6 h-6 mr-2 object-contain rounded-full" alt="Icon" />
          Follow @scientific_brewhouse
        </Button>
      </CardContent>
    </Card>
  );
}