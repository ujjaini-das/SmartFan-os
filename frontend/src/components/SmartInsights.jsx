function SmartInsights({
  temperature = 0,
  humidity = 0,
  occupancy = false,
  fanSpeed = 0,
  fanStatus = "OFF",
}) {
  // ---------------------------------------------
  // COMFORT SCORE
  // ---------------------------------------------

  let comfortScore = 100;

  if (temperature > 30) {
    comfortScore -= Math.min(
      (temperature - 30) * 8,
      35
    );
  } else if (temperature < 22) {
    comfortScore -= Math.min(
      (22 - temperature) * 6,
      25
    );
  }

  if (humidity > 70) {
    comfortScore -= Math.min(
      (humidity - 70) * 0.8,
      20
    );
  } else if (humidity < 30) {
    comfortScore -= Math.min(
      (30 - humidity) * 0.5,
      15
    );
  }

  if (!occupancy) {
    comfortScore = Math.min(
      comfortScore + 5,
      100
    );
  }

  comfortScore = Math.max(
    0,
    Math.round(comfortScore)
  );

  // ---------------------------------------------
  // COMFORT LABEL
  // ---------------------------------------------

  let comfortLabel = "Excellent";

  if (comfortScore < 80) {
    comfortLabel = "Good";
  }

  if (comfortScore < 60) {
    comfortLabel = "Moderate";
  }

  if (comfortScore < 40) {
    comfortLabel = "Poor";
  }

  // ---------------------------------------------
  // SMART RECOMMENDATION
  // ---------------------------------------------

  let recommendation =
    "Current room conditions are comfortable.";

  if (!occupancy) {
    recommendation =
      "No one is detected. SmartFan can remain OFF to save energy.";
  } else if (temperature >= 32 && humidity >= 70) {
    recommendation =
      "High heat and humidity detected. Maximum cooling is recommended.";
  } else if (temperature >= 30) {
    recommendation =
      "Room temperature is high. Increase fan speed for better cooling.";
  } else if (humidity >= 70) {
    recommendation =
      "Humidity is high. A higher fan speed can improve comfort.";
  } else if (temperature < 25) {
    recommendation =
      "Room temperature is comfortable. Lower fan speed can reduce energy use.";
  }

  // ---------------------------------------------
  // EFFICIENCY SCORE
  // ---------------------------------------------

  let efficiencyScore = 100;

  if (fanStatus === "ON" && !occupancy) {
    efficiencyScore = 20;
  } else if (fanStatus === "ON" && fanSpeed >= 5) {
    efficiencyScore = temperature >= 30 ? 85 : 65;
  } else if (fanStatus === "ON" && fanSpeed <= 2) {
    efficiencyScore = 95;
  }

  return (
    <div className="glass-card rounded-2xl p-5">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-500">
            Smart Insights
          </p>

          <h2 className="text-lg font-semibold mt-1">
            Comfort & Efficiency
          </h2>
        </div>

        <div className="w-9 h-9 rounded-lg bg-indigo-400/10 border border-indigo-400/10 flex items-center justify-center">
          <span className="text-indigo-300">
            ✦
          </span>
        </div>

      </div>

      {/* SCORES */}

      <div className="grid grid-cols-2 gap-3">

        {/* COMFORT */}

        <div className="small-glass-card">

          <p className="text-[11px] text-slate-500">
            Comfort Score
          </p>

          <div className="flex items-baseline gap-1 mt-2">

            <span className="text-2xl font-semibold">
              {comfortScore}
            </span>

            <span className="text-xs text-slate-500">
              /100
            </span>

          </div>

          <p className="text-xs text-indigo-300 mt-1">
            {comfortLabel}
          </p>

          <div className="h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">

            <div
              className="h-full bg-indigo-400 rounded-full transition-all"
              style={{
                width: `${comfortScore}%`,
              }}
            />

          </div>

        </div>

        {/* EFFICIENCY */}

        <div className="small-glass-card">

          <p className="text-[11px] text-slate-500">
            Fan Efficiency
          </p>

          <div className="flex items-baseline gap-1 mt-2">

            <span className="text-2xl font-semibold">
              {efficiencyScore}
            </span>

            <span className="text-xs text-slate-500">
              /100
            </span>

          </div>

          <p className="text-xs text-emerald-300 mt-1">
            {efficiencyScore >= 80
              ? "Efficient"
              : "Needs optimization"}
          </p>

          <div className="h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">

            <div
              className="h-full bg-emerald-400 rounded-full transition-all"
              style={{
                width: `${efficiencyScore}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* CURRENT CONDITIONS */}

      <div className="grid grid-cols-3 gap-3 mt-3">

        <div className="small-glass-card">

          <p className="text-[10px] text-slate-500">
            Temperature
          </p>

          <p className="text-sm font-semibold mt-1">
            {temperature.toFixed(1)}°C
          </p>

        </div>

        <div className="small-glass-card">

          <p className="text-[10px] text-slate-500">
            Humidity
          </p>

          <p className="text-sm font-semibold mt-1">
            {humidity}%
          </p>

        </div>

        <div className="small-glass-card">

          <p className="text-[10px] text-slate-500">
            Fan
          </p>

          <p className="text-sm font-semibold mt-1">
            {fanStatus === "ON"
              ? `${fanSpeed}/5`
              : "OFF"}
          </p>

        </div>

      </div>

      {/* RECOMMENDATION */}

      <div className="mt-4 p-4 rounded-xl bg-indigo-400/5 border border-indigo-400/10">

        <div className="flex gap-3">

          <div className="w-7 h-7 shrink-0 rounded-lg bg-indigo-400/10 flex items-center justify-center">
            <span className="text-indigo-300 text-sm">
              ✦
            </span>
          </div>

          <div>

            <p className="text-xs font-medium text-slate-300">
              Smart Recommendation
            </p>

            <p className="text-xs text-slate-500 leading-relaxed mt-1">
              {recommendation}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SmartInsights;