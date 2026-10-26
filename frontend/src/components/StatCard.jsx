function StatCard({ title, value, unit, icon, subtitle, accent = "indigo" }) {
  const accentStyles = {
    indigo: {
      icon: "bg-indigo-400/10 border-indigo-300/10",
      glow: "group-hover:bg-indigo-300/5",
    },
    violet: {
      icon: "bg-violet-400/10 border-violet-300/10",
      glow: "group-hover:bg-violet-300/5",
    },
    green: {
      icon: "bg-emerald-400/10 border-emerald-300/10",
      glow: "group-hover:bg-emerald-300/5",
    },
  };

  const style = accentStyles[accent] || accentStyles.indigo;

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.045] backdrop-blur-2xl p-5 transition duration-300 hover:border-white/[0.14] ${style.glow}`}
    >
      {/* Soft background glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-400/[0.04] blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-slate-100">
              {value}
            </span>

            {unit && (
              <span className="text-sm text-slate-500">
                {unit}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-2 text-xs text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-lg ${style.icon}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;