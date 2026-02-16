import { useState, useEffect } from 'react';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Viewer } from './sections/Viewer';
import { Metrics } from './sections/Metrics';
import { Purchase } from './sections/Purchase';
import { Text } from './components/primitives/Text';
import { Button } from './components/primitives/Button';
import { Loader } from './components/motion/Loader';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="noise-bg min-h-screen bg-[var(--color-surface-900)] selection:bg-[var(--color-primary)] selection:text-[var(--color-surface-900)]">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full relative"
          >
            {/* Legacy Style Header - Gaia Design */}
            <header className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference text-white">
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="size-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-[var(--color-surface-900)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <Text variant="ui" className="text-xl font-bold tracking-tighter uppercase text-white">
                  Verdant
                </Text>
              </div>

              <nav className="hidden lg:flex items-center gap-12 bg-white/5 px-10 py-4 rounded-full backdrop-blur-md border border-white/5">
                {[
                  { name: 'Performance', id: 'metrics' },
                  { name: 'Innovation', id: 'features' },
                  { name: 'The Lab', id: 'viewer' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70 hover:text-[var(--color-primary)] transition-all relative group"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-6">
                <button className="hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase hover:text-[var(--color-primary)] transition-colors">
                  Search
                </button>
                <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                  Pre-order
                </Button>
              </div>
            </header>

            <Hero />
            <Features />
            <Viewer />
            <Metrics />

            <footer className="relative py-48 bg-[var(--color-surface-900)] border-t border-white/5 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02]">
                <h2 className="text-[25vw] font-serif uppercase tracking-tighter text-white leading-none">
                  Verdant
                </h2>
              </div>

              <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="space-y-6">
                  <Text variant="display" className="text-white text-4xl">Engineered for the planet.</Text>
                  <div className="flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">
                    <a href="#" className="hover:text-[var(--color-primary)]">Manifesto</a>
                    <a href="#" className="hover:text-[var(--color-primary)]">Archive</a>
                    <a href="#" className="hover:text-[var(--color-primary)]">Sustainability</a>
                  </div>
                </div>

                <div className="flex flex-col gap-8 items-end w-full md:w-auto">
                  <div className="text-[10px] uppercase tracking-widest text-white/20 font-black">
                    © 2026 Verdant Engineered Dynamics
                  </div>
                </div>
              </div>
            </footer>

            <Purchase />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
