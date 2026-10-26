import { useEffect, useState } from "react";
import {
  controlFan,
  autoControlFan,
} from "../services/api";

function FanStatusCard({
  initialSpeed = 0,
  initialStatus = "OFF",
  initialMode = "AUTO",
  temperature = 0,
  humidity = 0,
  occupancy = false,
  onFanUpdate,
}) {
  const [speed, setSpeed] = useState(initialSpeed);
  const [mode, setMode] = useState(initialMode);
  const [isOn, setIsOn] = useState(initialStatus === "ON");
  const [loading, setLoading] = useState(false);

  // Sync with backend dashboard updates
  useEffect(() => {
    setSpeed(initialSpeed);
    setIsOn(initialStatus === "ON");
    setMode(initialMode);
  }, [initialSpeed, initialStatus, initialMode]);

  // ---------------------------------------------
  // MANUAL FAN CONTROL
  // ---------------------------------------------

  const updateFan = async (newSpeed) => {
    try {
      setLoading(true);

      const response = await controlFan(
        newSpeed,
        "MANUAL"
      );

      const fan = response?.data || response;

      setSpeed(fan.speed);
      setIsOn(fan.status === "ON");
      setMode("MANUAL");

      if (onFanUpdate) {
        onFanUpdate(fan);
      }
    } catch (error) {
      console.error(
        "Fan control error:",
        error.response?.data || error.message
      );

      alert("Unable to control the fan.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------
  // AUTO CONTROL
  // ---------------------------------------------

  const runAutoControl = async () => {
    try {
      setLoading(true);

      const response = await autoControlFan(
        temperature,
        humidity,
        occupancy
      );

      const fan = response?.data || response;

      setSpeed(fan.speed);
      setIsOn(fan.status === "ON");
      setMode("AUTO");

      if (onFanUpdate) {
        onFanUpdate(fan);
      }
    } catch (error) {
      console.error(
        "Auto control error:",
        error.response?.data || error.message
      );

      alert("Unable to run automatic fan control.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------
  // SPEED CONTROLS
  // ---------------------------------------------

  const increaseSpeed = () => {
    if (loading || !isOn || speed >= 5) return;

    updateFan(speed + 1);
  };

  const decreaseSpeed = () => {
    if (loading || !isOn || speed <= 1) return;

    updateFan(speed - 1);
  };

  // ---------------------------------------------
  // ON / OFF
  // ---------------------------------------------

  const toggleFan = () => {
    if (loading) return;

    if (isOn) {
      updateFan(0);
    } else {
      updateFan(3);
    }
  };

  // ---------------------------------------------
  // MODE SWITCH
  // ---------------------------------------------

  const toggleMode = () => {
    if (loading) return;

    const newMode =
      mode === "AUTO" ? "MANUAL" : "AUTO";

    setMode(newMode);

    if (newMode === "AUTO") {
      runAutoControl();
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-500">
            Fan Control
          </p>

          <h2 className="text-lg font-semibold mt-1">
            SmartFan
          </h2>
        </div>

        <div
          className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${
            isOn
              ? "bg-emerald-400/5 border-emerald-400/10"
              : "bg-slate-400/5 border-white/10"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOn
                ? "bg-emerald-400"
                : "bg-slate-500"
            }`}
          />

          <span
            className={`text-[11px] ${
              isOn
                ? "text-emerald-300"
                : "text-slate-400"
            }`}
          >
            {isOn ? "ON" : "OFF"}
          </span>
        </div>

      </div>

      {/* FAN VISUAL */}

      <div className="flex flex-col items-center mt-7">

        <div className="relative flex items-center justify-center">

          <div
            className={`absolute w-28 h-28 rounded-full border border-indigo-400/10 ${
              isOn ? "animate-pulse" : ""
            }`}
          />

          <div className="absolute w-20 h-20 rounded-full border border-white/10 border-dashed" />

          <button
            onClick={toggleFan}
            disabled={loading}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition ${
              isOn
                ? "bg-slate-200 shadow-[0_0_35px_rgba(129,140,248,0.2)]"
                : "bg-slate-800 border border-white/10"
            }`}
          >
            <span
              className={`text-xl ${
                isOn
                  ? "text-indigo-500"
                  : "text-slate-500"
              }`}
            >
              ◉
            </span>
          </button>

        </div>

        {/* SPEED */}

        <p className="text-[11px] text-slate-500 mt-7">
          Current Speed
        </p>

        <div className="flex items-baseline gap-1 mt-1">

          <span className="text-2xl font-semibold">
            {speed}
          </span>

          <span className="text-xs text-slate-500">
            / 5
          </span>

        </div>

      </div>

      {/* SPEED CONTROLS */}

      <div className="flex items-center justify-center gap-3 mt-5">

        <button
          onClick={decreaseSpeed}
          disabled={
            loading || !isOn || speed <= 1
          }
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 transition"
        >
          −
        </button>

        <button
          onClick={toggleMode}
          disabled={loading}
          className={`px-5 h-8 rounded-lg border text-xs font-medium transition ${
            mode === "AUTO"
              ? "bg-indigo-500/10 border-indigo-400/20 text-indigo-300"
              : "bg-white/5 border-white/10 text-slate-300"
          }`}
        >
          {loading ? "..." : mode}
        </button>

        <button
          onClick={increaseSpeed}
          disabled={
            loading || !isOn || speed >= 5
          }
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 transition"
        >
          +
        </button>

      </div>

      {/* SPEED INDICATORS */}

      <div className="flex justify-center gap-2 mt-4">

        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`w-5 h-1 rounded-full transition ${
              level <= speed && isOn
                ? "bg-indigo-300"
                : "bg-slate-700"
            }`}
          />
        ))}

      </div>

      {/* AUTO INFORMATION */}

      <div className="mt-5 text-center">

        {mode === "AUTO" ? (
          <>
            <p className="text-xs text-indigo-300">
              Smart control is active
            </p>

            <p className="text-[10px] text-slate-500 mt-1">
              {temperature.toFixed(1)}°C ·{" "}
              {humidity}% humidity ·{" "}
              {occupancy ? "Occupied" : "Empty"}
            </p>
          </>
        ) : (
          <p className="text-xs text-slate-500">
            Manual speed control enabled
          </p>
        )}

      </div>

    </div>
  );
}

export default FanStatusCard;