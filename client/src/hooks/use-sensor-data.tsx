import { useQuery } from "@tanstack/react-query";

export type SensorData = {
  timestamp: string;
  [key: string]: any;
};
const API_BASE_URL = "http://10.123.26.22/api";
export function useSensorData(
    sensorType: string,
    isLiveMode: boolean,
    selectedDate: Date
) {
  const endpoint = isLiveMode
      ? `${API_BASE_URL}/live/${sensorType}`
      : `${API_BASE_URL}/history/${sensorType}/${selectedDate.toISOString().split("T")[0]}`;

  const {
    data: rawData,
    isLoading,
    refetch,
  } = useQuery<SensorData[]>({
    queryKey: ["sensor-data", endpoint],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Fehler beim Laden der Sensordaten");
      const json = await res.json();
      return json.map((entry: any) => ({
        timestamp: entry.timestamp,
        ...entry.values, // flatten
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
