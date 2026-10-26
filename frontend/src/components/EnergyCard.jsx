function EnergyCard({ energy = 0 }) {
  const numericEnergy = Number(energy) || 0;

  const percentage = Math.min(
    Math.round(numericEnergy * 50),
    100
  );

  return (
    <div className="glass-card rounded-[28px] p-6">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs text-slate-500 uppercase tracking-wider">
            Power Consumption
          </p>

          <h2 className="text-3xl font-semibold mt-3">

            {numericEnergy.toFixed(2)}

            <span className="text-sm text-slate-500 ml-1">
              kWh
            </span>

          </h2>

        </div>

        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          ⚡
        </div>

      </div>

      <div className="mt-7">

        <div className="flex items-center justify-between text-xs mb-2">

          <span className="text-slate-500">
            Today's usage
          </span>

          <span className="text-slate-300">
            {percentage}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-white/5 overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-slate-300 to-indigo-300 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-5 rounded-2xl bg-emerald-300/5 border border-emerald-300/10 p-4">

        <p className="text-xs text-slate-500">
          Energy monitoring
        </p>

        <p className="text-sm font-medium text-emerald-200 mt-1">
          Active
        </p>

      </div>

    </div>
  );
}

export default EnergyCard;