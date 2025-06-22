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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  switch (type) {
    case "fermentation": return "gaerung";
    case "mashing": return "maischen";
    case "hopBoiling": return "hopfenkochen";
    default: return type;
  }
};

// @ts-ignore
function getMetricsMap() {
  return {
    gaerung: [
      { key: "temperatur", label: "metrics.temperature", color: "#10B981", unit: "°C", icon: <Thermometer className="w-4 h-4" /> },
      { key: "druck", label: "metrics.pressure", color: "#3B82F6", unit: "bar", icon: <Gauge className="w-4 h-4" /> },
      { key: "stammwuerze", label: "metrics.gravity", color: "#F472B6", unit: "°P", icon: <Droplets className="w-4 h-4" /> },
      { key: "alkohol", label: "metrics.alcohol", color: "#8B5CF6", unit: "%", icon: <Beer className="w-4 h-4" /> },
      { key: "restextrakt", label: "metrics.extract", color: "#FCD34D", unit: "°P", icon: <Cloudy className="w-4 h-4" /> },
    ],
    maischen: [
      { key: "temperatur", label: "metrics.temperature", color: "#3B82F6", unit: "°C", icon: <Thermometer className="w-4 h-4" /> },
      { key: "fuellstand", label: "metrics.level", color: "#8B5CF6", unit: "L", icon: <Gauge className="w-4 h-4" /> },
      { key: "stammwuerze", label: "metrics.gravity", color: "#F472B6", unit: "°P", icon: <Droplets className="w-4 h-4" /> },
    ],
    hopfenkochen: [
      { key: "dauer", label: "metrics.duration", color: "#06B6D4", unit: "min", icon: <Timer className="w-4 h-4" /> },
    ],
  };
}

// @ts-ignore
export function SensorChart({ sensorType, title, icon }: {
  sensorType: string | string[],
  title: string,
  icon: JSX.Element
}) {
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sensorTypes = Array.isArray(sensorType) ? sensorType : [sensorType];
  const isDark = theme === "dark";

  
  // @ts-ignore
  const normalizedTypes = sensorTypes.map(normalizeSensorType);

// Alle Metriken kombinieren
const rawMetrics = normalizedTypes.flatMap((type) => getMetricsMap(t)[type] || []);
const seen = new Set();
const metrics = rawMetrics.filter((m) => {
  const key = m.key;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});


// Daten für alle Prozesse holen
const allDataResults = normalizedTypes.map((type) =>
  useSensorData(type, isLiveMode, selectedDate)
);

// Zusammengeführte Daten
const data = allDataResults.flatMap((res) => res.data || []);
const isLoading = allDataResults.some((res) => res.isLoading);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    if (!isLiveMode) {
      // @ts-ignore
      const sorted = data.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
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
    return data.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [data, isLiveMode]);

  const chartData = useMemo(() => {
    const datasets = metrics.map((metric: { key: string; label: any; color: string; }) => {
      const points = processedData.map((d) => {
        const raw = d[metric.key];
        const val = typeof raw === "string" ? parseFloat(raw) : raw;
        if (val == null || isNaN(val)) return null;
        return {
          x: new Date(d.timestamp),
          y: metric.key === "dauer"
              ? parseFloat((val / 60).toFixed(2))
              : parseFloat(val.toFixed(2)),

        };
      }).filter(Boolean);

      console.log(`[DEBUG] ${metric.label}:`, points);

      return {
        key: metric.key, 
        label: t(metric.label).charAt(0).toUpperCase() + t(metric.label).slice(1),
        data: points,
        borderColor: metric.color,
        backgroundColor: metric.color + "20",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        spanGaps: true,
        fill: false,
      };

    });
    return { datasets };
  }, [metrics, processedData]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDark ? "#f1f5f9" : "#1e293b",
          font: {
            size: 13,
            weight: "500",
          },
          boxWidth: 12,
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
    const label = context.dataset.label || "";
      const value = context.parsed.y !== null ? context.parsed.y : "-";
      const metric = metrics.find((m) => {
      const translated = t(m.label).charAt(0).toUpperCase() + t(m.label).slice(1);
     return translated === label;
     });
      const unit = metric ? metric.unit : "";
      return `${label}: ${value}${unit}`;
    }



        }
      }
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: isLiveMode ? "minute" : "hour",
          displayFormats: {
            hour: "HH:mm",
            minute: "HH:mm",
          },
          tooltipFormat: "HH:mm",
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
  }), [isDark, isLiveMode, metrics]);

  

  // @ts-ignore
  const getValue = (key, unit) => {
  // Rückwärts durchgehen, um letzten gültigen Wert für dieses Feld zu finden
    for (let i = data.length - 1; i >= 0; i--) {
      const val = data[i][key];
      const num = typeof val === "string" ? parseFloat(val) : val;
      if (num != null && !isNaN(num)) {
       return `${key === "dauer" ? (num / 60).toFixed(1) : num.toFixed(1)}${unit}`;
      }
   }
    return "-";
  };

  useEffect(() => {
    console.log(`[DEBUG] Mode: ${isLiveMode ? "Live" : "History"}`);
    console.log("[DEBUG] Raw data:", data);
    console.log("[DEBUG] Processed data:", processedData);
  }, [data, processedData, isLiveMode]);

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
      <Card className="bg-card dark:bg-card border border-border dark:border-border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              {icon} {title}
            </CardTitle>
            <Badge variant="outline">
              <Activity className="w-3 h-3 mr-1" /> {isLiveMode ? t("mode.live") : t("mode.history")}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center bg-muted dark:bg-muted rounded-lg p-1">
              <Input
                  id={`date-${sensorType}`}
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  disabled={isLiveMode}
              />
            </div>
            <div className="flex bg-muted dark:bg-muted rounded-lg p-1">
              <Button variant={isLiveMode ? "default" : "ghost"} onClick={() => setIsLiveMode(true)}>
                {t("mode.live")}
              </Button>
              <Button variant={!isLiveMode ? "default" : "ghost"} onClick={() => setIsLiveMode(false)}>
                {t("mode.history")}
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mt-4 text-sm flex-wrap">
            {metrics.map((m) => (
                <div key={m.key} className="flex items-center gap-1">
                  {m.icon}
                  <span style={{ color: m.color }}>
                   {t(m.label).charAt(0).toUpperCase() + t(m.label).slice(1)}: {getValue(m.key, m.unit)}
                  </span>

                </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[300px]">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
            ) : processedData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  {isLiveMode
                      ? t("charts.noLiveData") || "Keine aktuellen Sensordaten verfügbar."
                      : t("charts.noHistoryData") || "Für dieses Datum sind keine Daten vorhanden."}
                </div>
            ) : (
                <Line data={chartData} options={chartOptions} />
            )}
          </div>
        </CardContent>
      </Card>
  );
}
