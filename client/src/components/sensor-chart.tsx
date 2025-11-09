import React, { useState, useMemo, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useSensorData } from "@/hooks/use-sensor-data";
import { useLanguage } from "@/components/language-provider";
import { useTheme } from "@/components/theme-provider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Activity, Thermometer, Droplets, Gauge, Beer, Cloudy, Timer } from "lucide-react";
import { de } from 'date-fns/locale';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

// @ts-ignore
const normalizeSensorType = (type) => {
  // Wenn type ein Array ist, nimm das erste Element
  const typeStr = Array.isArray(type) ? type[0] : type;
  
  switch (typeStr) {
    case "fermentation": return "gaerung";
    case "mashing": return "maischen"; 
    case "hopBoiling": return "maischen";
    default: return typeStr;
  }
};


// @ts-ignore
function getMetricsMap(t) {
  return {
    gaerung: [
      { key: "temperatur", label: t("metrics.temperature"), color: "#10B981", unit: "°C", icon: <Thermometer className="w-4 h-4" /> },
      { key: "druck", label: t("metrics.pressure"), color: "#F59E0B", unit: "bar", icon: <Gauge className="w-4 h-4" /> },
      { key: "stammwuerze", label: t("metrics.stammwuerze"), color: "#8B5CF6", unit: "°P", icon: <Droplets className="w-4 h-4" /> },
      { key: "alkohol", label: t("metrics.alcohol"), color: "#EF4444", unit: "%", icon: <Beer className="w-4 h-4" /> },
      { key: "restextrakt", label: t("metrics.extract"), color: "#3B82F6", unit: "%", icon: <Cloudy className="w-4 h-4" /> },
    ],
    maischen: [
      { key: "temperatur", label: t("metrics.temperature"), color: "#10B981", unit: "°C", icon: <Thermometer className="w-4 h-4" /> },
      { key: "fuellstand", label: t("metrics.level"), color: "#F59E0B", unit: "%", icon: <Gauge className="w-4 h-4" /> },
      { key: "stammwuerze", label: t("metrics.stammwuerze"), color: "#8B5CF6", unit: "°P", icon: <Droplets className="w-4 h-4" /> },
    ],
  };
}

// Generiere Platzhalter-Daten für bessere Darstellung
// @ts-ignore
function generatePlaceholderData(sensorType, isLiveMode, daysRange = 1) {
  const now = new Date();
  
  // Für Gärung im History-Modus: 30 Tage mit 2 Messungen pro Tag
  if (sensorType === "gaerung" && !isLiveMode) {
    const dataPoints = daysRange * 2; // 2 Messungen pro Tag
    const intervalHours = 12; // alle 12 Stunden
    const placeholderData = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const timestamp = new Date(now.getTime() - (dataPoints - i - 1) * intervalHours * 60 * 60000);
      placeholderData.push({
        timestamp: timestamp.toISOString(),
        temperatur: 18 + Math.sin(i / 5) * 2 + Math.random() * 0.5,
        druck: 0.8 + Math.sin(i / 8) * 0.2 + Math.random() * 0.05,
        stammwuerze: 12 - (i / dataPoints) * 2 + Math.random() * 0.3,
        alkohol: (i / dataPoints) * 5 + Math.random() * 0.2,
        restextrakt: 4 - (i / dataPoints) * 1.5 + Math.random() * 0.2,
      });
    }
    return placeholderData;
  }
  
  // Standard: Live oder Maischen Historie
  const dataPoints = isLiveMode ? 20 : 48; // 20 Punkte für Live, 48 für Historie
  const intervalMinutes = isLiveMode ? 5 : 30; // 5 Min für Live, 30 Min für Historie
  
  const placeholderData = [];
  
  for (let i = 0; i < dataPoints; i++) {
    const timestamp = new Date(now.getTime() - (dataPoints - i - 1) * intervalMinutes * 60000);
    
    if (sensorType === "gaerung") {
      placeholderData.push({
        timestamp: timestamp.toISOString(),
        temperatur: 18 + Math.sin(i / 5) * 2 + Math.random() * 0.5,
        druck: 0.8 + Math.sin(i / 8) * 0.2 + Math.random() * 0.05,
        stammwuerze: 12 - (i / dataPoints) * 2 + Math.random() * 0.3,
        alkohol: (i / dataPoints) * 5 + Math.random() * 0.2,
        restextrakt: 4 - (i / dataPoints) * 1.5 + Math.random() * 0.2,
      });
    } else if (sensorType === "maischen") {
      placeholderData.push({
        timestamp: timestamp.toISOString(),
        temperatur: 65 + Math.sin(i / 4) * 5 + Math.random() * 1,
        fuellstand: 85 - (i / dataPoints) * 10 + Math.random() * 2,
        stammwuerze: 11 + Math.sin(i / 6) * 2 + Math.random() * 0.5,
      });
    }
  }
  
  return placeholderData;
}



