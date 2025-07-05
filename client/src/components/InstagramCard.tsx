import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export function InstagramCard() {
  return (
    <Card className="bg-card dark:bg-card border border-border dark:border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-600" />
          Instagram
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
       
        <Button
          variant="outline"
          className="w-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300"
          onClick={() => window.open('https://www.instagram.com/scientific_brewhouse/', '_blank')}
        ><img src="/images/scientific_brewhouse_icon.png" className="max-w-7 max-h-7 mr-2 object-contain" alt="Icon" />
        
          Follow @scientific_brewhouse
        </Button>
      </CardContent>
    </Card>
  );
}