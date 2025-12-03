import { useEffect, useState } from "react";
const DUMMY_HEARTBEAT = {
  visibilityStatus: false,
  connection: "offline",
  latency: 0,
  lastSync: null,
};

export const useGetHeartbeat = ({ stationId }: { stationId: string }) => {
  const [response, setResponse] = useState<typeof DUMMY_HEARTBEAT>(null);
  const [loading, setLoading] = useState(true);

  const DUMMY_HEARTBEAT = {
    visibilityStatus: false,
    connection: "offline",
    latency: 0,
    lastSync: null,
  };

  useEffect(() => {
    const fetchHeartBeat = async () => {
      try {
        setLoading(true);

        const url = `${process.env.NEXT_PUBLIC_HEARTBEAT_URL}?stationId=${stationId}`;
        const res = await fetch(url, { cache: "no-cache" });

        const contentType = res.headers.get("content-type") || "";

        // ❌ Not JSON → return dummy
        if (!contentType.includes("application/json")) {
          console.warn(
            "Heartbeat API returned non-JSON → using dummy fallback"
          );
          setResponse(DUMMY_HEARTBEAT);
          return;
        }

        const data = await res.json();

        // ❌ Empty or malformed JSON → return dummy
        if (!data || typeof data !== "object") {
          setResponse(DUMMY_HEARTBEAT);
          return;
        }

        setResponse(data);
      } catch (err) {
        console.error("Heartbeat Fetch Error:", err);
        setResponse(DUMMY_HEARTBEAT);
      } finally {
        setLoading(false);
      }
    };

    fetchHeartBeat();
  }, [stationId]);

  return { response, loading };
};
