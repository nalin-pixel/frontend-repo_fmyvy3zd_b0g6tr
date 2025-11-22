import { BatteryMedium, Flame, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatusHUD({ energy = 0.76, streak = 12, level = 4, xp = 0.42 }) {
  const energyColor = energy > 0.66 ? 'from-green-400 to-emerald-500' : energy > 0.33 ? 'from-yellow-400 to-amber-500' : 'from-red-400 to-rose-500';

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Energy Battery */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-slate-200">
          <BatteryMedium className="h-4 w-4" />
          <span className="text-xs tracking-wide">Energy</span>
        </div>
        <div className="relative h-24 w-10 rounded-lg border border-white/20 p-1">
          <div className="absolute inset-0 rounded-lg bg-black/40" />
          <div className={`absolute bottom-1 left-1 right-1 rounded-md bg-gradient-to-t ${energyColor}`} style={{ height: `${Math.round(energy * 100)}%` }} />
        </div>
      </motion.div>

      {/* Streak Flame */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
        <div className="mb-2 flex items-center justify-center gap-2 text-slate-200">
          <Flame className="h-4 w-4 text-orange-400" />
          <span className="text-xs tracking-wide">Streak</span>
        </div>
        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400/30 to-pink-500/30 text-2xl font-extrabold text-white ring-1 ring-inset ring-white/20">
          {streak}
        </div>
      </motion.div>

      {/* Level & XP Ring */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex items-center gap-2 text-slate-200">
          <Trophy className="h-4 w-4 text-yellow-300" />
          <span className="text-xs tracking-wide">Level</span>
        </div>
        <div className="relative grid h-24 place-items-center">
          <div className="relative h-20 w-20">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
              <path className="text-white/10" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
              <path className="text-cyan-400" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray={`${Math.round(xp*100)}, 100`} d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-white">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-slate-300">Lvl</div>
                <div className="text-xl font-bold">{level}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
