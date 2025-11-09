import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLanguage } from "@/components/language-provider";
import { X } from "lucide-react";

import fh1 from "./img/gallery/fh1.jpg";
import fh2 from "./img/gallery/fh2.jpg";
import fh3 from "./img/gallery/fh3.jpg";
import fh4 from "./img/gallery/fh4.jpg";

export function GallerySection() {
    const { t } = useLanguage();
    const images: string[] = [fh1, fh2, fh3, fh4];
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [scrollDirection, setScrollDirection] = useState<"right" | "left">("right");

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setLightboxImage(null);
        }
    };

    return (
        <section id="gallery" className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-foreground bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t("gallery.title")}
            </h2>

            <Card className="flex-1 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 min-h-0">
                <CardContent className="p-6 h-full">
                    <div className="h-full overflow-auto rounded-lg">
                        <div ref={scrollRef} className="grid grid-cols-2 gap-4">
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video"
                                    onClick={() => setLightboxImage(src)}
                                >
                                    <img
                                        src={src}
                                        alt={`FH Bild ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                    onClick={handleOverlayClick}
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 text-white text-3xl hover:scale-110 transition-transform"
                    >
                        <X />
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Lightbox"
                        className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
                    />
                </div>
            )}
        </section>
    );
}
