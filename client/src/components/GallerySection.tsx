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
        <section id="gallery" className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
                {t("gallery.title")}
            </h2>

            <ScrollArea className="whitespace-nowrap rounded-md border">
                <div ref={scrollRef} className="flex w-max space-x-4 p-4">
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
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                    onClick={handleOverlayClick}
                >
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
