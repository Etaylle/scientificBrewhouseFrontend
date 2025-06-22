import { useLanguage } from "@/components/language-provider";
import { useTheme } from "@/components/theme-provider";
import { DesktopNav } from "@/components/DesktopNav";
import { MobileNav } from "@/components/MobileNav";
import { BeerInfo } from "@/components/beer-info";
import { BeerRating } from "@/components/beer-rating";
import { SensorChart } from "@/components/sensor-chart";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Activity } from "lucide-react";

export default function HistoricalPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 text-foreground">
      {/* Header */}
      <header className="bg-background dark:bg-background sticky top-0 z-50 shadow-md">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/">
            <img
              src="/Scientific Brewhouse-Logo.png"
              alt="Scientific Brewhouse Logo"
              className="h-10"
            />
          </a>

          {/* Navigation */}
          <DesktopNav />

          {/* Controls */}
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
            <Button variant="default" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu */}
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">{t("page.historicalTitle") ?? "Historical Data"}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Beer Info */}
          <div>
            <BeerInfo />
          </div>

          {/* Beer Rating */}
          <div>
            <BeerRating />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Mashing + Hop Boiling */}
          <SensorChart
            sensorType={["mashing", "hopBoiling"]}
            title={t("charts.mashing") + " + " + t("charts.hopBoiling")}
            icon={<Activity className="w-5 h-5 text-indigo-500" />}
          />

          {/* Fermentation */}
          <SensorChart
            sensorType="fermentation"
            title={t("charts.fermentation")}
            icon={<Activity className="w-5 h-5 text-green-500" />}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card dark:bg-card border-t border-border dark:border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">FOOTER TEST</p>
        </div>
      </footer>
    </div>
  );
}