// @ts-ignore
export function SensorChart({ sensorType, title, icon }) {
  const normalizedType = normalizeSensorType(sensorType);
  // Gärung startet im History-Modus, Maischen im Live-Modus
  const [isLiveMode, setIsLiveMode] = useState(normalizedType !== "gaerung");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  // @ts-ignore
  const metrics = getMetricsMap(t)[normalizedType] || [];
  
  // Gärung zeigt 30 Tage, Maischen zeigt 1 Tag
  const daysRange = (normalizedType === "gaerung" && !isLiveMode) ? 30 : 1;
  console.log('🎯 SensorChart render:', { sensorType, normalizedType, isLiveMode, daysRange });
  
  const { data, isLoading } = useSensorData(normalizedType, isLiveMode, selectedDate, daysRange);

  // Verwende echte Daten wenn vorhanden, sonst Platzhalter
  const hasRealData = data && data.length > 0;
  const displayData = hasRealData ? data : generatePlaceholderData(normalizedType, isLiveMode, daysRange);
  const isPlaceholder = !hasRealData;

  const processedData = useMemo(() => {
    if (!displayData || displayData.length === 0) return [];

    if (!isLiveMode) {
      // @ts-ignore
      const sorted = displayData.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const halfHourlyMap = new Map();

      sorted.forEach((d) => {
        const date = new Date(d.timestamp);
        const slot = date.getMinutes() < 30 ? "00" : "30";
        const key30min = date.toISOString().slice(0, 13) + ":" + slot;
        if (!halfHourlyMap.has(key30min)) {
          halfHourlyMap.set(key30min, d);
        }
      });

      return Array.from(halfHourlyMap.values());
    }

    // @ts-ignore
    return displayData.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [displayData, isLiveMode]);

  const chartData = useMemo(() => {
    const datasets = metrics.map((metric: { key: string; label: any; color: string; }) => {
      const points = processedData.map((d) => {
        const raw = d[metric.key];
        const val = typeof raw === "string" ? parseFloat(raw) : raw;

        return {
          x: new Date(d.timestamp),
          y: val != null && !isNaN(val)
              ? (metric.key === "dauer" ? parseFloat((val / 60).toFixed(2)) : parseFloat(val.toFixed(2)))
              : null,
        };
      });

      return {
        label: metric.label,
        data: points,
        borderColor: metric.color,
        backgroundColor: metric.color + "20",
        borderWidth: 2,
        tension: 0.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: false,
      };
    });
    return { datasets };
  }, [metrics, processedData]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: isDark ? "#f1f5f9" : "#1e293b",
          font: {
            size: 13,
            weight: 500,
          },
          boxWidth: 12,
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle" as const,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y !== null ? context.parsed.y : "-";
            const metric = metrics.find((m: { label: string; }) => m.label === label);
            const unit = metric ? metric.unit : "";
            return `${label}: ${value}${unit}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: (normalizedType === "gaerung" && !isLiveMode ? "day" : isLiveMode ? "minute" : "hour") as "day" | "minute" | "hour",
          displayFormats: {
            day: "dd. MMM",
            hour: "HH:mm",
            minute: "HH:mm",
          },
          tooltipFormat: normalizedType === "gaerung" && !isLiveMode ? "dd.MM.yyyy HH:mm" : "HH:mm",
          locale: de,
        },
        ticks: {
          color: isDark ? "#94a3b8" : "#475569",
        },
      },
      y: {
        ticks: {
          color: isDark ? "#94a3b8" : "#475569",
        },
      },
    },
  }), [isDark, isLiveMode, metrics, normalizedType]);

  const latest = processedData[processedData.length - 1] || {};
  // @ts-ignore
  const getValue = (key, unit) => {
    const raw = latest[key];
    const num = typeof raw === "string" ? parseFloat(raw) : raw;
    return num != null && !isNaN(num) ? `${key === "dauer" ? (num / 60).toFixed(1) : num.toFixed(1)}${unit}` : "-";
  };

  // @ts-ignore
  return (
      <Card className={`shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-card/95 to-card backdrop-blur-sm ${isPlaceholder ? "opacity-95" : ""}`}>
        <CardHeader className="pb-4 space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                {icon}
              </div>
              <span className="text-foreground">
                {title}
              </span>
            </CardTitle>
            {isPlaceholder && (
              <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-600 dark:text-amber-400 px-3 py-1.5">
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Beispieldaten
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            {/* Tab-Style Mode Switcher */}
            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl border border-border/50">
              <button
                onClick={() => setIsLiveMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2
                  ${isLiveMode 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-white animate-pulse' : 'bg-current opacity-50'}`} />
                {t("mode.live")}
              </button>
              <button
                onClick={() => setIsLiveMode(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2
                  ${!isLiveMode 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t("mode.history")}
              </button>
            </div>

            {/* Date Picker - nur sichtbar im History Mode */}
            {!isLiveMode && (
              <div className="flex flex-col gap-3">
                {/* Datepicker mit Label */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">
                    {normalizedType === "gaerung" 
                      ? "Wähle Startdatum (zeigt 30 Tage ab diesem Datum)" 
                      : "Wähle ein Datum (letzter Tag)"}
                  </span>
                </div>
                
                {/* Großer, klarer Datepicker Button */}
                <div className="relative">
                  <div 
                    onClick={() => {
                      console.log('🔴 BUTTON CLICKED!');
                      console.log('Ref exists:', !!dateInputRef.current);
                      if (dateInputRef.current) {
                        console.log('🔵 Triggering input click');
                        dateInputRef.current.showPicker();
                      }
                    }}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 px-5 py-3 rounded-xl border-2 border-blue-500/30 hover:border-blue-500/50 cursor-pointer transition-all duration-200 group"
                  >
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium mb-0.5">
                        {normalizedType === "gaerung" ? "Startdatum" : "Ausgewähltes Datum"}
                      </div>
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-300">
                        {new Date(selectedDate).toLocaleDateString('de-DE', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                        {normalizedType === "gaerung" && (
                          <span className="text-xs text-blue-600/50 dark:text-blue-400/50 ml-2">
                            (+ 30 Tage)
                          </span>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-blue-600/50 dark:text-blue-400/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <input
                      ref={dateInputRef}
                      type="date"
                      value={selectedDate.toISOString().split("T")[0]}
                      onChange={(e) => {
                        console.log('🟢 Date changed:', e.target.value);
                        setSelectedDate(new Date(e.target.value));
                      }}
                      max={new Date().toISOString().split("T")[0]}
                      min={new Date(Date.now() - (normalizedType === "gaerung" ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                      className="absolute opacity-0 pointer-events-none w-0 h-0"
                      onClick={(e) => console.log('📅 Input clicked directly', e)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 text-sm flex-wrap pt-2 border-t border-border/50">
            {metrics.map((m: { key: string; label: string; icon: React.ReactNode; color: string; unit: string }) => (
                <div key={m.key} className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
                  <span className="opacity-70">{m.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{m.label}</span>
                    <span className="font-semibold" style={{ color: m.color }}>{getValue(m.key, m.unit)}</span>
                  </div>
                </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[400px] p-4 bg-gradient-to-br from-muted/30 to-transparent rounded-xl">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary/30 border-t-primary" />
                  <p className="text-sm text-muted-foreground">Daten werden geladen...</p>
                </div>
            ) : (
                <Line data={chartData} options={chartOptions} />
            )}
          </div>
        </CardContent>
      </Card>
  );
}
