import { useState } from "react";
import { SensorChart } from "@/components/sensor-chart";
import { BeerInfo } from "@/components/beer-info";
import { BeerRating } from "@/components/beer-rating";
import { useLanguage } from "@/components/language-provider";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Factory, Moon, Sun, Activity } from "lucide-react";

export default function Dashboard() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-lg border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                <Factory className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                  {t("title")}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("subtitle")}
                </p>
              </div>
            </div>
            
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
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
              icon={<Activity className="w-5 h-5 text-green-500" />}
            />

            <SensorChart
              sensorType="mashing"
              title={t("charts.mashing")}
              icon={<Activity className="w-5 h-5 text-blue-500" />}
            />

            <SensorChart
              sensorType="hopBoiling"
              title={t("charts.hopBoiling")}
              icon={<Activity className="w-5 h-5 text-orange-500" />}
            />
          </div>

          {/* Beer Information Panel */}
          <div className="space-y-6">
            <BeerInfo />
            <BeerRating />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
FOOTER TEST          </p>
        </div>
      </footer>
    </div>
  );
}
