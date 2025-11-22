import { Mic, Plus, Store } from 'lucide-react';

export default function CommandDeck() {
  return (
    <div className="sticky bottom-0 z-20 mt-6 w-full">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">Quests</button>
          <button className="group -mt-10 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white shadow-xl ring-1 ring-white/30">
            <Mic className="h-6 w-6 transition group-active:scale-95" />
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">Marketplace</button>
        </div>
      </div>
    </div>
  );
}
