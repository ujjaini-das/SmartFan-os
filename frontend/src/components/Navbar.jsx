function Navbar() {
  return (
    <header className="h-20 flex items-center justify-between px-5 md:px-8 border-b border-white/[0.05]">

      {/* Brand */}
      <div>
        <p className="text-slate-500 text-[11px] uppercase tracking-[0.2em]">
          Smart Home
        </p>

        <h1 className="text-xl md:text-2xl font-semibold text-slate-100 mt-1">
          SmartFan OS
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">

        {/* System status */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">

          <span className="w-2 h-2 rounded-full bg-emerald-300 shadow-sm shadow-emerald-300/40" />

          <span className="text-xs text-slate-400">
            System Online
          </span>

        </div>

        {/* Notification */}
        <button className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white transition">
          ♡
        </button>

        {/* Profile */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-indigo-200 flex items-center justify-center text-slate-700">
          👤
        </div>

      </div>

    </header>
  );
}

export default Navbar;