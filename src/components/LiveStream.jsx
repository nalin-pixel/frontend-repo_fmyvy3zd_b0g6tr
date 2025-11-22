import { motion } from 'framer-motion';

const demoTasks = [
  { id: 1, title: 'Python Micro‑Learning', time: '07:00 - 07:30', type: 'INT' },
  { id: 2, title: 'Zone 2 Run', time: '12:30 - 13:15', type: 'STR' },
  { id: 3, title: 'Meal Prep', time: '18:00 - 19:00', type: 'VIT' },
];

export default function LiveStream() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Live Stream</h3>
        <div className="text-xs text-slate-300">Now ▸ {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-cyan-400/40" />
        <div className="space-y-3">
          {demoTasks.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
            >
              <div>
                <div className="text-sm font-semibold text-white">{t.title}</div>
                <div className="text-xs text-slate-300">{t.time}</div>
              </div>
              <span className="text-[10px] font-mono text-cyan-300">{t.type}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
