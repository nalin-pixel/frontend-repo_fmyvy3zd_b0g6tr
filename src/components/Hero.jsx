import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      {/* 3D Spline Background */}
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" 
          style={{ width: '100%', height: '100%' }} 
        />
      </div>

      {/* Gradient overlay for readability (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />

      <div className="relative mx-auto flex h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl"
        >
          RISE — The AI‑Native Life OS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-8 max-w-3xl text-base text-slate-200 sm:text-lg"
        >
          You define the Outcome. RISE manages the Process. Turn goals into XP and your day into an immersive, living schedule.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#onboarding" className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
            Start the AI Interview
            <span className="inline-block transition group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#hud" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
            View the HUD
          </a>
        </motion.div>
      </div>
    </section>
  );
}
