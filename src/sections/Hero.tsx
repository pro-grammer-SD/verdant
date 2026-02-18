import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { Button } from '../components/primitives/Button';
import { motionConfig } from '../config/motion';
import { contentConfig } from '../config/content';
import { Typewriter } from '../components/motion/Typewriter';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full bg-[var(--color-surface-900)] flex flex-col items-center justify-center p-8 overflow-visible"
        >
            {/* Cinematic Lighting Layers */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(17,212,17,0.1)_0%,transparent_70%)]" />

            {/* Background Narrative Typography */}
            <motion.div
                style={{ y: yParallax, opacity: opacityHero }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <h1 className="text-[30vw] font-serif italic text-white/[0.012] leading-none select-none">GAIA</h1>
            </motion.div>

            {/* Main Composition */}
            <motion.div
                style={{ scale: scaleHero }}
                className="relative z-10 w-full max-w-6xl flex flex-col items-center"
            >
                {/* Flagship Product Asset */}
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    transition={{ duration: 2, ease: motionConfig.curves.apple }}
                    className="relative"
                >
                    <div className="absolute -inset-20 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSKLjUFvaU1rLUzAJcDDRURe3Gw6ImEbdre8VFKCtF8rf23yK2LsyIpmg8ayb-gVHRZWVZK8wxB_MbVcp_Dgc3DVxIG_QDgq3HlX7wKyxlsLS72QOGpe5mMVD6iNz-SWpuxkYbBBgpRn67w8qH2hTD25hE2cx5fir_L7OY4gE-p7yxkLqZOX4D8flUfaUq1Tbb8oWyuKmJ1Q1zcpn8snCqoUtF1aj3kc8ZvPfKJH3zPnTV91UqiPghUVD6NbPn_y6yYCMM3szCm5nK"
                        alt={contentConfig.product.name}
                        className="w-full max-w-[800px] drop-shadow-[0_80px_100px_rgba(0,0,0,0.6)]"
                    />
                </motion.div>

                {/* Technical Callouts */}
                <div className="mt-16 text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1, ease: motionConfig.curves.apple }}
                        className="space-y-6"
                    >
                        <Text variant="headline" className="text-7xl md:text-9xl text-white italic tracking-tighter leading-none">
                            <Typewriter text="The World's" delay={1.5} speed={0.03} /> <br />
                            <span className="premium-glow premium-gradient">
                                <Typewriter text="Lightest Runner" delay={2} speed={0.04} />
                            </span>
                        </Text>
                        <Text variant="body" className="max-w-xl mx-auto text-white/40 text-lg md:text-xl">
                            {contentConfig.product.name} — Redefining performance metrics through serialized nitrogen engineering.
                        </Text>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-12"
                    >
                        <Button variant="glow" size="lg" className="h-18 px-16 group glitch-hover">
                            <span>Experience Innovation</span>
                        </Button>
                        <button
                            onClick={() => document.getElementById('technical-docs')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-[10px] uppercase tracking-[0.6em] font-sans font-black text-white/30 hover:text-[var(--color-primary)] transition-all border-b border-white/5 pb-2 glitch-hover"
                        >
                            <Typewriter text="Technical Manifesto" delay={3.5} speed={0.02} />
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Explicit Scroll Prompt */}
        </section>
    );
};
