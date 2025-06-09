import {useState} from "react";
import {SensorChart} from "@/components/sensor-chart";
import {BeerInfo} from "@/components/beer-info";
import {BeerRating} from "@/components/beer-rating";
import {useLanguage} from "@/components/language-provider";
import {useTheme} from "@/components/theme-provider";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Factory, Moon, Sun, Activity} from "lucide-react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import heroImage from "@/components/img/hero.jpg";
import { blogPosts } from "@/components/blogPosts/blogPosts";
import { BlogCard } from "@/components/ui/BlogCard";


export default function Dashboard() {
    const {language, setLanguage, t} = useLanguage();
    const {theme, toggleTheme} = useTheme();
    const [isLiveMode, setIsLiveMode] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleModeChange = (liveMode: boolean) => {
        setIsLiveMode(liveMode);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString + 'T00:00:00');
    };

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <header
                className="bg-background dark:bg-background relative z-50 dropshadow shadow-lg  transition-colors duration-300">
                <div className="container mx-auto py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <svg     className="h-10 w-auto text-bg-primary m-0 p-0" fill="currentColor" id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.13 83.05"><defs></defs><title>Scientific Brewhouse-Logo  weiß- aktuelles LOGO</title><path className="cls-1" d="M79.35,85.25a39.83,39.83,0,0,1-8.5-.92V79.49a43.59,43.59,0,0,0,7.76.88c3,0,5.62-1.2,5.62-4.69,0-3.21-3.11-4.18-5.53-5-5-1.67-8-3.3-8-9.25,0-5.16,3-9.81,11.29-9.81a31.64,31.64,0,0,1,7.16.75v4.74a38.58,38.58,0,0,0-6.09-.51c-2.09,0-5.53.6-5.53,4.37,0,3.06,3.25,4,5.85,4.69l.42.09c4.79,1.4,7.35,3.91,7.35,9.07C91.16,81.72,86.18,85.25,79.35,85.25Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M116.16,84.33a36.91,36.91,0,0,1-8,.92c-9.48,0-14.08-5.76-14.08-16.82s4.6-16.83,14.08-16.83a33.66,33.66,0,0,1,8,1v4.65a37.31,37.31,0,0,0-5.9-.56c-5.58,0-9.11,1.53-9.11,11.67s3.53,11.8,9.11,11.8a37.53,37.53,0,0,0,5.9-.56Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M119.28,84.7V52.16h6.46V84.7Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M132.06,84.7V52.16h18.26v5H138.56v8.41h8.19v5h-8.19v9.15h12v5Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M170.78,84.7,160.64,59.6H160V84.7h-5.58V52.16h9.39l10.13,24.91h.6V52.16h5.58V84.7Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M197.18,57.32V84.7h-6.51V57.32h-7.86V52.16H205v5.16Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M207.77,84.7V52.16h6.46V84.7Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M227.06,57.37v9h8.6V71.5h-8.6V84.7h-6.5V52.16H239v5.21Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M241.61,84.7V52.16h6.46V84.7Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M275.07,84.33a36.89,36.89,0,0,1-7.94.92c-9.49,0-14.09-5.76-14.09-16.82s4.6-16.83,14.09-16.83a33.63,33.63,0,0,1,7.94,1v4.65a37.31,37.31,0,0,0-5.9-.56c-5.58,0-9.11,1.53-9.11,11.67s3.53,11.8,9.11,11.8a37.53,37.53,0,0,0,5.9-.56Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M84.23,125.61H72V93.08H83.35c3.07,0,9.76,0,9.76,8.5,0,4.84-3.63,6.56-6,7v.79l.37.1c2.09.41,6.41,1.3,6.41,7.53C93.85,124.64,88,125.61,84.23,125.61Zm-2-28.16H78.47v9.34h3.9c.93,0,3.77-.05,3.81-4.65S83.44,97.45,82.28,97.45Zm.18,13.9h-4v9.8H83c3.62,0,3.76-3.2,3.76-4.88C86.74,112,84.37,111.35,82.46,111.35Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M114.49,125.61l-5.44-12.36h-3.62v12.36H99.06V93.08H109.7c3.63,0,10.69.56,10.69,9.2,0,3.77-.93,7.62-4.92,9l-.28.56,6.55,13.8Zm-5.49-28h-3.57v11h3.71c.93,0,4.33,0,4.33-5.49S110.26,97.59,109,97.59Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M125.09,125.61V93.08h18.26v5H131.59v8.41h8.18v5h-8.18v9.16h12v5Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M177.61,125.61h-8l-4.78-23.7h-.7l-4.51,23.7h-8.18l-7.2-32.53h7l4.1,24.82H156l4.88-24.82h8.14l4.6,24.82h.69l4.47-24.82h5.9Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M204.38,125.61V111.44H194.29v14.17h-6.41V93.08h6.41v13.25h10.09V93.08h6.46v32.53Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M229.39,126.31c-8.88,0-13.58-5.72-13.58-17s4.7-17,13.58-17S243,98.1,243,109.35,238.26,126.31,229.39,126.31Zm0-28.95c-5.48,0-6.6,5.29-6.6,12s1.12,11.9,6.6,11.9S236,116,236,109.3,234.87,97.36,229.34,97.36Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M259.13,126.13c-7.9,0-11.15-3.26-11.15-10.88V93.08h6.5v22.4c0,3.44.47,5.67,4.7,5.67s4.6-2.23,4.6-5.67V93.08h6v22.17C269.82,123.06,267.31,126.13,259.13,126.13Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M283.35,126.17a39,39,0,0,1-8.51-.93v-4.83a44.58,44.58,0,0,0,7.76.88c3,0,5.63-1.21,5.63-4.69,0-3.21-3.12-4.19-5.53-5-5-1.68-8-3.3-8-9.25,0-5.16,3-9.81,11.3-9.81a31.61,31.61,0,0,1,7.15.75V98a38.31,38.31,0,0,0-6.08-.51c-2.1,0-5.53.6-5.53,4.36,0,3.07,3.25,4,5.85,4.7l.42.09c4.79,1.4,7.34,3.91,7.34,9.06C295.15,122.64,290.18,126.17,283.35,126.17Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M299.48,125.61V93.08h18.26v5H306v8.41h8.18v5H306v9.16h12v5Z" transform="translate(-70.71 -43.26)"/><path className="cls-1" d="M379.46,51.2c-.29-4.91-10.55-6.47-21.47-6.88-.1,0-.22-.4-.22-.4l1.14-.07,0-.59h-8l0,.59,1.14.07s-.12.39-.23.4c-10.91.41-21.18,2-21.46,6.88,0,0-3,.66-3.38,1.7V87.8l1.47,1.94,1.58,2.08v33.8a8,8,0,0,0,3,.44,11.77,11.77,0,0,0,3.14-.47l0-25.77,2.19,2.89,11.5,15.13a7.35,7.35,0,0,0,10.31,0l11.49-15.13,2.33-3.06,0,25.95a12.34,12.34,0,0,0,3.19.46,7.27,7.27,0,0,0,2.82-.37V91.76l1.53-2,1.47-1.94V52.9C382.5,51.86,379.46,51.2,379.46,51.2Zm-2.63,34.58-5.58,7.35-4.52,6-11.87,14.84L343,99.08l-4.52-6-5.58-7.35v-29l3.1-.67.2-3.42c1.26-.64,5.11-2,15.77-2.38h5.8c10.66.41,14.51,1.74,15.77,2.38l.2,3.42,3.1.67Z" transform="translate(-70.71 -43.26)"/></svg>
                        </div>

                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="#about" className={navigationMenuTriggerStyle()}>
                                        {t("nav.about")}                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="#beer" className={navigationMenuTriggerStyle()}>
                                        {t("nav.currentBeer")}                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="#dashboard" className={navigationMenuTriggerStyle()}>
                                        {t("nav.dashboard")}                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="#research" className={navigationMenuTriggerStyle()}>
                                        {t("nav.research")}                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="#contact" className={navigationMenuTriggerStyle()}>
                                        {t("nav.contact")}                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="/blog" className={navigationMenuTriggerStyle()}>
                                         {t("nav.blog") ?? "Blog"}
                                 </NavigationMenuLink>
                                </NavigationMenuItem>

                            </NavigationMenuList>
                        </NavigationMenu>



                        <div className="flex items-center space-x-4">
                            {/* Language Toggle */}
                            <div className="flex bg-muted dark:bg-muted rounded-lg p-1">
                                <Button
                                    variant={language === "de" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setLanguage("de")}
                                    className="px-3 py-1 text-sm"
                                >
                                    DE
                                </Button>
                                <Button
                                    variant={language === "en" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setLanguage("en")}
                                    className="px-3 py-1 text-sm"
                                >
                                    EN
                                </Button>
                            </div>

                            {/* Theme Toggle */}
                            <Button
                                variant="default"
                                size="icon"
                                onClick={toggleTheme}>
                                {theme === "light" ? (
                                    <Moon className="h-4 w-4"/>
                                ) : (
                                    <Sun className="h-4 w-4"/>
                                )}
                            </Button>

                            <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="default" size="icon" className="md:hidden">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="top"
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 justify-items-center"
                            >
                                <a
                                    href="#about"
                                    className="w-full max-w-xs text-center text-lg font-medium text-foreground dark:text-foreground bg-muted/50 dark:bg-muted/40 hover:bg-muted dark:hover:bg-muted px-4 py-3 rounded-lg transition-colors"
                                >
                                    {t("nav.about")}
                                </a>
                                <a
                                    href="#beer"
                                    className="w-full max-w-xs text-center text-lg font-medium text-foreground dark:text-foreground bg-muted/50 dark:bg-muted/40 hover:bg-muted dark:hover:bg-muted px-4 py-3 rounded-lg transition-colors"
                                >
                                    {t("nav.currentBeer")}
                                </a>
                                <a
                                    href="#dashboard"
                                    className="w-full max-w-xs text-center text-lg font-medium text-foreground dark:text-foreground bg-muted/50 dark:bg-muted/40 hover:bg-muted dark:hover:bg-muted px-4 py-3 rounded-lg transition-colors"
                                >
                                    {t("nav.dashboard")}
                                </a>
                                <a
                                    href="#research"
                                    className="w-full max-w-xs text-center text-lg font-medium text-foreground dark:text-foreground bg-muted/50 dark:bg-muted/40 hover:bg-muted dark:hover:bg-muted px-4 py-3 rounded-lg transition-colors"
                                >
                                    {t("nav.research")}
                                </a>
                                <a
                                    href="#contact"
                                    className="w-full max-w-xs text-center text-lg font-medium text-foreground dark:text-foreground bg-muted/50 dark:bg-muted/40 hover:bg-muted dark:hover:bg-muted px-4 py-3 rounded-lg transition-colors"
                                >
                                    {t("nav.contact")}
                                </a>
                            </SheetContent>




                        </Sheet>
                        </div>
                    </div>
                </div>
            </header>
            <div id="portal-container" className="relative z-40"></div>
            <main>
                <div className="relative w-full h-[400px]">
                    {/* Hero Image */}
                    <img
                        src={heroImage}
                        alt="Hero Image"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 space-y-6">
                        {/* Main Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-background drop-shadow-lg text-center">
                            {t("hero.title")}
                        </h1>

                        {/* Carousel */}
                        <Carousel className="w-full max-w-xl ">
                            <CarouselContent className="drop-shadow-lg">
                                <CarouselItem className="space-y-2 text-center">
                                    <h2 className="text-2xl font-semibold text-background">{t("hero.slide1.title")}</h2>
                                    <p className="text-background text-base px-10">{t("hero.slide1.text")}</p>
                                </CarouselItem>
                                <CarouselItem className="space-y-2 text-center">
                                    <h2 className="text-2xl font-semibold text-background">{t("hero.slide2.title")}</h2>
                                    <p className="text-background text-base px-10">{t("hero.slide2.text")}</p>
                                </CarouselItem>
                                <CarouselItem className="space-y-2 text-center">
                                    <h2 className="text-2xl font-semibold text-background">{t("hero.slide3.title")}</h2>
                                    <p className="text-background text-base px-10">{t("hero.slide3.text")}</p>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="h-10 w-10 left-0" />
                            <CarouselNext className="h-10 w-10 right-0" />
                        </Carousel>

                    </div>
                </div>
                <section className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
            {t("blog.title") ?? "Bier Blog"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
    <BlogCard key={post.id} post={post} />
))}
        </div>
    </section>
                <div className="container mx-auto px-4 py-8 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Charts Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-xl font-semibold text-foreground dark:text-foreground">
                                {t("charts.title")}
                            </h2>

                            {/* Sensor Charts - each with own controls */}
                            <SensorChart
                                sensorType="fermentation"
                                title={t("charts.fermentation")}
                                icon={<Activity className="w-5 h-5 text-green-500"/>}
                            />

                            <SensorChart
                                sensorType="mashing"
                                title={t("charts.mashing")}
                                icon={<Activity className="w-5 h-5 text-blue-500"/>}
                            />

                            <SensorChart
                                sensorType="hopBoiling"
                                title={t("charts.hopBoiling")}
                                icon={<Activity className="w-5 h-5 text-orange-500"/>}
                            />
                        </div>

                        {/* Beer Information Panel */}
                        <div className="space-y-6">
                            <BeerInfo/>
                            <BeerRating/>
                        </div>
                    </div>
                    <Card
                        className="bg-card dark:bg-card border border-border dark:border-border text-center shadow-md overflow-hidden">                            <CardHeader>
                        <CardTitle>{t("map.title")}</CardTitle>
                    </CardHeader>
                        <CardContent className="h-64 p-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1725.7312056103287!2d16.381232837066587!3d48.15957773499717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da95020cab6f1%3A0xa63b89ca9b34074b!2sDas%20Zehn!5e0!3m2!1sde!2sat!4v1749056609412!5m2!1sde!2sat"
                                width="100%"
                                height="100%"
                                style={{border: 0}}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </CardContent>
                    </Card>
                </div>

            </main>

            <footer className="bg-card dark:bg-card border-t border-border dark:border-border mt-12 py-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        FOOTER TEST </p>
                </div>
            </footer>
        </div>
    );
}
