import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Flame, Trophy } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Ring({ value }) {
  const pct = Math.min(100, Math.max(0, value));
  const dash = 282.6 * (pct / 100);
  return (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="none" />
      <circle cx="50" cy="50" r="45" stroke="url(#grad)" strokeWidth="8" fill="none" strokeDasharray={`${dash} 282.6`} strokeLinecap="round" transform="rotate(-90 50 50)" />
      <defs>
        <linearGradient id="grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HUD() {
  const [profile, setProfile] = useState({ level: 1, xp: 0, streak: 0 });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/profile`).then(r => r.json()).then(setProfile).catch(() => {});
    fetch(`${API}/api/tasks`).then(r => r.json()).then(setTasks).catch(() => {});
  }, []);

  const xpPct = useMemo(() => (profile?.xp ?? 0), [profile]);

  return (
    <section id="hud" className="relative w-full bg-black text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-5">
        {/* Top Bar / Status HUD */}
        <div className="md:col-span-5 grid grid-cols-3 gap-4">
          {/* Energy Battery */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-2"><Battery className="w-4 h-4"/> Energy</div>
            <div className="h-28 w-8 rounded-lg bg-white/10 overflow-hidden relative">
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-400 via-lime-300 to-emerald-300" style={{ height: '70%' }} />
            </div>
          </div>

          {/* Streak Flame */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-300">
              <Flame className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold">{profile?.streak ?? 0}</div>
            <div className="text-xs text-slate-400">Current Streak</div>
          </div>

          {/* Level & XP Ring */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur flex items-center gap-4">
            <Ring value={xpPct} />
            <div>
              <div className="text-sm text-slate-400">Level</div>
              <div className="text-2xl font-bold">Lvl {profile?.level ?? 1}</div>
              <div className="text-xs text-slate-400">XP {profile?.xp ?? 0}/100</div>
            </div>
          </div>
        </div>

        {/* Live Stream / Smart Calendar */}
        <div className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-3 text-sm text-slate-300">Live Stream</div>
          <div className="relative h-[420px] overflow-y-auto rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="sticky top-1 z-10 h-0.5 w-full bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 shadow-[0_0_20px_#22d3ee]" />
            <div className="mt-6 space-y-3">
              {tasks.map((t) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-xs text-slate-400">{new Date(t.start).toLocaleTimeString()} - {new Date(t.end).toLocaleTimeString()}</div>
                  </div>
                  <button onClick={() => fetch(`${API}/api/tasks/${t.id}/complete`, { method: 'POST' }).then(() => {
                    fetch(`${API}/api/profile`).then(r => r.json()).then(setProfile);
                    fetch(`${API}/api/tasks`).then(r => r.json()).then(setTasks);
                  })} className="inline-flex items-center gap-2 rounded-lg bg-emerald-400/20 px-3 py-2 text-emerald-200 hover:bg-emerald-400/30">
                    <Trophy className="w-4 h-4" /> Complete
                  </button>
                </motion.div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center text-slate-400">No tasks yet. Complete onboarding to generate your Base Protocol.</div>
              )}
            </div>
          </div>
        </div>

        {/* Avatar / Mirror */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-3 text-sm text-slate-300">The Mirror</div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-black">
            <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.25),transparent_40%)]" />
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">Digital Twin (placeholder)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
