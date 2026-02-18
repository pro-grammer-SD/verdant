import { useState, useEffect } from 'react';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Viewer } from './sections/Viewer';
import { Metrics } from './sections/Metrics';
import { Purchase } from './sections/Purchase';
import { Analytics } from './sections/Analytics';
import { SizeGuide } from './pages/SizeGuide';
import { Text } from './components/primitives/Text';
import { Button } from './components/primitives/Button';
import { Loader } from './components/motion/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductProvider } from './context/ProductContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ProductProvider>
      <div className="noise-bg min-h-screen bg-[var(--color-surface-900)] selection:bg-[var(--color-primary)] selection:text-[var(--color-surface-900)] hacker-hud overflow-x-hidden">
        {/* Hacker HUD Layers */}
        <div className="scanline" />
        <div className="ambient-light" />

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
              {/* Industry-Grade Fixed Header */}
              <header className="fixed top-0 left-0 w-full z-[10005] px-8 py-8 flex justify-between items-center transition-all duration-700">
                {/* Fixed Gradient & Backdrop Safety */}
                <div className="absolute inset-0 bg-[var(--color-surface-900)]/60 backdrop-blur-3xl border-b border-white/[0.03] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface-900)] to-transparent opacity-40 pointer-events-none" />

                <div className="flex items-center gap-3 group cursor-pointer relative z-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <div className="size-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-[var(--color-surface-900)] shadow-[0_0_20px_rgba(17,212,17,0.2)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <Text variant="ui" className="text-xl font-black tracking-tighter uppercase text-white font-sans">
                    Verdant
                  </Text>
                </div>

                <nav className="flex items-center gap-6 md:gap-12 glass-panel bg-white/[0.03] backdrop-blur-xl px-6 md:px-10 py-3 md:py-4 rounded-full border border-white/5 relative z-10 shadow-2xl overflow-x-auto no-scrollbar max-w-[50vw] sm:max-w-none">
                  {[
                    { name: 'Performance', id: 'metrics' },
                    { name: 'Innovation', id: 'features' },
                    { name: 'The Lab', id: 'viewer' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/50 hover:text-[var(--color-primary)] transition-all font-sans whitespace-nowrap"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                <div className="flex items-center gap-4 md:gap-6 relative z-10">
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="hidden md:block text-[10px] font-black tracking-[0.3em] uppercase text-white/40 hover:text-[var(--color-primary)] transition-colors font-sans"
                  >
                    Size Guide
                  </button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="inline-flex font-sans font-black tracking-widest text-[9px] md:text-[10px]"
                    onClick={() => document.getElementById('purchase')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Pre-order
                  </Button>
                </div>
              </header>

              <Hero />
              <Features />
              <Viewer />
              <Metrics />
              <Analytics />

              <footer className="relative py-48 bg-[var(--color-surface-900)] border-t border-white/5 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.01]">
                  <h2 className="text-[25vw] font-serif uppercase tracking-tighter text-white leading-none">
                    Verdant
                  </h2>
                </div>

                <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
                  <div className="space-y-6 text-left">
                    <Text variant="headline" className="text-white text-5xl md:text-7xl italic leading-none block">Engineered <br /> for the planet.</Text>
                    <div className="flex gap-8 text-[11px] font-black tracking-[0.2em] uppercase text-white/40 font-sans">
                      <a href="#" className="hover:text-[var(--color-primary)]">Manifesto</a>
                      <a href="#" className="hover:text-[var(--color-primary)]">Archive</a>
                      <a href="#" className="hover:text-[var(--color-primary)]">Sustainability</a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-8 items-end w-full md:w-auto">
                    <div className="text-[10px] uppercase tracking-widest text-white/20 font-black font-sans">
                      © 2026 Verdant Engineered Dynamics
                    </div>
                  </div>
                </div>
              </footer>

              <Purchase onOpenSizeGuide={() => setShowSizeGuide(true)} />

              {/* Size Guide Modal/Overlay */}
              <AnimatePresence>
                {showSizeGuide && (
                  <SizeGuide onClose={() => setShowSizeGuide(false)} />
                )}
              </AnimatePresence>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </ProductProvider>
  );
}

export default App;
