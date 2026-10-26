function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[76px] min-h-screen flex-col items-center py-7 border-r border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl">

      {/* Logo */}
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-200 to-indigo-200 flex items-center justify-center text-xl text-slate-800 shadow-lg shadow-indigo-300/10">
        🌀
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-4 mt-12">

        <button
          className="w-11 h-11 rounded-xl bg-indigo-400/15 border border-indigo-300/10 text-indigo-200 flex items-center justify-center transition"
          title="Dashboard"
        >
          🏠
        </button>

        <button
          className="w-11 h-11 rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-slate-200 flex items-center justify-center transition"
          title="Fan Control"
        >
          🌀
        </button>

        <button
          className="w-11 h-11 rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-slate-200 flex items-center justify-center transition"
          title="Analytics"
        >
          📊
        </button>

        <button
          className="w-11 h-11 rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-slate-200 flex items-center justify-center transition"
          title="Energy"
        >
          ⚡
        </button>

        <button
          className="w-11 h-11 rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-slate-200 flex items-center justify-center transition"
          title="Settings"
        >
          ⚙️
        </button>

      </nav>

      {/* Bottom */}
      <div className="mt-auto">

        <button
          className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white transition"
          title="Help"
        >
          ?
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;