import Hero from './components/Hero'
import StatusHUD from './components/StatusHUD'
import LiveStream from './components/LiveStream'
import CommandDeck from './components/CommandDeck'
import Onboarding from './components/Onboarding'

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Hero with Spline cover */}
      <Hero />

      {/* HUD Section */}
      <section id="hud" className="relative mx-auto -mt-12 max-w-6xl px-6 pb-16">
        {/* Top Bar: Status HUD */}
        <div className="relative z-10 -mt-16 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur">
          <StatusHUD />
        </div>

        {/* Center Grid: Avatar (Mirror) + Live Stream (Calendar) */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Avatar placeholder card (Digital Twin) */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-4">
            <div className="mb-2 text-sm font-semibold text-white/90">The Mirror</div>
            <div className="relative grid h-80 place-items-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]" />
              <div className="relative flex flex-col items-center">
                <div className="mb-3 h-36 w-36 rounded-full bg-gradient-to-br from-cyan-400/20 to-fuchsia-400/20 ring-1 ring-white/20" />
                <p className="text-sm text-slate-300">3D Avatar placeholder — reacts to energy, streak, and context</p>
              </div>
            </div>
          </div>

          {/* Live Stream (Smart Calendar) */}
          <LiveStream />
        </div>

        {/* Command Deck (Bottom controls) */}
        <CommandDeck />

        {/* Onboarding Experience */}
        <Onboarding />
      </section>

      {/* Footer tag line */}
      <footer className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-slate-400">
        Bio‑Digital • Futuristic • Dark Mode • Animated
      </footer>
    </div>
  )
}

export default App
