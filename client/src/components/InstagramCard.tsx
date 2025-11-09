import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

// Instagram Posts - Manuelle Kuration der neuesten Posts
const instagramPosts = [
  {
    id: "1",
    image: "/images/instagram/post1.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C8fUa8Xs5oc/", // Kopieren Sie die URL vom Instagram-Post
  },
  {
    id: "2",
    image: "/images/instagram/post2.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C6_6qy6st_G/",
  },
  {
    id: "3",
    image: "/images/instagram/post3.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C4a06dNNO3j/",

  },
  {
    id:"4",
    image: "/images/instagram/post4.jpg",
    url: "https://www.instagram.com/scientific_brewhouse/p/C4Y57FrsRCV/",
  }
];

export function InstagramCard() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

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
        
        {/* Instagram Feed Preview mit echten Bildern */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="aspect-square relative group cursor-pointer rounded-lg overflow-hidden"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => window.open(post.url, '_blank')}
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  // Fallback zu Gradient wenn Bild nicht lädt
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-pink-500/20', 'to-purple-500/20');
                }}
              />
              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-pink-500/80 to-purple-600/80 flex items-center justify-center transition-opacity duration-300 ${
                hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
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