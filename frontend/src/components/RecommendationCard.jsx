function RecommendationCard({
  temperature,
  humidity,
  occupancy,
  fanSpeed,
}) {
  let title = "System operating normally";

  let message =
    "SmartFan is monitoring the room and optimizing operation.";

  if (!occupancy) {
    title = "Fan can be turned off";

    message =
      "No occupancy detected. Turning the fan off can reduce unnecessary energy consumption.";
  } else if (Number(humidity) > 70) {
    title = "Increase fan speed to improve comfort";

    message =
      `Humidity is currently ${humidity}%. A higher fan speed can improve air circulation while maintaining comfort.`;
  } else if (Number(temperature) > 30) {
    title = "Room temperature is high";

    message =
      `The room temperature is ${temperature}°C. SmartFan recommends maintaining a higher cooling level.`;
  } else {
    title = "Comfort level looks good";

    message =
      "Current temperature and humidity are within a comfortable range.";
  }

  return (
    <div className="glass-card rounded-[28px] p-6">

      <div className="flex items-start gap-4">

        <div className="h-11 w-11 shrink-0 rounded-2xl bg-indigo-300/10 border border-indigo-200/10 flex items-center justify-center text-indigo-200">
          ✦
        </div>

        <div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-200">
            Smart Recommendation
          </p>

          <h3 className="text-lg font-medium mt-1">
            {title}
          </h3>

          <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
            {message}
          </p>

          <p className="text-xs text-slate-600 mt-3">
            Current fan speed: {fanSpeed}/5
          </p>

        </div>

      </div>

    </div>
  );
}

export default RecommendationCard;