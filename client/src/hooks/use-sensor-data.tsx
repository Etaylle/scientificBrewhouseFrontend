import { useQuery } from "@tanstack/react-query";

export type SensorData = {
  timestamp: string;
  [key: string]: any;
};
const API_BASE_URL = "/api";
export function useSensorData(
    sensorType: string,
    isLiveMode: boolean,
    selectedDate: Date,
    daysRange: number = 1 // Neu: Anzahl der Tage für historische Daten
) {
  const endpoint = isLiveMode
      ? `${API_BASE_URL}/live/${sensorType}`
      : `${API_BASE_URL}/history/${sensorType}/${selectedDate.toISOString().split("T")[0]}`;

  console.log('📊 useSensorData called:', { sensorType, isLiveMode, selectedDate: selectedDate.toISOString().split("T")[0], daysRange, endpoint });

  const {
    data: rawData,
    isLoading,
    refetch,
  } = useQuery<SensorData[]>({
    queryKey: ["sensor-data", endpoint, daysRange],
    queryFn: async () => {
      console.log('🔄 Fetching data from:', endpoint);
      
      // Für Live-Modus: Normale Abfrage
      if (isLiveMode) {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Fehler beim Laden der Sensordaten");
        const json = await res.json();
        console.log('✅ Live data received:', json.length, 'entries');
        return json.map((entry: any) => ({
          timestamp: entry.timestamp,
          ...entry.values,
        }));
      }
      
      // Für History-Modus mit mehreren Tagen (Gärung)
      if (daysRange > 1) {
        console.log(`📅 Fetching ${daysRange} days of history data...`);
        const allData: any[] = [];
        
        for (let i = 0; i < daysRange; i++) {
          const date = new Date(selectedDate);
          date.setDate(date.getDate() + i);
          const dateStr = date.toISOString().split("T")[0];
          const dayEndpoint = `${API_BASE_URL}/history/${sensorType}/${dateStr}`;
          
          try {
            console.log(`  📆 Fetching day ${i + 1}/${daysRange}: ${dateStr}`);
            const res = await fetch(dayEndpoint);
            if (res.ok) {
              const json = await res.json();
              console.log(`    ✅ Got ${json.length} entries for ${dateStr}`);
              allData.push(...json);
            } else {
              console.log(`    ⚠️ No data for ${dateStr}`);
            }
          } catch (err) {
            console.log(`    ❌ Error fetching ${dateStr}:`, err);
          }
        }
        
        console.log(`🎯 Total entries collected: ${allData.length}`);
        return allData.map((entry: any) => ({
          timestamp: entry.timestamp,
          ...entry.values,
        }));
      }
      
      // Standard: 1 Tag (Maischen)
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Fehler beim Laden der Sensordaten");
      const json = await res.json();
      console.log('✅ Single day data received:', json.length, 'entries');
      return json.map((entry: any) => ({
        timestamp: entry.timestamp,
        ...entry.values,
      }));
    },
    refetchInterval: isLiveMode ? 10000 : false, // Live: alle 10 Sekunden, History: kein Polling
    enabled: !!sensorType && (isLiveMode || !!selectedDate),
  });

  return {
    data: rawData || [],
    isLoading,
    refetch,
  };
}
