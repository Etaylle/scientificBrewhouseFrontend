// components/HeroSection.tsx

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroImage from "@/components/img/hero.jpg";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <div className="relative w-full h-[500px]">
            <img
                src={heroImage}
                alt="Hero Image"
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold text-background drop-shadow-lg text-center">
                    {t("hero.title")}
                </h1>

                <div className="w-full max-w-xl">
                    <Carousel className="drop-shadow-lg">
                        <CarouselContent>
                            <CarouselItem className="space-y-4 text-center px-6">
                                <h2 className="text-2xl font-semibold text-background">{t("hero.slide1.title")}</h2>
                                <p className="text-background text-base px-9">{t("hero.slide1.text")}</p>
                            </CarouselItem>
                            <CarouselItem className="space-y-4 text-center px-6">
                                <h2 className="text-2xl font-semibold text-background">{t("hero.slide2.title")}</h2>
                                <p className="text-background text-base px-9">{t("hero.slide2.text")}</p>
                            </CarouselItem>
                            <CarouselItem className="space-y-4 text-center px-6">
                                <h2 className="text-2xl font-semibold text-background">{t("hero.slide3.title")}</h2>
                                <p className="text-background text-base px-9">{t("hero.slide3.text")}</p>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="h-10 w-10 left-0" />
                        <CarouselNext className="h-10 w-10 right-0" />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
