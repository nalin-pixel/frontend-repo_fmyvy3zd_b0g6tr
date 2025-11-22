import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Onboarding() {
  const [goals, setGoals] = useState(['Run a sub-25m 5k', 'Save $10k', 'Learn Python']);
  const [blocker, setBlocker] = useState('Low energy in the evenings');
  const [proposal, setProposal] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const propose = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/onboarding/propose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goals, blocker, work_hours: '9-6', energy_pattern: 'low-evening' })
      });
      const data = await res.json();
      setProposal(data);
    } finally {
      setLoading(false);
    }
  };

  const accept = async () => {
    if (!proposal) return;
    setLoading(true);
    try {
      const tasks = proposal.blocks.map(b => ({ title: b.title, start: b.start, end: b.end, category: b.category, status: 'scheduled' }));
      await fetch(`${API}/api/onboarding/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks)
      });
      setAccepted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="onboarding" className="relative w-full bg-black py-12 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Onboarding — The Magic Moment</h2>
          <p className="mt-2 text-slate-300">Tell RISE your goals, and it will craft your Base Protocol.</p>
        </div>

        {/* Input Card */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="mb-4 text-sm text-slate-300">Your Goals (3)</div>
            {goals.map((g, i) => (
              <input key={i} value={g} onChange={(e) => {
                const next = [...goals]; next[i] = e.target.value; setGoals(next);
              }} className="mb-2 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm outline-none focus:border-cyan-400" />
            ))}
            <div className="mt-4 text-sm text-slate-300">What's stopping you?</div>
            <input value={blocker} onChange={e => setBlocker(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm outline-none focus:border-cyan-400" />
            <button disabled={loading} onClick={propose} className="mt-4 inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
              {loading ? 'Thinking…' : 'Generate Proposal'}
            </button>
          </div>

          {/* Proposal */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            {!proposal ? (
              <div className="text-slate-400">Proposal will appear here.</div>
            ) : (
              <div>
                <div className="mb-2 text-sm text-slate-300">{proposal.message}</div>
                <ul className="space-y-2">
                  {proposal.blocks.map((b, idx) => (
                    <li key={idx} className="rounded-lg border border-white/10 bg-black/40 p-3">
                      <div className="font-semibold">{b.title}</div>
                      <div className="text-xs text-slate-400">{new Date(b.start).toLocaleTimeString()} - {new Date(b.end).toLocaleTimeString()} • {b.category}</div>
                    </li>
                  ))}
                </ul>
                <button disabled={loading} onClick={accept} className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-400/20 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/30">
                  {loading ? 'Saving…' : 'Accept & Create Schedule'}
                </button>
                {accepted && <div className="mt-2 text-emerald-300">Schedule created. Check the HUD.</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
