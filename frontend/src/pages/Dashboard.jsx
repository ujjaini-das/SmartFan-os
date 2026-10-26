import { useEffect, useState } from "react";
import {
  getDashboard,
  getSensorHistory,
} from "../services/api";

import FanStatusCard from "../components/FanStatusCard";
import EnergyCard from "../components/EnergyCard";
import RecommendationCard from "../components/RecommendationCard";
import SensorChart from "../components/SensorChart";
import SmartInsights from "../components/SmartInsights";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [sensorHistory, setSensorHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("Living Room");

  const rooms = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Office",
  ];

  const loadDashboard = async (initialLoad = false) => {
    try {
      if (initialLoad) {
        setLoading(true);
      }

      const [dashboardResponse, historyResponse] =
        await Promise.all([
          getDashboard(),
          getSensorHistory(),
        ]);

      const dashboardData =
        dashboardResponse?.dashboard ||
        dashboardResponse?.data;

      setDashboard(dashboardData || null);

      const history =
        historyResponse?.data ||
        historyResponse?.sensors ||
        historyResponse?.history ||
        [];

      setSensorHistory(
        Array.isArray(history) ? history : []
      );

      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        "Unable to connect to SmartFan backend."
      );
    } finally {
      if (initialLoad) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadDashboard(true);

    const interval = setInterval(() => {
      loadDashboard(false);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1018] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-400 text-sm">
            Connecting to SmartFan OS...
          </p>
        </div>
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <div className="min-h-screen bg-[#0b1018] flex items-center justify-center px-6">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-xl">
              !
            </span>
          </div>

          <h2 className="text-lg font-semibold text-white mb-2">
            Backend connection failed
          </h2>

          <p className="text-sm text-slate-400 mb-6">
            {error}
          </p>

          <button
            onClick={() => loadDashboard(true)}
            className="px-5 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/20 text-indigo-300 hover:bg-indigo-500/30 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const latestSensor =
    dashboard?.latestSensor || {};

  const fan =
    dashboard?.fan || {};

  const temperature =
    Number(latestSensor?.temperature ?? 0);

  const humidity =
    Number(latestSensor?.humidity ?? 0);

  const occupancy =
    Boolean(latestSensor?.occupancy);

  const fanSpeed =
    Number(fan?.speed ?? 0);

  const fanStatus =
    fan?.status ||
    (fanSpeed > 0 ? "ON" : "OFF");

  const fanMode =
    fan?.mode || "AUTO";

  const energy =
    Number(dashboard?.totalEnergy ?? 0);

  const handleFanUpdate = (updatedFan) => {
    setDashboard((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        fan: updatedFan,
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1018] text-white">
      <div className="px-6 py-5 lg:px-8">

        <div className="flex items-center gap-8 mb-5 overflow-x-auto">

          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`relative py-2 text-sm transition-all whitespace-nowrap ${
                selectedRoom === room
                  ? "px-5 rounded-full bg-white/10 border border-white/10 text-white font-medium"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {room}
            </button>
          ))}

        </div>

        <div className="flex justify-end mb-4">
          <p className="text-[10px] text-slate-600">
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )}`
              : "Updating..."}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

          <div className="xl:col-span-4 space-y-5">

            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500">
                    {selectedRoom}
                  </p>

                  <h1 className="text-2xl font-semibold mt-1">
                    {temperature.toFixed(1)}°C
                  </h1>

                  <p className="text-xs text-slate-500 mt-1">
                    Current room temperature
                  </p>
                </div>

                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-slate-400 text-sm">
                    ◌
                  </span>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="small-glass-card">
                  <p className="text-[11px] text-slate-500">
                    Humidity
                  </p>

                  <p className="text-lg font-semibold mt-1">
                    {humidity}%
                  </p>
                </div>

                <div className="small-glass-card">
                  <p className="text-[11px] text-slate-500">
                    Occupancy
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <span
                      className={`w-2 h-2 rounded-full ${
                        occupancy
                          ? "bg-emerald-400"
                          : "bg-slate-500"
                      }`}
                    />

                    <p className="text-sm font-medium">
                      {occupancy
                        ? "Active"
                        : "Empty"}
                    </p>

                  </div>
                </div>

              </div>
            </div>

            <FanStatusCard
              initialSpeed={fanSpeed}
              initialStatus={fanStatus}
              initialMode={fanMode}
              temperature={temperature}
              humidity={humidity}
              occupancy={occupancy}
              onFanUpdate={handleFanUpdate}
            />

          </div>

          <div className="xl:col-span-5">

            <div className="glass-card rounded-2xl p-5 h-full min-h-[530px]">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500">
                    Smart Room
                  </p>

                  <h2 className="text-lg font-semibold mt-1">
                    {selectedRoom}
                  </h2>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/5 border border-emerald-400/10">

                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[11px] text-emerald-300">
                    Live
                  </span>

                </div>

              </div>

              <div className="relative h-[370px] rounded-2xl border border-white/10 bg-gradient-to-br from-[#182238] via-[#101a2d] to-[#09111f] overflow-hidden">

                <div className="absolute top-5 left-6 right-6 h-24 rounded-lg border border-white/10 bg-gradient-to-r from-slate-700/30 to-indigo-900/20">

                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

                  <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />

                </div>

                <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">

                  <div className="relative flex items-center justify-center">

                    <div
                      className={`absolute w-32 h-32 rounded-full border border-indigo-300/10 ${
                        fanStatus === "ON"
                          ? "animate-pulse"
                          : ""
                      }`}
                    />

                    <div className="absolute w-24 h-24 rounded-full border border-indigo-300/10 border-dashed" />

                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center shadow-[0_0_40px_rgba(129,140,248,0.2)]">

                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">

                        <span className="text-white text-sm">
                          ◉
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-72">

                  <div className="h-12 bg-slate-700/70 rounded-t-xl" />

                  <div className="h-9 bg-slate-800 rounded-b-xl border-t border-white/5" />

                  <div className="absolute -left-4 top-2 w-12 h-10 bg-slate-700 rounded-lg -rotate-5" />

                  <div className="absolute -right-4 top-2 w-12 h-10 bg-slate-700 rounded-lg rotate-5" />

                </div>

              </div>

              <div className="flex items-center justify-between mt-5">

                <div>
                  <p className="text-[11px] text-slate-500">
                    Fan Speed
                  </p>

                  <p className="text-lg font-semibold mt-1">
                    {fanSpeed}

                    <span className="text-xs text-slate-500 ml-1">
                      / 5
                    </span>
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-[11px] text-slate-500">
                    Mode
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    {fanMode}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="xl:col-span-3 space-y-5">

            <div className="glass-card rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs text-slate-500">
                    Temperature
                  </p>

                  <div className="flex items-baseline gap-1 mt-2">

                    <h2 className="text-2xl font-semibold">
                      {temperature.toFixed(1)}
                    </h2>

                    <span className="text-sm text-slate-500">
                      °C
                    </span>

                  </div>

                  <p className="text-[11px] text-slate-500 mt-2">
                    Live sensor reading
                  </p>

                </div>

                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-slate-400">
                    ♨
                  </span>
                </div>

              </div>

            </div>

            <div className="glass-card rounded-2xl p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs text-slate-500">
                    Humidity
                  </p>

                  <div className="flex items-baseline gap-1 mt-2">

                    <h2 className="text-2xl font-semibold">
                      {humidity}
                    </h2>

                    <span className="text-sm text-slate-500">
                      %
                    </span>

                  </div>

                  <p className="text-[11px] text-slate-500 mt-2">
                    Live sensor reading
                  </p>

                </div>

                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-slate-400">
                    ◌
                  </span>
                </div>

              </div>

            </div>

            <EnergyCard energy={energy} />

          </div>

        </div>

        <div className="mt-5">
          <RecommendationCard
            temperature={temperature}
            humidity={humidity}
            occupancy={occupancy}
            fanSpeed={fanSpeed}
          />
        </div>

        <div className="mt-5">
          <SensorChart
            data={sensorHistory}
          />
        </div>

        <div className="mt-5">
          <SmartInsights
            temperature={temperature}
            humidity={humidity}
            occupancy={occupancy}
            fanSpeed={fanSpeed}
            fanStatus={fanStatus}
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;