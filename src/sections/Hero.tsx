import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Text } from '../components/primitives/Text';
import { Button } from '../components/primitives/Button';
import gsap from 'gsap';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const shoeRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const springConfig = { stiffness: 100, damping: 30, mass: 1 };

    // Parallax and Scale transforms
    const yBackground = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const opacityTextBg = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const scaleShoe = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
    const opacityHeroUI = useTransform(scrollYProgress, [0, 0.7], [1, 0]); // Sustained visibility

    // Spring-smoothed mouse parallax effectively
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 40;
            const moveY = (clientY - window.innerHeight / 2) / 40;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        if (shoeRef.current) {
            gsap.fromTo(shoeRef.current,
                { y: 150, opacity: 0, scale: 0.85, rotate: -5 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 3,
                    ease: "expo.out",
                    delay: 0.8
                }
            );
        }
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden flex flex-col bg-[var(--color-surface-900)] pt-32 lg:pt-40"
        >
            {/* Cinematic Background */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.25] saturate-[0.8]"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, ease: "easeOut" }}
                style={{
                    y: yBackground,
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjb3BNBID63iaR_jTJbSA1Rx9TJbbFeM9jcbrEOjxN5tPrDQm7_vg2ksQUWoirKC9sx10LRcKqQJhfs2U-le9JMUuJbTBykaa4_aTnXQinQeYZGyW8bapNu9m3-wRRxlLBAxNByVLeaviKK1J6lJwYnAA-xdfmHb1SKwucSlOdHPgyYGk69g8VoT-XqQy3ofvaKMPbP1V_dHn7ncAeifrnnpQPNBuvlqEijXe2hEFbMjtzX4Doqekf7pIYZ3W_NubLu7MBw9421HmP')"
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[var(--color-surface-900)] pointer-events-none" />
            <div className="absolute inset-0 fog-layer opacity-40 mix-blend-screen pointer-events-none" />

            {/* Large Typography Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden mt-10">
                <motion.h1
                    style={{ opacity: opacityTextBg }}
                    className="font-serif text-[28vw] text-white/[0.015] leading-none select-none tracking-tighter italic"
                >
                    VERDANT
                </motion.h1>
            </div>

            {/* Main Interactive Hub - Expanded to prevent cutoff */}
            <div className="relative flex-grow flex flex-col items-center justify-start z-10 px-8">

                {/* Centerpiece Shoe (Floating + Mouse Parallax) */}
                <motion.div
                    ref={shoeRef}
                    style={{
                        scale: scaleShoe,
                        x: mouseX,
                        y: mouseY
                    }}
                    className="relative w-full max-w-5xl flex flex-col items-center pt-24 lg:pt-32"
                >
                    <motion.div
                        animate={{ y: [0, -30, 0], rotate: [0, 3, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="relative group cursor-pointer"
                    >
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-16 bg-[var(--color-primary)]/10 blur-[120px] rounded-full scale-150 opacity-40" />

                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSKLjUFvaU1rLUzAJcDDRURe3Gw6ImEbdre8VFKCtF8rf23yK2LsyIpmg8ayb-gVHRZWVZK8wxB_MbVcp_Dgc3DVxIG_QDgq3HlX7wKyxlsLS72QOGpe5mMVD6iNz-SWpuxkYbBBgpRn67w8qH2hTD25hE2cx5fir_L7OY4gE-p7yxkLqZOX4D8flUfaUq1Tbb8oWyuKmJ1Q1zcpn8snCqoUtF1aj3kc8ZvPfKJH3zPnTV91UqiPghUVD6NbPn_y6yYCMM3szCm5nK"
                            alt="Verdant V1 Emerald"
                            className="w-full max-w-[320px] md:max-w-[550px] lg:max-w-[750px] drop-shadow-[0_60px_80px_rgba(0,0,0,0.8)]"
                        />

                        {/* Design Spec Lines */}
                        <div className="absolute -top-10 -left-48 hidden xl:flex items-center gap-8 pointer-events-none">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-primary)] font-sans font-black opacity-60">Architecture</span>
                                <span className="text-xl font-serif italic text-white/95">Kinetic Ocean Mesh</span>
                            </div>
                            <div className="spec-line w-32 bg-gradient-to-r from-[var(--color-primary)] to-transparent" />
                        </div>
                        <div className="absolute bottom-40 -right-48 hidden xl:flex items-center gap-8 pointer-events-none">
                            <div className="spec-line w-32 rotate-180 bg-gradient-to-r from-[var(--color-primary)] to-transparent" />
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-primary)] font-sans font-black opacity-60">Performance</span>
                                <span className="text-xl font-serif italic text-white/95">Bio-Dynamic Foam V3</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Overlay - Stable Spacing */}
                    <motion.div
                        style={{ opacity: opacityHeroUI }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
                        className="mt-24 md:mt-32 text-center max-w-3xl pb-24"
                    >
                        <div className="space-y-12">
                            <div>
                                <Text variant="headline" className="text-6xl md:text-9xl text-white mb-8 tracking-tighter leading-[0.85] italic font-light">
                                    The Verdant <span className="text-[var(--color-primary)] premium-glow">Runner</span>
                                </Text>
                                <Text variant="body" className="max-w-lg mx-auto block text-xl md:text-2xl text-white/60">
                                    Sustainability meets peak performance. <span className="text-white font-medium italic">95% Recycled Engineering.</span>
                                </Text>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-6">
                                <Button variant="glow" size="lg" className="h-18 px-14 text-sm tracking-[0.3em]">
                                    Experience Innovation
                                </Button>
                                <button className="text-white/40 hover:text-[var(--color-primary)] text-[10px] font-sans font-black uppercase tracking-[0.4em] border-b border-white/5 pb-2 transition-all hover:border-[var(--color-primary)]/40 hover:translate-y-[-2px]">
                                    Technical Manifesto
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* EXPLORE Indicator - Moved to TOP Layer with active GLOW */}
            <motion.div
                style={{ opacity: opacityHeroUI }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 z-[60] pointer-events-none"
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[12px] uppercase tracking-[0.8em] font-sans font-black text-[var(--color-primary)] premium-glow">Explore</span>
                    <motion.div
                        animate={{ height: [60, 0, 60], y: [0, 60, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[2px] bg-gradient-to-b from-[var(--color-primary)] to-transparent shadow-[0_0_15px_rgba(17,212,17,0.5)]"
                    />
                </div>
            </motion.div>
        </section>
    );
};
