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
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
            <header
                className="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">


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
                            </NavigationMenuList>
                        </NavigationMenu>
                        {/* Mobile */}

                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="md:hidden p-2">
                                    {/* Burger Icon */}
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                side="top"
                                className="p-4 space-y-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700"
                            >
                                <a
                                    href="#about"
                                    className="block text-lg text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded transition-colors"
                                >
                                    {t("nav.about")}                                </a>
                                <a
                                    href="#beer"
                                    className="block text-lg text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded transition-colors"
                                >
                                    {t("nav.currentBeer")}                                </a>
                                <a
                                    href="#dashboard"
                                    className="block text-lg text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded transition-colors"
                                >
                                    {t("nav.dashboard")}                                </a>
                                <a
                                    href="#research"
                                    className="block text-lg text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded transition-colors"
                                >
                                    {t("nav.research")}                                </a>
                                <a
                                    href="#contact"
                                    className="block text-lg text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-2 rounded transition-colors"
                                >
                                    {t("nav.contact")}                                </a>
                            </SheetContent>


                        </Sheet>


                        <div className="flex items-center space-x-4">
                            {/* Language Toggle */}
                            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
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
                                variant="outline"
                                size="icon"
                                onClick={toggleTheme}
                                className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                            >
                                {theme === "light" ? (
                                    <Moon className="h-4 w-4"/>
                                ) : (
                                    <Sun className="h-4 w-4"/>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                <section
                    id="home"
                    className="rounded-lg border bg-white dark:bg-slate-800 p-8 shadow-md space-y-6 text-center"
                >

                    {/* Badge */}
                    <div className="flex justify-center">
                        <Badge variant="default">{t("badge.fh")}</Badge>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl font-bold text-foreground">{t("hero.title")}                    </h1>

                    {/* Carousel */}
                    <Carousel className="max-w-3xl mx-auto relative">
                        <CarouselContent>
                            <CarouselItem className="p-6 space-y-2">
                                <h2 className="text-2xl font-semibold text-foreground">
                                    {t("hero.slide1.title")}                                </h2>
                                <p className="text-muted-foreground px-10">
                                    {t("hero.slide1.text")}                                </p>
                            </CarouselItem>
                            <CarouselItem className="p-6 space-y-2">
                                <h2 className="text-2xl font-semibold text-foreground">
                                    {t("hero.slide2.title")}                                </h2>
                                <p className="text-muted-foreground px-10">
                                    {t("hero.slide2.text")}                                </p>
                            </CarouselItem>
                            <CarouselItem className="p-6 space-y-2">
                                <h2 className="text-2xl font-semibold text-foreground">
                                    {t("hero.slide3.title")}                                </h2>
                                <p className="text-muted-foreground px-4">
                                    {t("hero.slide3.text")}                                </p>
                            </CarouselItem>
                        </CarouselContent>

                        <CarouselPrevious className="h-12 w-12 left-0"/>
                        <CarouselNext className="h-12 w-12 right-0"/>
                    </Carousel>


                    {/* CTA Buttons */}
                    <div className="flex justify-center gap-4 pt-4">
                        <Button size="lg" asChild>
                            <a href="#dashboard">{t("hero.cta.dashboard")}</a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="#about">{t("hero.cta.more")}</a>
                        </Button>
                    </div>
                    <Card className="overflow-hidden dark:border-white bg-slate-100 dark:bg-slate-800">
                        <CardHeader>
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
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
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
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12 py-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        FOOTER TEST </p>
                </div>
            </footer>
        </div>
    );
}
