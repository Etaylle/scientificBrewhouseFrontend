import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";

import fh1 from "./img/gallery/fh1.jpg";
import fh2 from "./img/gallery/fh2.jpg";
import fh3 from "./img/gallery/fh3.jpg";
import fh4 from "./img/gallery/fh4.jpg";

export function GallerySection() {
    const { t } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const images: string[] = [fh1, fh2, fh3, fh4];
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.clientWidth;
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <section id="gallery" className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
                {t("gallery.title")}
            </h2>

            <div className="relative">
                {/* Pfeile */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-background/80 hover:bg-background rounded-full shadow-md"
                >
                    <ChevronLeft />
                </button>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-background/80 hover:bg-background rounded-full shadow-md"
                >
                    <ChevronRight />
                </button>

                {/* Scrollbare Bilder */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-4 scrollbar-none scroll-smooth px-8"
                >
                    {images.map((src, index) => (
                        <Card
                            key={index}
                            className="min-w-[300px] max-w-[300px] shrink-0 hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => setLightboxImage(src)}
                        >
                            <CardContent className="p-0">
                                <img
                                    src={src}
                                    alt={`FH Bild ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 text-white text-3xl"
                    >
                        <X />
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Lightbox"
                        className="max-w-full max-h-[90vh] rounded-xl shadow-lg"
                    />
                </div>
            )}
        </section>
    );
}
